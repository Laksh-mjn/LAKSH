import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowDown } from 'lucide-react';
import {
  FRAME_COUNT,
  BASE_FRAME_URL,
  preloadKatanaFrames,
  getCachedFrame,
  onFrameLoaded,
} from '../utils/frameLoader';

export default function KatanaScrollEntry({ onEnterComplete }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  // UI & Story State
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeFrame, setActiveFrame] = useState(0);

  // Mouse & Touch Parallax
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Animation controller refs
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(performance.now());
  const isMobileRef = useRef(false);

  // Depth-separated atmospheric particles
  const particlesRef = useRef([]);

  // Initialize multi-depth atmospheric particles (lightweight on mobile)
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    isMobileRef.current = isMobile;

    const particleCount = isMobile ? 6 : 22;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random();
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (0.15 + depth * 0.2),
        vy: 0.12 + depth * 0.25,
        size: depth > 0.7 ? 2.0 + Math.random() * 1.2 : 1.0 + Math.random() * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        opacity: depth > 0.7 ? 0.25 + Math.random() * 0.2 : 0.08 + Math.random() * 0.15,
        depth: depth,
        type: Math.random() > 0.4 ? 'petal' : 'mist',
      });
    }
    particlesRef.current = particles;
  }, []);

  // Trigger frame preloading
  useEffect(() => {
    preloadKatanaFrames();
    const unsubscribe = onFrameLoaded(() => {
      if (currentFrameRef.current === 0) {
        renderCanvas(0, 0, mouseRef.current.x, mouseRef.current.y);
      }
    });
    return () => unsubscribe();
  }, []);

  // Cinematic Camera Transform Matrix
  const getCameraTransform = (progress, camX, camY, isVertical) => {
    let baseScale = 1.0;
    let panX = 0;
    let panY = 0;

    if (progress < 0.17) {
      baseScale = 1.0 + progress * 0.05;
      panX = 0;
      panY = 0;
    } else if (progress >= 0.17 && progress < 0.34) {
      const p = (progress - 0.17) / 0.17;
      baseScale = 1.01 + p * 0.05;
      panX = -p * (isVertical ? 0.008 : 0.018);
      panY = p * 0.008;
    } else if (progress >= 0.34 && progress < 0.51) {
      const p = (progress - 0.34) / 0.17;
      baseScale = 1.06 - p * 0.03;
      panX = (isVertical ? -0.008 : -0.018) + p * (isVertical ? 0.008 : 0.018);
      panY = 0.008 - p * 0.008;
    } else if (progress >= 0.51 && progress < 0.68) {
      const p = (progress - 0.51) / 0.17;
      baseScale = 1.01 + Math.sin(p * Math.PI) * 0.015;
      panX = 0;
      panY = 0;
    } else if (progress >= 0.68 && progress < 0.85) {
      const p = (progress - 0.68) / 0.17;
      baseScale = 1.02 + p * 0.03;
      panX = p * (isVertical ? 0.006 : 0.012);
      panY = -p * 0.008;
    } else {
      const p = (progress - 0.85) / 0.15;
      baseScale = 1.05 - p * 0.05;
      panX = (isVertical ? 0.006 : 0.012) * (1 - p);
      panY = -0.008 * (1 - p);
    }

    return {
      scale: baseScale,
      offsetX: panX + camX * (isVertical ? 0.006 : 0.01),
      offsetY: panY + camY * (isVertical ? 0.006 : 0.01),
    };
  };

  // Main Canvas Rendering Engine
  const renderCanvas = useCallback((frameIdx, progress, camX, camY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false, desynchronized: true });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Obsidian base
    ctx.fillStyle = '#08080A';
    ctx.fillRect(0, 0, cw, ch);

    const img = getCachedFrame(frameIdx);
    if (!img) return;

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    if (!iw || !ih) return;

    const isVertical = cw < ch;
    const { scale: camScale, offsetX, offsetY } = getCameraTransform(progress, camX, camY, isVertical);

    // Responsive aspect fit across all screens (iPhone, iPad, Mac, Ultrawide)
    const baseAspectFit = isVertical
      ? Math.max(cw / iw, (ch / ih) * 0.72) * 1.18
      : Math.max(cw / iw, ch / ih);

    const fitScale = baseAspectFit * camScale;
    const nw = iw * fitScale;
    const nh = ih * fitScale;
    const nx = (cw - nw) / 2 + offsetX * cw;
    const ny = (ch - nh) / 2 + offsetY * ch;

    ctx.globalAlpha = 1.0;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = isMobileRef.current ? 'low' : 'medium';
    ctx.drawImage(img, nx, ny, nw, nh);

    // Blade Hamon Razor Light Sheen Sweep (Frames 125 to 245)
    if (frameIdx >= 125 && frameIdx <= 245) {
      const bProgress = (frameIdx - 125) / 120;
      const gx = nx + nw * (0.32 + bProgress * 0.35) + mouseRef.current.x * (isVertical ? 20 : 40);
      const gy = ny + nh * 0.44 + mouseRef.current.y * (isVertical ? 15 : 30);

      const grad = ctx.createRadialGradient(gx, gy, 4, gx, gy, isVertical ? 95 : 140);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.26)');
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.05)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cw, ch);
    }
  }, []);

  // Multi-Depth Particles Canvas Renderer
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

      const speedMultiplier = 1 + Math.min(Math.abs(velocity), 2.5) * 1.0;
      p.y += p.vy * speedMultiplier;
      p.x += p.vx * speedMultiplier + mouseX * 0.2 * p.depth;
      p.rotation += p.rotationSpeed;

      if (p.y > h + 20) p.y = -20;
      if (p.x > w + 20) p.x = -20;
      if (p.x < -20) p.x = w + 20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'petal') {
        ctx.fillStyle = p.depth > 0.6 ? 'rgba(255, 255, 255, 0.55)' : 'rgba(215, 215, 225, 0.25)';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.75, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }, []);

  // Performance-Optimized Resize & DPR Capping (Prevents Mobile 3x GPU Bottleneck)
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const pCanvas = particlesCanvasRef.current;
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    isMobileRef.current = isMobile;

    // Cap DPR at 1.0 on mobile to prevent rendering 3 million pixels on high-density phones
    const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.75);

    if (canvas) {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    }
    if (pCanvas) {
      pCanvas.width = Math.round(window.innerWidth * dpr);
      pCanvas.height = Math.round(window.innerHeight * dpr);
    }

    renderCanvas(activeFrame, scrollProgress, mouseRef.current.x, mouseRef.current.y);
  }, [renderCanvas, activeFrame, scrollProgress]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Master Scroll & RAF Engine (Dynamic lerp: 0.16 on mobile for instant response, 0.11 on desktop for cinematic glide)
  useEffect(() => {
    let animId;

    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScroll = rect.height - window.innerHeight;
      if (totalScroll <= 0) return;

      const progress = Math.min(1, Math.max(0, -rect.top / totalScroll));
      setScrollProgress(progress);

      const target = progress * (FRAME_COUNT - 1);
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

    const loop = () => {
      const lerpSpeed = isMobileRef.current ? 0.18 : 0.11;
      const frameDiff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += frameDiff * lerpSpeed;
      const currentRounded = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const camX = mouseRef.current.x * 0.2;
      const camY = mouseRef.current.y * 0.2;

      setActiveFrame(currentRounded);

      renderCanvas(currentRounded, currentFrameRef.current / (FRAME_COUNT - 1), camX, camY);
      
      if (!isMobileRef.current) {
        renderParticles(scrollVelocityRef.current, mouseRef.current.x);
      }

      scrollVelocityRef.current *= 0.85;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animId);
    };
  }, [renderCanvas, renderParticles]);

  const handleMouseMove = (e) => {
    if (isMobileRef.current) return;
    const { innerWidth, innerHeight } = window;
    mouseRef.current.targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    mouseRef.current.targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
  };

  const scrollToPortfolio = () => {
    const target = document.querySelector('#portfolio-start');
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    } else if (containerRef.current) {
      const bottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: bottom, behavior: 'smooth' });
    }
    if (onEnterComplete) onEnterComplete();
  };

  const getStoryAct = () => {
    if (scrollProgress < 0.16) return 'act1';
    if (scrollProgress < 0.33) return 'act2';
    if (scrollProgress < 0.50) return 'act3';
    if (scrollProgress < 0.67) return 'act4';
    if (scrollProgress < 0.84) return 'act5';
    return 'act6';
  };

  const currentAct = getStoryAct();

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseRef.current.targetX = 0;
        mouseRef.current.targetY = 0;
      }}
      className="relative h-[340vh] sm:h-[480vh] lg:h-[560vh] bg-[#08080A] selection:bg-white selection:text-black cursor-default touch-pan-y"
    >
      {/* Sticky Fullscreen Cinematic Canvas Layer (using 100dvh for zero mobile jump) */}
      <div className="sticky top-0 h-[100dvh] w-full flex flex-col justify-between overflow-hidden select-none z-30 pointer-events-auto">
        
        {/* Layer 0: Instant Frame 1 Fallback Image */}
        <img
          src={`${BASE_FRAME_URL}001.jpg`}
          alt="Katana Sequence Initial Layer"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        />

        {/* Layer 1: Hardware-Accelerated 120FPS Render Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 gpu-layer"
        />

        {/* Layer 2: Multi-Depth Atmospheric Silver Mist Particles (Desktop) */}
        <canvas
          ref={particlesCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-20 hidden md:block"
        />

        {/* Layer 3: Interactive Ambient Studio Light Drift */}
        <div 
          style={{
            transform: `translate(${mouseRef.current.x * 16}px, ${mouseRef.current.y * 16}px)`,
          }}
          className="absolute inset-0 bg-radial from-white/[0.035] via-transparent to-transparent pointer-events-none z-25 transition-transform duration-700 ease-out"
        />

        {/* TOP BAR */}
        <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-8 flex items-center justify-between z-30 relative">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono-code tracking-widest text-[#A1A1AA] uppercase">
              LAKSH MAHAJAN
            </span>
          </div>

          <button
            onClick={scrollToPortfolio}
            className="min-h-[44px] px-3 flex items-center gap-1.5 text-[11px] sm:text-xs font-mono-code tracking-widest text-[#86868B] hover:text-white transition-colors cursor-pointer uppercase active:scale-95"
          >
            <span>Skip to Portfolio</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </header>

        {/* FOREGROUND: NARRATIVE CINEMATIC TYPOGRAPHY (Responsive font scaling) */}
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-14 flex flex-col justify-center items-start z-30 pointer-events-none relative flex-1">
          <AnimatePresence mode="wait">
            
            {/* ACT 1: Everything Starts With a Vision */}
            {currentAct === 'act1' && (
              <motion.div
                key="act1"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl space-y-3 sm:space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] sm:text-xs font-mono-code font-bold tracking-widest text-[#A1A1AA] uppercase">
                    VISION & INCEPTION
                  </span>
                  <span className="h-[1px] w-8 sm:w-12 bg-white/20" />
                </div>
                <h1 className="font-heading text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] uppercase leading-[0.98] sm:leading-[0.95]">
                  Everything <br />
                  <span className="text-white">Starts With a Vision.</span>
                </h1>
                <p className="font-display text-sm sm:text-xl text-[#A1A1AA] italic leading-relaxed pt-0.5">
                  Before code, before sound, before every creation — there is clarity.
                </p>
              </motion.div>
            )}

            {/* ACT 2: Precision in Every Line */}
            {currentAct === 'act2' && (
              <motion.div
                key="act2"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl space-y-3 sm:space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] sm:text-xs font-mono-code font-bold tracking-widest text-[#A1A1AA] uppercase">
                    CRAFT & DISCIPLINE
                  </span>
                  <span className="h-[1px] w-8 sm:w-12 bg-white/20" />
                </div>
                <h2 className="font-heading text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] uppercase leading-[0.98] sm:leading-[0.95]">
                  Precision in <br />
                  <span className="text-white">Every Line.</span>
                </h2>
                <p className="font-display text-sm sm:text-xl text-[#A1A1AA] italic leading-relaxed pt-0.5">
                  Like folded steel, great engineering demands patience and relentless refinement.
                </p>
              </motion.div>
            )}

            {/* ACT 3: The Spark of Intelligence */}
            {currentAct === 'act3' && (
              <motion.div
                key="act3"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl space-y-3 sm:space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] sm:text-xs font-mono-code font-bold tracking-widest text-[#A1A1AA] uppercase">
                    INTELLIGENCE & AI
                  </span>
                  <span className="h-[1px] w-8 sm:w-12 bg-white/20" />
                </div>
                <h2 className="font-heading text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] uppercase leading-[0.98] sm:leading-[0.95]">
                  The Spark of <br />
                  <span className="text-white">Intelligence.</span>
                </h2>
                <p className="font-display text-sm sm:text-xl text-[#A1A1AA] italic leading-relaxed pt-0.5">
                  Where algorithms become art, and systems learn to reason and create.
                </p>
              </motion.div>
            )}

            {/* ACT 4: Sound, Story, Science */}
            {currentAct === 'act4' && (
              <motion.div
                key="act4"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl space-y-3 sm:space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] sm:text-xs font-mono-code font-bold tracking-widest text-[#A1A1AA] uppercase">
                    HARMONY & CREATIVITY
                  </span>
                  <span className="h-[1px] w-8 sm:w-12 bg-white/20" />
                </div>
                <h2 className="font-heading text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] uppercase leading-[0.98] sm:leading-[0.95]">
                  Sound. Story. <br />
                  <span className="text-white">Science.</span>
                </h2>
                <p className="font-display text-sm sm:text-xl text-[#A1A1AA] italic leading-relaxed pt-0.5">
                  Three dimensions of one mind — producing music, writing worlds, engineering AI.
                </p>
              </motion.div>
            )}

            {/* ACT 5: Forged Through Discipline */}
            {currentAct === 'act5' && (
              <motion.div
                key="act5"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl space-y-3 sm:space-y-4"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] sm:text-xs font-mono-code font-bold tracking-widest text-[#A1A1AA] uppercase">
                    LEADERSHIP & MASTERY
                  </span>
                  <span className="h-[1px] w-8 sm:w-12 bg-white/20" />
                </div>
                <h2 className="font-heading text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] uppercase leading-[0.98] sm:leading-[0.95]">
                  Forged Through <br />
                  <span className="text-white">Discipline.</span>
                </h2>
                <p className="font-display text-sm sm:text-xl text-[#A1A1AA] italic leading-relaxed pt-0.5">
                  19 verified certifications. Published discography. Boundless curiosity.
                </p>
              </motion.div>
            )}

            {/* ACT 6: Ready to Build */}
            {currentAct === 'act6' && (
              <motion.div
                key="act6"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-2xl space-y-4 sm:space-y-6 pointer-events-auto"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-[10px] sm:text-xs font-mono-code font-bold tracking-widest text-[#A1A1AA] uppercase">
                    PORTFOLIO OVERVIEW
                  </span>
                  <span className="h-[1px] w-8 sm:w-12 bg-white/20" />
                </div>
                <h2 className="font-heading text-3xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#F5F5F7] uppercase leading-[0.98] sm:leading-[0.95]">
                  Ready to <br />
                  <span className="text-white">Build the Future.</span>
                </h2>
                <p className="font-display text-sm sm:text-xl text-[#A1A1AA] italic leading-relaxed">
                  Welcome to the digital atelier of Laksh Mahajan.
                </p>

                <div className="pt-2">
                  <button
                    onClick={scrollToPortfolio}
                    className="px-7 py-3.5 sm:px-8 sm:py-4 rounded-full bg-white text-black font-mono-code font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-[#E5E5EA] transition-all hover:scale-105 shadow-xl cursor-pointer"
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
        <footer className="w-full max-w-7xl mx-auto px-4 sm:px-8 pb-5 sm:pb-8 flex items-end justify-between z-30 relative">
          <div className="space-y-2">
            <div className="w-32 sm:w-60 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono-code tracking-widest text-[#86868B] uppercase">
            <span>Scroll to explore</span>
            <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </div>
        </footer>

      </div>
    </div>
  );
}
