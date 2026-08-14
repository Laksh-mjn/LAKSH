import React, { useRef, useEffect, useCallback } from 'react';

const TOTAL_FRAMES = 300;
const FRAME_PREFIX = '/katana-frames/ezgif-frame-';

export default function GlobalKatanaBackground({ activePage }) {
  const canvasRef = useRef(null);
  const particlesCanvasRef = useRef(null);

  // High-fidelity standard frames cache
  const imagesRef = useRef(new Array(TOTAL_FRAMES));

  // Animation controller refs (bypasses React re-renders for buttery 120fps RAF loop)
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(performance.now());
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isInspectionModeRef = useRef(false);

  // Depth-separated particles
  const particlesRef = useRef([]);

  // Initialize multi-depth background particles (Monochromatic aesthetic)
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const particleCount = isMobile ? 18 : 36;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random();
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * (0.2 + depth * 0.35),
        vy: 0.15 + depth * 0.45,
        size: depth > 0.7 ? 2.8 + Math.random() * 2.0 : 1.2 + Math.random() * 1.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.025,
        opacity: depth > 0.7 ? 0.35 + Math.random() * 0.35 : 0.12 + Math.random() * 0.25,
        depth: depth,
        type: Math.random() > 0.35 ? 'petal' : 'mist',
      });
    }
    particlesRef.current = particles;
  }, []);

  // Preload all frames with async off-thread decoding
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
      // Instant batch (first 30 frames)
      const priorityBatch = [];
      for (let i = 0; i < 30; i++) {
        priorityBatch.push(loadSingleFrame(i));
      }
      await Promise.all(priorityBatch);

      // Fast streaming background load in chunks
      for (let i = 30; i < TOTAL_FRAMES; i += 30) {
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

  // Main Canvas Renderer (Dual Layer with full sharpness)
  const renderCanvas = useCallback((frameIdx, progress, camX, camY) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;

    // Rich obsidian black base
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

    // Cinematic camera transform based on scroll
    const baseAspectFit = isVertical
      ? Math.max(cw / iw, (ch / ih) * 0.72) * 1.25
      : Math.max(cw / iw, ch / ih);

    const camScale = 1.0 + Math.sin(progress * Math.PI) * 0.05;
    const fitScale = baseAspectFit * camScale;
    const nw = iw * fitScale;
    const nh = ih * fitScale;
    const nx = (cw - nw) / 2 + camX * cw * 0.015;
    const ny = (ch - nh) / 2 + camY * ch * 0.015;

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
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 0.06)');
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

  // Handle Resize and Retina
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

    renderCanvas(currentFrameRef.current, 0, mouseRef.current.x, mouseRef.current.y);
  }, [renderCanvas]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  // Master Global Scroll Sync Loop with 2.2x Faster Dynamic Frame Velocity
  useEffect(() => {
    let animId;

    const onScroll = () => {
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      ) - window.innerHeight;

      if (docHeight <= 0) return;

      // Smooth frame moving speed across portfolio sections
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

    // 120FPS RAF Engine Loop with smooth 0.22 frame interpolation
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

      renderCanvas(currentRounded, currentFrameRef.current / (TOTAL_FRAMES - 1), camX, camY);
      renderParticles(scrollVelocityRef.current, mouseRef.current.x);

      scrollVelocityRef.current *= 0.9;

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animId);
    };
  }, [renderCanvas, renderParticles, activePage]);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
      {/* Instant Frame 1 Fallback */}
      <img
        src={`${FRAME_PREFIX}001.jpg`}
        alt="Global Katana Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* Main Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10 gpu-layer"
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
