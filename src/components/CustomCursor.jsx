import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Motion values avoid React re-renders on mousemove
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // High-performance springs for dot and ring
  const dotX = useSpring(rawX, { damping: 35, stiffness: 500, mass: 0.1 });
  const dotY = useSpring(rawY, { damping: 35, stiffness: 500, mass: 0.1 });

  const ringX = useSpring(rawX, { damping: 26, stiffness: 280, mass: 0.35 });
  const ringY = useSpring(rawY, { damping: 26, stiffness: 280, mass: 0.35 });

  const lastTargetRef = useRef(null);

  useEffect(() => {
    // Check if device is touch / mobile
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      // Throttled target check to avoid excessive state updates
      const target = e.target;
      if (target === lastTargetRef.current) return;
      lastTargetRef.current = target;

      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        setIsHovered(true);
        setCursorText(cursorTarget.getAttribute('data-cursor') || '');
      } else if (target.closest('button, a, input, textarea, select, [role="button"]')) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [rawX, rawY]);

  if (isMobile) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference gpu-layer"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
          scale: isHovered ? 0 : isClicking ? 0.7 : 1,
        }}
        transition={{ scale: { type: 'spring', damping: 25, stiffness: 350 } }}
      />

      {/* Outer Titanium Ring / Badge Follower */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full border border-white/40 bg-[#0F0F12]/90 backdrop-blur-md text-white text-[10px] font-mono-code font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.15)] gpu-layer ${
          cursorText ? 'px-3 py-1.5 rounded-2xl w-auto h-auto' : ''
        }`}
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorText ? 'auto' : isHovered ? 48 : 32,
          height: cursorText ? 'auto' : isHovered ? 48 : 32,
          scale: isClicking ? 0.88 : isHovered ? 1.12 : 1,
          borderColor: isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)',
        }}
        transition={{
          width: { type: 'spring', damping: 25, stiffness: 280 },
          height: { type: 'spring', damping: 25, stiffness: 280 },
          scale: { type: 'spring', damping: 25, stiffness: 350 },
        }}
      >
        {cursorText && <span className="whitespace-nowrap text-white">{cursorText}</span>}
      </motion.div>
    </>
  );
}
