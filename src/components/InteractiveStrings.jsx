import React, { useEffect, useRef } from 'react';

export default function InteractiveStrings() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStrings();
    };
    window.addEventListener('resize', handleResize);

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
    window.addEventListener('mousemove', handleMouseMove);

    // Create tension strings across the viewport
    let strings = [];
    const initStrings = () => {
      strings = [];
      const stringCount = 6;
      for (let i = 0; i < stringCount; i++) {
        const yBase = (height / (stringCount + 1)) * (i + 1);
        const pointCount = 35;
        const points = [];
        for (let j = 0; j < pointCount; j++) {
          points.push({
            x: (width / (pointCount - 1)) * j,
            y: yBase,
            originY: yBase,
            vy: 0,
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

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      strings.forEach((str) => {
        // Update points
        str.points.forEach((p, idx) => {
          if (idx === 0 || idx === str.points.length - 1) return; // anchor ends

          // Mouse interaction (pluck string)
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            const force = (1 - dist / 90) * (mouse.y - mouse.prevY) * 0.4;
            p.vy += force;
          }

          // Spring physics back to baseline
          const displacement = p.y - p.originY;
          const spring = -str.tension * displacement;
          p.vy += spring;
          p.vy *= str.damping;
          p.y += p.vy;
        });

        // Draw string with quadratic curve smoothing
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

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Highlight plucked area with subtle white glow
        str.points.forEach((p) => {
          const disp = Math.abs(p.y - p.originY);
          if (disp > 1.5) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.min(disp * 0.3, 3), 0, Math.PI * 2);
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
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
