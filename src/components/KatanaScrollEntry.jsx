import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowDown } from 'lucide-react';

const TOTAL_FRAMES = 300;
const STANDARD_FRAME_PREFIX = '/katana-frames/ezgif-frame-';
const HQ_FRAME_PREFIX = '/katana-frames-hq/ezgif-frame-';

export default function KatanaScrollEntry({ onEnterComplete }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  // Standard frames cache (1920x1080 JPEG)
  const standardImagesRef = useRef(new Array(TOTAL_FRAMES));
  // HQ frames cache (3840x2160 WebP)
  const hqCacheRef = useRef(new Map());
  
  // UI & Scene States
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFrame, setActiveFrame] = useState(0);
  const [isHQActive, setIsHQActive] = useState(false);
  const [isSettled, setIsSettled] = useState(false);

  // Mouse & Touch Parallax
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Animation controller refs (bypasses React re-renders for buttery 60/120fps RAF loop)
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(performance.now());
  const settleTimeoutRef = useRef(null);
  const inspectionTimerRef = useRef(null);
  const isInspectionModeRef = useRef(false);

  // Dual-Layer Crossfade Alpha (0.0 to 1.0)
  const hqAlphaRef = useRef(0);

  // Depth-separated 3D particles
  const particlesRef = useRef([]);

  // Initialize multi-depth atmospheric particles (Monochromatic silver/white)
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const particleCount = isMobile ? 16 : 36;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random();
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (0.2 + depth * 0.4),
        vy: (0.15 + depth * 0.45),
        size: depth > 0.7 ? 3.0 + Math.random() * 2.2 : 1.2 + Math.random() * 1.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.025,
        opacity: depth > 0.7 ? 0.35 + Math.random() * 0.35 : 0.12 + Math.random() * 0.25,
        depth: depth,
        type: Math.random() > 0.35 ? 'petal' : 'mist',
      });
    }
    particlesRef.current = particles;
  }, []);

  // Preload standard frames with instant Frame 1
  useEffect(() => {
    let isCancelled = false;
    const standardImages = standardImagesRef.current;

    // Instant Frame 1 load
    const firstImg = new Image();
    firstImg.src = `${STANDARD_FRAME_PREFIX}001.jpg`;
    firstImg.onload = () => {
      if (isCancelled) return;
      standardImages[0] = firstImg;
      preloadHQFrame(0);
    };

    const loadSingleFrame = (index) => {
      return new Promise((resolve) => {
        const img = new Image();
        const frameNum = String(index + 1).padStart(3, '0');
        img.src = `${STANDARD_FRAME_PREFIX}${frameNum}.jpg`;
        img.onload = () => {
          if (!isCancelled) {
            standardImages[index] = img;
          }
          resolve();
        };
        img.onerror = () => resolve();
      });
    };

    const loadAll = async () => {
      // High priority first 30 frames
      const priorityBatch = [];
      for (let i = 1; i < 30; i++) {
        priorityBatch.push(loadSingleFrame(i));
      }
      await Promise.all(priorityBatch);

      // Background streaming for remaining frames
      for (let i = 30; i < TOTAL_FRAMES; i += 25) {
        if (isCancelled) break;
        const batch = [];
        for (let j = i; j < Math.min(i + 25, TOTAL_FRAMES); j++) {
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

  // Smart HQ Frame Loader with neighborhood caching
  const preloadHQFrame = useCallback((frameIdx) => {
    if (hqCacheRef.current.has(frameIdx)) {
      return Promise.resolve(hqCacheRef.current.get(frameIdx));
    }

    return new Promise((resolve) => {
      const hqImg = new Image();
      const frameNum = String(frameIdx + 1).padStart(3, '0');
      hqImg.src = `${HQ_FRAME_PREFIX}${frameNum}_hq.webp`;
      hqImg.onload = () => {
        hqCacheRef.current.set(frameIdx, hqImg);
        resolve(hqImg);
      };
      hqImg.onerror = () => resolve(null);
    });
  }, []);

  const preloadHQNeighborhood = useCallback((centerIdx) => {
    preloadHQFrame(centerIdx);
    if (centerIdx > 0) preloadHQFrame(centerIdx - 1);
    if (centerIdx < TOTAL_FRAMES - 1) preloadHQFrame(centerIdx + 1);
    if (centerIdx > 1) preloadHQFrame(centerIdx - 2);
    if (centerIdx < TOTAL_FRAMES - 2) preloadHQFrame(centerIdx + 2);
  }, [preloadHQFrame]);

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

  // Main Canvas Rendering Engine (Preserves full Katana shape on all screens)
  const renderCanvas = useCallback((frameIdx, hqBlend, progress, camX, camY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Deep obsidian black
    ctx.fillStyle = '#08080A';
    ctx.fillRect(0, 0, cw, ch);

    let standardImg = standardImagesRef.current[frameIdx];
    if (!standardImg || !standardImg.complete || standardImg.naturalWidth === 0) {
      for (let prev = frameIdx - 1; prev >= 0; prev--) {
        const p = standardImagesRef.current[prev];
        if (p && p.complete && p.naturalWidth > 0) {
          standardImg = p;
          break;
        }
      }
    }

    if (!standardImg || !standardImg.complete || standardImg.naturalWidth === 0) return;

    const iw = standardImg.naturalWidth;
    const ih = standardImg.naturalHeight;

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

    // Layer 1: Standard Frame
    ctx.globalAlpha = 1.0;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = isVertical ? 'medium' : 'high';
    ctx.drawImage(standardImg, nx, ny, nw, nh);

    // Layer 2: Ultra-High-Resolution 4K Settled Frame
    if (hqBlend > 0.01) {
      const hqImg = hqCacheRef.current.get(frameIdx);
      if (hqImg && hqImg.complete && hqImg.naturalWidth > 0) {
        ctx.globalAlpha = Math.min(1.0, hqBlend);
        ctx.drawImage(hqImg, nx, ny, nw, nh);
      }
    }

    ctx.globalAlpha = 1.0;

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
  const renderParticles = useCallback((velocity, mouseX, mouseY) => {
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

    renderCanvas(activeFrame, hqAlphaRef.current, scrollProgress, mouseRef.current.x, mouseRef.current.y);
  }, [renderCanvas, activeFrame, scrollProgress]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Master RAF Render Loop & Settle Detection
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

      hqAlphaRef.current = 0;
      setIsHQActive(false);
      setIsSettled(false);
      isInspectionModeRef.current = false;

      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
      if (inspectionTimerRef.current) clearTimeout(inspectionTimerRef.current);

      settleTimeoutRef.current = setTimeout(() => {
        const settledFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentFrameRef.current))
        );
        setIsSettled(true);
        preloadHQNeighborhood(settledFrame);

        inspectionTimerRef.current = setTimeout(() => {
          isInspectionModeRef.current = true;
        }, 600);
      }, 160);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 60FPS RAF Engine
    const loop = () => {
      const frameDiff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += frameDiff * 0.2;
      const currentRounded = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const camX = isInspectionModeRef.current ? mouseRef.current.x * 1.5 : mouseRef.current.x * 0.35;
      const camY = isInspectionModeRef.current ? mouseRef.current.y * 1.5 : mouseRef.current.y * 0.35;

      const currentHQ = hqCacheRef.current.get(currentRounded);
      const hasHQ = currentHQ && currentHQ.complete && currentHQ.naturalWidth > 0;

      if (Math.abs(frameDiff) < 0.15 && hasHQ) {
        hqAlphaRef.current += (1.0 - hqAlphaRef.current) * 0.14;
        if (hqAlphaRef.current > 0.85 && !isHQActive) {
          setIsHQActive(true);
        }
      } else {
        hqAlphaRef.current = 0;
      }

      setActiveFrame(currentRounded);

      renderCanvas(currentRounded, hqAlphaRef.current, currentFrameRef.current / (TOTAL_FRAMES - 1), camX, camY);
      renderParticles(scrollVelocityRef.current, mouseRef.current.x, mouseRef.current.y);

      scrollVelocityRef.current *= 0.9;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
      if (inspectionTimerRef.current) clearTimeout(inspectionTimerRef.current);
    };
  }, [renderCanvas, renderParticles, preloadHQNeighborhood, isHQActive]);

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
    if (containerRef.current) {
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
          src={`${STANDARD_FRAME_PREFIX}001.jpg`}
          alt="Katana Sequence Layer"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
        />

        {/* Layer 1 & 2: Dual-Layer Smooth 60FPS + 4K HQ Settled Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
        />

        {/* Layer 3: Multi-Depth Atmospheric Silver Mist Particles */}
        <canvas
          ref={particlesCanvasRef}
          className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
        />

        {/* Layer 4: Interactive Ambient Studio Light Drift */}
        <div 
          style={{
            transform: `translate(${mouseRef.current.x * 20}px, ${mouseRef.current.y * 20}px)`,
          }}
          className="absolute inset-0 bg-radial from-white/[0.04] via-transparent to-transparent pointer-events-none z-25 transition-transform duration-700 ease-out"
        />

        {/* AI 4K Resolution Status Pill */}
        {isHQActive && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 right-4 sm:top-6 sm:right-8 z-40 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 border border-white/15 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[8px] sm:text-[9px] font-mono-code text-[#A1A1AA] uppercase tracking-widest">
              AI 4K DETAIL // SETTLED
            </span>
          </motion.div>
        )}

        {/* TOP BAR */}
        <header className="w-full max-w-7xl mx-auto px-5 sm:px-8 pt-5 sm:pt-8 flex items-center justify-between z-30 relative">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono-code tracking-[0.2em] text-[#A1A1AA] uppercase">
              LAKSH // 2026
            </span>
          </div>

          <button
            onClick={scrollToPortfolio}
            className="min-h-[44px] px-3 flex items-center gap-1 text-[11px] font-mono-code tracking-widest text-[#86868B] hover:text-white transition-colors cursor-pointer uppercase active:scale-95"
          >
            <span>Skip Story</span>
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
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)', scale: 0.98 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: -16, filter: 'blur(8px)', scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 sm:space-y-4 max-w-2xl"
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[9px] sm:text-[10px] font-mono-code text-[#E4E4E7] font-semibold tracking-widest uppercase">
                  <span>ACT 01 // THE GENESIS</span>
                </div>
                <h1 className="font-heading text-4xl sm:text-7xl lg:text-8xl font-black text-[#F5F5F7] tracking-tight leading-[0.95] sm:leading-[0.92] uppercase">
                  EVERYTHING <br />
                  STARTS WITH <br />
                  <span className="text-white/90">A VISION.</span>
                </h1>
                <p className="text-xs sm:text-base text-[#A1A1AA] font-light max-w-xs sm:max-w-md pt-1 leading-relaxed">
                  Laksh Mahajan: Aspiring AI Engineer, Music Producer & Creative Technologist.
                </p>
              </motion.div>
            )}

            {/* ACT 2: Precision is Not an Accident */}
            {currentAct === 'act2' && (
              <motion.div
                key="act2"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)', scale: 0.98 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: -16, filter: 'blur(8px)', scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 sm:space-y-4 max-w-2xl"
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[9px] sm:text-[10px] font-mono-code text-[#E4E4E7] font-semibold tracking-widest uppercase">
                  <span>ACT 02 // CRAFTSMANSHIP</span>
                </div>
                <h2 className="font-heading text-4xl sm:text-7xl lg:text-8xl font-black text-[#F5F5F7] tracking-tight leading-[0.95] sm:leading-[0.92] uppercase">
                  PRECISION <br />
                  IS NOT <br />
                  <span className="text-white/90">AN ACCIDENT.</span>
                </h2>
                <p className="text-xs sm:text-base text-[#A1A1AA] font-light max-w-xs sm:max-w-md pt-1 leading-relaxed">
                  High-carbon steel encased in hand-carved silver cloud lacquer. Mathematical rigor meets artistic intuition.
                </p>
              </motion.div>
            )}

            {/* ACT 3: Built Through Curiosity */}
            {currentAct === 'act3' && (
              <motion.div
                key="act3"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)', scale: 0.98 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: -16, filter: 'blur(8px)', scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 sm:space-y-4 max-w-2xl"
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[9px] sm:text-[10px] font-mono-code text-[#E4E4E7] font-semibold tracking-widest uppercase">
                  <span>ACT 03 // MOMENTUM</span>
                </div>
                <h2 className="font-heading text-4xl sm:text-7xl lg:text-8xl font-black text-[#F5F5F7] tracking-tight leading-[0.95] sm:leading-[0.92] uppercase">
                  BUILT <br />
                  THROUGH <br />
                  <span className="text-white/90">CURIOSITY.</span>
                </h2>
                <p className="text-xs sm:text-base text-[#A1A1AA] font-light max-w-xs sm:max-w-md pt-1 leading-relaxed">
                  The seal releases. Vapor mist vortices awaken in dark space.
                </p>
              </motion.div>
            )}

            {/* ACT 4: The Draw */}
            {currentAct === 'act4' && null}

            {/* ACT 5: Forged Through Experimentation */}
            {currentAct === 'act5' && (
              <motion.div
                key="act5"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)', scale: 0.98 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: -16, filter: 'blur(8px)', scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 sm:space-y-4 max-w-2xl"
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[9px] sm:text-[10px] font-mono-code text-[#E4E4E7] font-semibold tracking-widest uppercase">
                  <span>ACT 05 // INNOVATION</span>
                </div>
                <h2 className="font-heading text-4xl sm:text-7xl lg:text-8xl font-black text-[#F5F5F7] tracking-tight leading-[0.95] sm:leading-[0.92] uppercase">
                  FORGED <br />
                  THROUGH <br />
                  <span className="text-white/90">EXPERIMENTATION.</span>
                </h2>
                <p className="text-xs sm:text-base text-[#A1A1AA] font-light max-w-xs sm:max-w-md pt-1 leading-relaxed">
                  Differential clay-tempered wave hamon line. Slicing through complexity with code and music.
                </p>
              </motion.div>
            )}

            {/* ACT 6: Ready For What's Next / Laksh Mahajan */}
            {currentAct === 'act6' && (
              <motion.div
                key="act6"
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)', scale: 0.98 }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, y: -16, filter: 'blur(8px)', scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3 sm:space-y-4 max-w-2xl pointer-events-auto"
              >
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[9px] sm:text-[10px] font-mono-code text-[#E4E4E7] font-semibold tracking-widest uppercase">
                  <span>ACT 06 // MASTERY</span>
                </div>
                <h2 className="font-heading text-4xl sm:text-7xl lg:text-8xl font-black text-[#F5F5F7] tracking-tight leading-[0.95] sm:leading-[0.92] uppercase">
                  READY FOR <br />
                  <span className="text-white/90">WHAT'S NEXT.</span>
                </h2>
                
                <div className="pt-1 space-y-0.5">
                  <p className="text-base sm:text-xl font-heading font-bold text-white tracking-wide">
                    Laksh Mahajan
                  </p>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] font-mono-code">
                    Aspiring AI Engineer • Lyricist & Music Producer (Raktaan) • Author (MJ World)
                  </p>
                </div>
                
                <div className="pt-3">
                  <button
                    onClick={scrollToPortfolio}
                    className="min-h-[48px] px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-black font-mono-code font-bold text-xs uppercase tracking-widest flex items-center gap-2.5 transition-all hover:bg-[#E5E5EA] active:scale-95 cursor-pointer shadow-xl"
                  >
                    <span>Explore My Work</span>
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* BOTTOM FOOTER: Frame Tracker & Scroll Indicator */}
        <footer className="w-full max-w-7xl mx-auto px-5 sm:px-8 pb-5 sm:pb-8 flex items-center justify-between z-30 relative pointer-events-none">
          {/* Frame Counter */}
          <div className="text-[9px] sm:text-[10px] font-mono-code text-[#71717A] tracking-widest uppercase flex items-center gap-1.5">
            <span>FRAME {String(activeFrame + 1).padStart(3, '0')} / {TOTAL_FRAMES}</span>
            {isSettled && (
              <span className="text-[#E4E4E7] font-semibold hidden xs:inline">• 4K</span>
            )}
          </div>

          {/* Scroll Down Hint */}
          <div 
            style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
            className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono-code text-[#86868B] tracking-widest uppercase transition-opacity duration-300"
          >
            <span>Scroll</span>
            <ChevronDown className="w-3 h-3 animate-bounce" />
          </div>

          {/* Minimal Story Progress Bar */}
          <div className="w-20 sm:w-28 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div 
              style={{ width: `${scrollProgress * 100}%` }}
              className="h-full bg-gradient-to-r from-white/30 via-white to-white/30 transition-all duration-75"
            />
          </div>
        </footer>

      </div>
    </div>
  );
}
