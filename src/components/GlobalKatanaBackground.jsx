import React, { useRef, useState, useEffect, useCallback } from 'react';

const TOTAL_FRAMES = 300;
const STANDARD_FRAME_PREFIX = '/katana-frames/ezgif-frame-';
const HQ_FRAME_PREFIX = '/katana-frames-hq/ezgif-frame-';

export default function GlobalKatanaBackground({ activePage }) {
  const canvasRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  // Standard frames cache (1920x1080)
  const standardImagesRef = useRef(new Array(TOTAL_FRAMES));
  // HQ frames cache (3840x2160 WebP)
  const hqCacheRef = useRef(new Map());

  // Frame and Settle tracking
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(performance.now());
  const settleTimeoutRef = useRef(null);
  const inspectionTimerRef = useRef(null);
  const isInspectionModeRef = useRef(false);

  // Crossfade alpha for HQ settled frame
  const hqAlphaRef = useRef(0);

  // Mouse / Touch Parallax & Ambient Light
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Atmospheric Particles (Sakura petals & vapor specks)
  const particlesRef = useRef([]);

  // Initialize multi-depth atmospheric particles (optimized count on mobile)
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const particleCount = isMobile ? 18 : 38;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random();
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (0.2 + depth * 0.4),
        vy: 0.18 + depth * 0.5,
        size: depth > 0.7 ? 3.2 + Math.random() * 2.5 : 1.2 + Math.random() * 1.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        opacity: depth > 0.7 ? 0.32 + Math.random() * 0.35 : 0.12 + Math.random() * 0.28,
        depth: depth,
        type: Math.random() > 0.35 ? 'petal' : 'mist',
      });
    }
    particlesRef.current = particles;
  }, []);

  // Preload standard frames
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
      // Priority first 30 frames
      const priorityBatch = [];
      for (let i = 1; i < 30; i++) {
        priorityBatch.push(loadSingleFrame(i));
      }
      await Promise.all(priorityBatch);

      // Remaining frames in background batches
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

  // Smart HQ Loader
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

  // Main Canvas Renderer (Dual Layer: Standard + 4K HQ Settled WebP with Mobile Responsive Framing)
  const renderCanvas = useCallback((frameIdx, hqBlend, progress, camX, camY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Fill deep studio dark
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

    // Smart Mobile vs Desktop Framing:
    // On vertical mobile screens (cw < ch), scale so the entire Katana is visible and well-framed
    const isVertical = cw < ch;
    const baseAspectScale = isVertical 
      ? Math.max(cw / iw, ch / ih * 0.72) * 1.25 
      : Math.max(cw / iw, ch / ih);

    const dynamicScale = baseAspectScale * (1.0 + Math.sin(progress * Math.PI) * 0.06);
    const nw = iw * dynamicScale;
    const nh = ih * dynamicScale;
    const nx = (cw - nw) / 2 + camX * cw * (isVertical ? 0.008 : 0.015);
    const ny = (ch - nh) / 2 + camY * ch * (isVertical ? 0.008 : 0.015);

    // Layer 1: Standard Frame
    ctx.globalAlpha = 1.0;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = isVertical ? 'medium' : 'high';
    ctx.drawImage(standardImg, nx, ny, nw, nh);

    // Layer 2: 4K HQ Settled WebP Frame
    if (hqBlend > 0.01) {
      const hqImg = hqCacheRef.current.get(frameIdx);
      if (hqImg && hqImg.complete && hqImg.naturalWidth > 0) {
        ctx.globalAlpha = Math.min(1.0, hqBlend);
        ctx.drawImage(hqImg, nx, ny, nw, nh);
      }
    }

    ctx.globalAlpha = 1.0;

    // Dynamic Blade Glint Sweep
    if (frameIdx >= 120 && frameIdx <= 250) {
      const bProgress = (frameIdx - 120) / 130;
      const gx = nx + nw * (0.32 + bProgress * 0.35) + mouseRef.current.x * 35;
      const gy = ny + nh * 0.44 + mouseRef.current.y * 25;

      const grad = ctx.createRadialGradient(gx, gy, 4, gx, gy, isVertical ? 110 : 180);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.06)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cw, ch);
    }
  }, []);

  // Multi-Depth Particles Renderer
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
      p.x += p.vx * speedMultiplier + mouseX * 0.35 * p.depth;
      p.rotation += p.rotationSpeed;

      if (p.y > h + 30) p.y = -30;
      if (p.x > w + 30) p.x = -30;
      if (p.x < -30) p.x = w + 30;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;

      if (p.type === 'petal') {
        ctx.fillStyle = p.depth > 0.6 ? 'rgba(255, 192, 203, 0.7)' : 'rgba(255, 182, 193, 0.4)';
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

  // Handle Resize and Retina (capped to 1.5 on mobile for 120fps power efficiency)
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

    renderCanvas(currentFrameRef.current, hqAlphaRef.current, 0, mouseRef.current.x, mouseRef.current.y);
  }, [renderCanvas]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Master Global Scroll Sync Loop
  useEffect(() => {
    let animId;

    const onScroll = () => {
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      ) - window.innerHeight;

      if (docHeight <= 0) return;

      const progress = Math.min(1, Math.max(0, window.scrollY / docHeight));
      const target = progress * (TOTAL_FRAMES - 1);
      targetFrameRef.current = target;

      // Scroll velocity
      const now = performance.now();
      const dt = Math.max(1, now - lastScrollTimeRef.current);
      const dy = window.scrollY - lastScrollYRef.current;
      scrollVelocityRef.current = dy / dt;
      lastScrollYRef.current = window.scrollY;
      lastScrollTimeRef.current = now;

      // Reset HQ alpha during active scroll
      hqAlphaRef.current = 0;
      isInspectionModeRef.current = false;

      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
      if (inspectionTimerRef.current) clearTimeout(inspectionTimerRef.current);

      // Settle Detector (~160ms of stillness)
      settleTimeoutRef.current = setTimeout(() => {
        const settledFrame = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.round(currentFrameRef.current))
        );
        preloadHQNeighborhood(settledFrame);

        inspectionTimerRef.current = setTimeout(() => {
          isInspectionModeRef.current = true;
        }, 600);
      }, 160);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mouse movement & Touch listener
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

    // 60FPS RAF Engine Loop
    const loop = () => {
      const frameDiff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += frameDiff * 0.18;
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
      } else {
        hqAlphaRef.current = 0;
      }

      renderCanvas(currentRounded, hqAlphaRef.current, currentFrameRef.current / (TOTAL_FRAMES - 1), camX, camY);
      renderParticles(scrollVelocityRef.current, mouseRef.current.x, mouseRef.current.y);

      scrollVelocityRef.current *= 0.9;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animId);
      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
      if (inspectionTimerRef.current) clearTimeout(inspectionTimerRef.current);
    };
  }, [renderCanvas, renderParticles, preloadHQNeighborhood, activePage]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      {/* Instant Frame 1 Fallback */}
      <img
        src={`${STANDARD_FRAME_PREFIX}001.jpg`}
        alt="Global Katana Background"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
      />

      {/* Dual Layer High-DPI Katana Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
      />

      {/* Multi-Depth Sakura & Vapor Particles */}
      <canvas
        ref={particlesCanvasRef}
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20"
      />

      {/* Subtle Ambient Radial Lighting Drift */}
      <div 
        style={{
          transform: `translate(${mouseRef.current.x * 20}px, ${mouseRef.current.y * 20}px)`,
        }}
        className="absolute inset-0 bg-radial from-white/[0.03] via-transparent to-transparent pointer-events-none z-25 transition-transform duration-700 ease-out"
      />
    </div>
  );
}
