import React, { useRef, useEffect, useCallback } from 'react';
import {
  FRAME_COUNT,
  BASE_FRAME_URL,
  preloadKatanaFrames,
  getCachedFrame,
  onFrameLoaded,
} from '../utils/frameLoader';

export default function GlobalKatanaBackground({ activePage }) {
  const canvasRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  // Animation controller refs
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(performance.now());
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isMobileRef = useRef(false);
  const ambientTimeRef = useRef(0);

  // Depth-separated particles
  const particlesRef = useRef([]);

  // Initialize multi-depth background particles
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    isMobileRef.current = isMobile;

    const particleCount = isMobile ? 8 : 24;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random();
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (0.18 + depth * 0.22),
        vy: 0.15 + depth * 0.28,
        size: depth > 0.7 ? 2.2 + Math.random() * 1.4 : 1.2 + Math.random() * 0.9,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.018,
        opacity: depth > 0.7 ? 0.35 + Math.random() * 0.25 : 0.12 + Math.random() * 0.18,
        depth: depth,
        type: Math.random() > 0.4 ? 'petal' : 'mist',
      });
    }
    particlesRef.current = particles;
  }, []);

  // Main Canvas Renderer with Glassmorphism Lighting
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

    const baseAspectFit = isVertical
      ? Math.max(cw / iw, (ch / ih) * 0.75) * 1.15
      : Math.max(cw / iw, ch / ih);

    // Dynamic 3D cinematic camera scaling & drift
    const ambientFloat = Math.sin(ambientTimeRef.current * 0.8) * 0.008;
    const camScale = 1.0 + Math.sin(progress * Math.PI) * 0.05 + ambientFloat;
    const fitScale = baseAspectFit * camScale;
    const nw = iw * fitScale;
    const nh = ih * fitScale;
    const nx = (cw - nw) / 2 + camX * cw * 0.018;
    const ny = (ch - nh) / 2 + (camY * ch * 0.018) + (ambientFloat * ch * 0.5);

    ctx.globalAlpha = 1.0;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = isMobileRef.current ? 'low' : 'medium';
    ctx.drawImage(img, nx, ny, nw, nh);

    // Razor Blade Hamon Light Glow Sweep (Frames 100 to 260)
    if (frameIdx >= 100 && frameIdx <= 260) {
      const bProgress = (frameIdx - 100) / 160;
      const gx = nx + nw * (0.30 + bProgress * 0.4) + mouseRef.current.x * (isVertical ? 25 : 50);
      const gy = ny + nh * 0.44 + mouseRef.current.y * (isVertical ? 20 : 35);

      const grad = ctx.createRadialGradient(gx, gy, 6, gx, gy, isVertical ? 110 : 160);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      grad.addColorStop(0.35, 'rgba(255, 255, 255, 0.08)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cw, ch);
    }
  }, []);

  // Preload shared frames
  useEffect(() => {
    preloadKatanaFrames();
    const unsubscribe = onFrameLoaded(() => {
      if (currentFrameRef.current === 0) {
        renderCanvas(0, 0, mouseRef.current.x, mouseRef.current.y);
      }
    });
    return () => unsubscribe();
  }, [renderCanvas]);

  // Multi-Depth Particles Renderer
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
      p.x += p.vx * speedMultiplier + mouseX * 0.25 * p.depth;
      p.rotation += p.rotationSpeed;

      if (p.y > h + 20) p.y = -20;
      if (p.x > w + 20) p.x = -20;
      if (p.x < -20) p.x = w + 20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'petal') {
        ctx.fillStyle = p.depth > 0.6 ? 'rgba(255, 255, 255, 0.65)' : 'rgba(230, 230, 240, 0.35)';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.5, p.size * 0.8, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }, []);

  // Handle Resize and Retina with mobile DPR capping
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const pCanvas = particlesCanvasRef.current;
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    isMobileRef.current = isMobile;

    const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);

    if (canvas) {
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
    }
    if (pCanvas) {
      pCanvas.width = Math.round(window.innerWidth * dpr);
      pCanvas.height = Math.round(window.innerHeight * dpr);
    }

    renderCanvas(currentFrameRef.current, 0, mouseRef.current.x, mouseRef.current.y);
  }, [renderCanvas]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Master Global Scroll Sync Loop across the ENTIRE Website (Portfolio & All Subpages)
  useEffect(() => {
    let animId;

    const onScroll = () => {
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      ) - window.innerHeight;

      if (docHeight <= 0) return;

      const progress = Math.min(1, Math.max(0, window.scrollY / docHeight));
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

    const onMouseMove = (e) => {
      if (isMobileRef.current) return;
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      mouseRef.current.targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const loop = () => {
      ambientTimeRef.current += 0.015;

      const lerpSpeed = isMobileRef.current ? 0.16 : 0.12;
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
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [renderCanvas, renderParticles, activePage]);

  return (
    <div className="fixed inset-0 w-full h-[100dvh] pointer-events-none z-0 overflow-hidden select-none">
      {/* Instant Frame 1 Fallback */}
      <img
        src={`${BASE_FRAME_URL}001.jpg`}
        alt="Global Katana Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-60"
      />

      {/* Main 3D Katana Canvas Layer - Luminous & Vivid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 gpu-layer opacity-70 transition-opacity duration-700"
      />

      {/* Atmospheric Particles Layer (Desktop Only) */}
      <canvas
        ref={particlesCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20 hidden md:block"
      />

      {/* Ambient Glassmorphism Light Beam Drift */}
      <div className="absolute inset-0 bg-radial from-white/[0.05] via-transparent to-[#08080A]/85 pointer-events-none z-25" />
    </div>
  );
}
