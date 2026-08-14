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

  // Depth-separated particles
  const particlesRef = useRef([]);

  // Initialize multi-depth background particles
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const particleCount = isMobile ? 12 : 20;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random();
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (0.15 + depth * 0.25),
        vy: 0.12 + depth * 0.3,
        size: depth > 0.7 ? 2.2 + Math.random() * 1.5 : 1.0 + Math.random() * 1.0,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: depth > 0.7 ? 0.25 + Math.random() * 0.25 : 0.08 + Math.random() * 0.18,
        depth: depth,
        type: Math.random() > 0.35 ? 'petal' : 'mist',
      });
    }
    particlesRef.current = particles;
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
  }, []);

  // Main Canvas Renderer
  const renderCanvas = useCallback((frameIdx, progress, camX, camY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
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
      ? Math.max(cw / iw, (ch / ih) * 0.75) * 1.2
      : Math.max(cw / iw, ch / ih);

    const camScale = 1.0 + Math.sin(progress * Math.PI) * 0.04;
    const fitScale = baseAspectFit * camScale;
    const nw = iw * fitScale;
    const nh = ih * fitScale;
    const nx = (cw - nw) / 2 + camX * cw * 0.015;
    const ny = (ch - nh) / 2 + camY * ch * 0.015;

    ctx.globalAlpha = 1.0;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'medium';
    ctx.drawImage(img, nx, ny, nw, nh);

    // Blade Hamon Light Sheen Sweep
    if (frameIdx >= 125 && frameIdx <= 245) {
      const bProgress = (frameIdx - 125) / 120;
      const gx = nx + nw * (0.32 + bProgress * 0.35) + mouseRef.current.x * (isVertical ? 25 : 50);
      const gy = ny + nh * 0.44 + mouseRef.current.y * (isVertical ? 18 : 35);

      const grad = ctx.createRadialGradient(gx, gy, 4, gx, gy, isVertical ? 100 : 150);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.05)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cw, ch);
    }
  }, []);

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

      const speedMultiplier = 1 + Math.min(Math.abs(velocity), 3) * 1.2;
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
        ctx.fillStyle = p.depth > 0.6 ? 'rgba(255, 255, 255, 0.6)' : 'rgba(215, 215, 225, 0.3)';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 1.4, p.size * 0.75, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }, []);

  // Handle Resize and Retina
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const pCanvas = particlesCanvasRef.current;
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);

    if (canvas) {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    }
    if (pCanvas) {
      pCanvas.width = window.innerWidth * dpr;
      pCanvas.height = window.innerHeight * dpr;
    }

    renderCanvas(currentFrameRef.current, 0, mouseRef.current.x, mouseRef.current.y);
  }, [renderCanvas]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Master Global Scroll Sync Loop
  useEffect(() => {
    // Only run active frame scrubbing on subpages; on portfolio page KatanaScrollEntry handles intro
    const isSubPage = activePage !== 'portfolio';

    let animId;

    const onScroll = () => {
      if (!isSubPage) return;

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

    if (isSubPage) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    const onMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      mouseRef.current.targetY = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    };

    const onTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        const { innerWidth, innerHeight } = window;
        mouseRef.current.targetX = (e.touches[0].clientX - innerWidth / 2) / (innerWidth / 2);
        mouseRef.current.targetY = (e.touches[0].clientY - innerHeight / 2) / (innerHeight / 2);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    const loop = () => {
      if (isSubPage) {
        const frameDiff = targetFrameRef.current - currentFrameRef.current;
        currentFrameRef.current += frameDiff * 0.18;
      } else {
        currentFrameRef.current = 0;
      }

      const currentRounded = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(currentFrameRef.current))
      );

      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      const camX = mouseRef.current.x * 0.25;
      const camY = mouseRef.current.y * 0.25;

      if (isSubPage) {
        renderCanvas(currentRounded, currentFrameRef.current / (FRAME_COUNT - 1), camX, camY);
      }
      renderParticles(scrollVelocityRef.current, mouseRef.current.x);

      scrollVelocityRef.current *= 0.85;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      if (isSubPage) {
        window.removeEventListener('scroll', onScroll);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animId);
    };
  }, [renderCanvas, renderParticles, activePage]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      {/* Instant Frame 1 Fallback */}
      <img
        src={`${BASE_FRAME_URL}001.jpg`}
        alt="Global Katana Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-40"
      />

      {/* Main Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 gpu-layer opacity-40"
      />

      {/* Atmospheric Particles Layer */}
      <canvas
        ref={particlesCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
      />

      {/* Background Dark Obsidian Vignette Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#08080A]/60 to-[#08080A]/90 pointer-events-none z-25" />
    </div>
  );
}
