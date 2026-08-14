import React, { useEffect, useRef } from 'react';

export default function InteractiveStrings() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable on mobile / touch-only devices to save 100% CPU/GPU and prevent scroll stutter
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768;
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initStrings();
      }, 150);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, speed: 0 };

    const handleMouseMove = (e) => {
      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Create tension strings across the viewport
    let strings = [];
    const initStrings = () => {
      strings = [];
      const stringCount = 5;
      for (let i = 0; i < stringCount; i++) {
        const yBase = (height / (stringCount + 1)) * (i + 1);
        const pointCount = 28;
        const points = [];
        for (let j = 0; j < pointCount; j++) {
          points.push({
            x: (width / (pointCount - 1)) * j,
            y: yBase,
            originY: yBase,
            vy: 0,
            phase: (i * 0.5) + (j * 0.1),
          });
        }
        strings.push({
          points,
          yBase,
          tension: 0.08,
          damping: 0.92,
        });
      }
    };
    initStrings();

    let time = 0;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      strings.forEach((str, strIdx) => {
        str.points.forEach((p, idx) => {
          if (idx === 0 || idx === str.points.length - 1) return;

          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            const force = (1 - dist / 80) * (mouse.y - mouse.prevY) * 0.35;
            p.vy += force;
          }

          const idleWave = Math.sin(time + p.phase) * 0.12;
          const displacement = (p.y - p.originY) - idleWave;
          const spring = -str.tension * displacement;
          p.vy += spring;
          p.vy *= str.damping;
          p.y += p.vy;
        });

        ctx.beginPath();
        ctx.moveTo(str.points[0].x, str.points[0].y);

        for (let i = 0; i < str.points.length - 1; i++) {
          const xc = (str.points[i].x + str.points[i + 1].x) / 2;
          const yc = (str.points[i].y + str.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(str.points[i].x, str.points[i].y, xc, yc);
        }
        ctx.lineTo(
          str.points[str.points.length - 1].x,
          str.points[str.points.length - 1].y
        );

        ctx.strokeStyle = strIdx % 2 === 0 ? 'rgba(255, 255, 255, 0.07)' : 'rgba(255, 255, 255, 0.035)';
        ctx.lineWidth = 1;
        ctx.stroke();

        str.points.forEach((p) => {
          const disp = Math.abs(p.y - p.originY);
          if (disp > 1.5) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.min(disp * 0.25, 3), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(disp * 0.05, 0.4)})`;
            ctx.fill();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 gpu-layer hidden md:block"
    />
  );
}
