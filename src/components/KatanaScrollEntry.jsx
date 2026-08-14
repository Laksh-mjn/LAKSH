import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowDown } from 'lucide-react';

const TOTAL_FRAMES = 300;
const FRAME_PREFIX = '/katana-frames/ezgif-frame-';

export default function KatanaScrollEntry({ onEnterComplete }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  // Standard frames cache (300 high-fidelity sequential frames)
  const imagesRef = useRef(new Array(TOTAL_FRAMES));
  
  // UI & Scene States
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFrame, setActiveFrame] = useState(0);

  // Mouse & Touch Parallax
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Animation controller refs (bypasses React re-renders for buttery 60/120fps RAF loop)
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(performance.now());
  const isInspectionModeRef = useRef(false);

  // Depth-separated 3D particles
  const particlesRef = useRef([]);

  // Initialize multi-depth atmospheric particles (Monochromatic silver/white)
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const particleCount = isMobile ? 16 : 32;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random();
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (0.2 + depth * 0.4),
        vy: (0.15 + depth * 0.45),
        size: depth > 0.7 ? 3.0 + Math.random() * 2.0 : 1.2 + Math.random() * 1.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.025,
        opacity: depth > 0.7 ? 0.35 + Math.random() * 0.35 : 0.12 + Math.random() * 0.25,
        depth: depth,
        type: Math.random() > 0.35 ? 'petal' : 'mist',
      });
    }
    particlesRef.current = particles;
  }, []);

  // Preload all frames with async off-thread decoding for 120fps stutter-free scrubbing
  useEffect(() => {
    let isCancelled = false;
    const images = imagesRef.current;

    const loadSingleFrame = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        const frameNum = String(index + 1).padStart(3, '0');
        img.src = `${FRAME_PREFIX}${frameNum}.jpg`;
        img.onload = () => {
          if (!isCancelled) {
            images[index] = img;
            if (img.decode) {
              img.decode().catch(() => {}).finally(() => resolve());
              return;
            }
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    const loadAll = async () => {
      // Instant priority batch (first 40 frames)
      const priorityBatch = [];
      for (let i = 0; i < 40; i++) {
        priorityBatch.push(loadSingleFrame(i));
      }
      await Promise.all(priorityBatch);

      // Fast streaming for remaining frames in parallel chunks
      for (let i = 40; i < TOTAL_FRAMES; i += 30) {
        if (isCancelled) break;
        const batch = [];
        for (let j = i; j < Math.min(i + 30, TOTAL_FRAMES); j++) {
          batch.push(loadSingleFrame(j));
        }
        await Promise.all(batch);
      }
    };

    loadAll();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Cinematic Camera Transformation Mapping across the 6 Scenes
  const getCameraTransform = (progress, camX, camY, isVertical) => {
    let baseScale = 1.0;
    let panX = 0;
    let panY = 0;

    if (progress < 0.18) {
      baseScale = 1.0 + progress * 0.1;
      panX = 0;
      panY = 0;
    } else if (progress >= 0.18 && progress < 0.36) {
      const p = (progress - 0.18) / 0.18;
      baseScale = 1.03 + p * 0.1;
      panX = -p * (isVertical ? 0.015 : 0.035);
      panY = p * 0.02;
    } else if (progress >= 0.36 && progress < 0.54) {
      const p = (progress - 0.36) / 0.18;
      baseScale = 1.13 - p * 0.06;
      panX = (isVertical ? -0.015 : -0.035) + p * (isVertical ? 0.015 : 0.035);
      panY = 0.02 - p * 0.02;
    } else if (progress >= 0.54 && progress < 0.72) {
      const p = (progress - 0.54) / 0.18;
      baseScale = 1.03 + Math.sin(p * Math.PI) * 0.025;
      panX = 0;
      panY = 0;
    } else if (progress >= 0.72 && progress < 0.88) {
      const p = (progress - 0.72) / 0.16;
      baseScale = 1.04 + p * 0.06;
      panX = p * (isVertical ? 0.012 : 0.025);
      panY = -p * 0.02;
    } else {
      const p = (progress - 0.88) / 0.12;
      baseScale = 1.10 - p * 0.10;
      panX = (isVertical ? 0.012 : 0.025) * (1 - p);
      panY = -0.02 * (1 - p);
    }

    return {
      scale: baseScale,
      offsetX: (panX + camX * (isVertical ? 0.008 : 0.015)),
      offsetY: (panY + camY * (isVertical ? 0.008 : 0.015)),
    };
  };

  // Main Canvas Rendering Engine (Preserves crystal-clear sharpness and full sword aspect ratio)
  const renderCanvas = useCallback((frameIdx, progress, camX, camY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Deep obsidian black base
    ctx.fillStyle = '#08080A';
    ctx.fillRect(0, 0, cw, ch);

    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      for (let prev = frameIdx - 1; prev >= 0; prev--) {
        const p = imagesRef.current[prev];
        if (p && p.complete && p.naturalWidth > 0) {
          img = p;
          break;
        }
      }
      if (!img || !img.complete || img.naturalWidth === 0) {
        for (let next = frameIdx + 1; next < TOTAL_FRAMES; next++) {
          const n = imagesRef.current[next];
          if (n && n.complete && n.naturalWidth > 0) {
            img = n;
            break;
          }
        }
      }
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const isVertical = cw < ch;
    const { scale: camScale, offsetX, offsetY } = getCameraTransform(progress, camX, camY, isVertical);

    // Responsive framing: fits entire sword and scabbard on vertical mobile screens without cropping
    const baseAspectFit = isVertical
      ? Math.max(cw / iw, (ch / ih) * 0.72) * 1.25
      : Math.max(cw / iw, ch / ih);

    const fitScale = baseAspectFit * camScale;
    const nw = iw * fitScale;
    const nh = ih * fitScale;
    const nx = (cw - nw) / 2 + offsetX * cw;
    const ny = (ch - nh) / 2 + offsetY * ch;

    // High quality crisp image rendering
    ctx.globalAlpha = 1.0;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, nx, ny, nw, nh);

    // Blade Hamon Razor Light Sheen Sweep (Frames 125 to 245)
    if (frameIdx >= 125 && frameIdx <= 245) {
      const bProgress = (frameIdx - 125) / 120;
      const gx = nx + nw * (0.32 + bProgress * 0.35) + mouseRef.current.x * (isVertical ? 25 : 50);
      const gy = ny + nh * 0.44 + mouseRef.current.y * (isVertical ? 18 : 35);

      const grad = ctx.createRadialGradient(gx, gy, 4, gx, gy, isVertical ? 110 : 160);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.30)');
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.07)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cw, ch);
    }
  }, []);

  // Multi-Depth Particles Canvas Renderer (Monochromatic)
  const renderParticles = useCallback((velocity, mouseX) => {
    const pCanvas = particlesCanvasRef.current;
    if (!pCanvas) return;
    const ctx = pCanvas.getContext('2d');
    if (!ctx) return;

    const w = pCanvas.width;
    const h = pCanvas.height;

    ctx.clearRect(0, 0, w, h);

    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      const speedMultiplier = 1 + Math.abs(velocity) * 2.0;
      p.y += p.vy * speedMultiplier;
      p.x += p.vx * speedMultiplier + mouseX * 0.4 * p.depth;
      p.rotation += p.rotationSpeed;

      if (p.y > h + 30) p.y = -30;
      if (p.x > w + 30) p.x = -30;
      if (p.x < -30) p.x = w + 30;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'petal') {
        ctx.fillStyle = p.depth > 0.6 ? 'rgba(255, 255, 255, 0.65)' : 'rgba(215, 215, 225, 0.35)';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.75, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }, []);

  // Handle Resize & Retina HiDPI
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const pCanvas = particlesCanvasRef.current;
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);

    if (canvas) {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    }
    if (pCanvas) {
      pCanvas.width = window.innerWidth * dpr;
      pCanvas.height = window.innerHeight * dpr;
    }

    renderCanvas(activeFrame, scrollProgress, mouseRef.current.x, mouseRef.current.y);
  }, [renderCanvas, activeFrame, scrollProgress]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Master High-Speed 120FPS RAF Render Loop
  useEffect(() => {
    let animId;

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / totalScroll));
      setScrollProgress(progress);

      const target = progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = target;

      const now = performance.now();
      const dt = Math.max(1, now - lastScrollTimeRef.current);
      const dy = window.scrollY - lastScrollYRef.current;
      scrollVelocityRef.current = dy / dt;
      lastScrollYRef.current = window.scrollY;
      lastScrollTimeRef.current = now;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 120FPS RAF Engine Loop with cinematic 0.22 interpolation lerp
    const loop = () => {
      const frameDiff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += frameDiff * 0.22;
      const currentRounded = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const camX = isInspectionModeRef.current ? mouseRef.current.x * 1.5 : mouseRef.current.x * 0.35;
      const camY = isInspectionModeRef.current ? mouseRef.current.y * 1.5 : mouseRef.current.y * 0.35;

      setActiveFrame(currentRounded);

      renderCanvas(currentRounded, currentFrameRef.current / (TOTAL_FRAMES - 1), camX, camY);
      renderParticles(scrollVelocityRef.current, mouseRef.current.x);

      scrollVelocityRef.current *= 0.9;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, [renderCanvas, renderParticles]);

  // Mouse & Touch move listener
  const handleMouseMove = (e) => {
    const { innerWidth, innerHeight } = window;
    mouseRef.current.targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    mouseRef.current.targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.touches[0].clientX - innerWidth / 2) / (innerWidth / 2);
      mouseRef.current.targetY = (e.touches[0].clientY - innerHeight / 2) / (innerHeight / 2);
    }
  };

  const scrollToPortfolio = () => {
    const target = document.querySelector('#portfolio-start');
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 30;
      window.scrollTo({ top, behavior: 'smooth' });
    } else if (containerRef.current) {
      const bottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: bottom, behavior: 'smooth' });
    }
    if (onEnterComplete) onEnterComplete();
  };

  const getStoryAct = () => {
    if (scrollProgress < 0.18) {
      return 'act1';
    } else if (scrollProgress >= 0.18 && scrollProgress < 0.36) {
      return 'act2';
    } else if (scrollProgress >= 0.36 && scrollProgress < 0.54) {
      return 'act3';
    } else if (scrollProgress >= 0.54 && scrollProgress < 0.72) {
      return 'act4';
    } else if (scrollProgress >= 0.72 && scrollProgress < 0.88) {
      return 'act5';
    } else {
      return 'act6';
    }
  };

  const currentAct = getStoryAct();

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={() => {
        mouseRef.current.targetX = 0;
        mouseRef.current.targetY = 0;
      }}
      className="relative h-[480vh] sm:h-[650vh] bg-[#08080A] selection:bg-white selection:text-black cursor-default touch-pan-y"
    >
      {/* Sticky Fullscreen Cinematic Canvas Layer */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden select-none z-30 pointer-events-auto">
        
        {/* Layer 0: Instant Frame 1 Fallback Image */}
        <img
          src={`${FRAME_PREFIX}001.jpg`}
          alt="Katana Sequence Layer"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />

        {/* Layer 1: High-Speed Crisp 120FPS Render Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 gpu-layer"
        />

        {/* Layer 2: Multi-Depth Atmospheric Silver Mist Particles */}
        <canvas
          ref={particlesCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
        />

        {/* Layer 3: Interactive Ambient Studio Light Drift */}
        <div 
          style={{
            transform: `translate(${mouseRef.current.x * 20}px, ${mouseRef.current.y * 20}px)`,
          }}
          className="absolute inset-0 bg-radial from-white/[0.04] via-transparent to-transparent pointer-events-none z-25 transition-transform duration-700 ease-out"
        />

        {/* TOP BAR */}
        <header className="w-full max-w-7xl mx-auto px-5 sm:px-8 pt-5 sm:pt-8 flex items-center justify-between z-30 relative">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            <span className="text-[11px] font-mono-code tracking-widest text-[#A1A1AA] uppercase">
              LAKSH MAHAJAN
            </span>
          </div>

          <button
            onClick={scrollToPortfolio}
            className="min-h-[44px] px-3 flex items-center gap-1.5 text-xs font-mono-code tracking-widest text-[#86868B] hover:text-white transition-colors cursor-pointer uppercase active:scale-95"
          >
            <span>Skip to Portfolio</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </header>

        {/* FOREGROUND: NARRATIVE CINEMATIC TYPOGRAPHY */}
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-14 flex flex-col justify-center items-start z-30 pointer-events-none relative flex-1">
          <AnimatePresence mode="wait">
            
            {/* ACT 1: Everything Starts With a Vision */}
            {currentAct === 'act1' && (
              <motion.div
                key="act1"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono-code font-bold tracking-widest text-[#A1A1AA] uppercase">
                    VISION & INCEPTION
                  </span>
                  <span className="h-[1px] w-12 bg-white/20" />
                </div>
                <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] uppercase leading-[0.95]">
                  Everything <br />
                  <span className="text-white">Starts With a Vision.</span>
                </h1>
                <p className="font-display text-base sm:text-xl text-[#A1A1AA] italic leading-relaxed pt-1">
                  Before code, before sound, before every creation — there is clarity.
                </p>
              </motion.div>
            )}

            {/* ACT 2: Precision in Every Line */}
            {currentAct === 'act2' && (
              <motion.div
                key="act2"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono-code font-bold tracking-widest text-[#A1A1AA] uppercase">
                    CRAFT & DISCIPLINE
                  </span>
                  <span className="h-[1px] w-12 bg-white/20" />
                </div>
                <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] uppercase leading-[0.95]">
                  Precision in <br />
                  <span className="text-white">Every Line.</span>
                </h2>
                <p className="font-display text-base sm:text-xl text-[#A1A1AA] italic leading-relaxed pt-1">
                  Like folded steel, great engineering demands patience and relentless refinement.
                </p>
              </motion.div>
            )}

            {/* ACT 3: The Spark of Intelligence */}
            {currentAct === 'act3' && (
              <motion.div
                key="act3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono-code font-bold tracking-widest text-[#A1A1AA] uppercase">
                    INTELLIGENCE & AI
                  </span>
                  <span className="h-[1px] w-12 bg-white/20" />
                </div>
                <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] uppercase leading-[0.95]">
                  The Spark of <br />
                  <span className="text-white">Intelligence.</span>
                </h2>
                <p className="font-display text-base sm:text-xl text-[#A1A1AA] italic leading-relaxed pt-1">
                  Where algorithms become art, and systems learn to reason and create.
                </p>
              </motion.div>
            )}

            {/* ACT 4: Sound, Story, Science */}
            {currentAct === 'act4' && (
              <motion.div
                key="act4"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono-code font-bold tracking-widest text-[#A1A1AA] uppercase">
                    HARMONY & CREATIVITY
                  </span>
                  <span className="h-[1px] w-12 bg-white/20" />
                </div>
                <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] uppercase leading-[0.95]">
                  Sound. Story. <br />
                  <span className="text-white">Science.</span>
                </h2>
                <p className="font-display text-base sm:text-xl text-[#A1A1AA] italic leading-relaxed pt-1">
                  Three dimensions of one mind — producing music, writing worlds, engineering AI.
                </p>
              </motion.div>
            )}

            {/* ACT 5: Forged Through Discipline */}
            {currentAct === 'act5' && (
              <motion.div
                key="act5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono-code font-bold tracking-widest text-[#A1A1AA] uppercase">
                    LEADERSHIP & MASTERY
                  </span>
                  <span className="h-[1px] w-12 bg-white/20" />
                </div>
                <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] uppercase leading-[0.95]">
                  Forged Through <br />
                  <span className="text-white">Discipline.</span>
                </h2>
                <p className="font-display text-base sm:text-xl text-[#A1A1AA] italic leading-relaxed pt-1">
                  19 verified certifications. Published discography. Boundless curiosity.
                </p>
              </motion.div>
            )}

            {/* ACT 6: Ready to Build */}
            {currentAct === 'act6' && (
              <motion.div
                key="act6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl space-y-6 pointer-events-auto"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono-code font-bold tracking-widest text-[#A1A1AA] uppercase">
                    PORTFOLIO OVERVIEW
                  </span>
                  <span className="h-[1px] w-12 bg-white/20" />
                </div>
                <h2 className="font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] uppercase leading-[0.95]">
                  Ready to <br />
                  <span className="text-white">Build the Future.</span>
                </h2>
                <p className="font-display text-base sm:text-xl text-[#A1A1AA] italic leading-relaxed">
                  Welcome to the digital atelier of Laksh Mahajan.
                </p>

                <div className="pt-2">
                  <button
                    onClick={scrollToPortfolio}
                    className="px-8 py-4 rounded-full bg-white text-black font-mono-code font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-[#E5E5EA] transition-all hover:scale-105 shadow-xl cursor-pointer"
                  >
                    <span>Enter Portfolio</span>
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* BOTTOM STATUS & PROGRESS BAR */}
        <footer className="w-full max-w-7xl mx-auto px-5 sm:px-8 pb-6 sm:pb-8 flex items-end justify-between z-30 relative">
          <div className="space-y-2">
            <div className="w-44 sm:w-60 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-code tracking-widest text-[#86868B] uppercase">
            <span>Scroll to explore</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </footer>

      </div>
    </div>
  );
}
