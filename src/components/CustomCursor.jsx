import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is touch / mobile
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Check hovered element data attributes
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setIsHovered(true);
        setCursorText(target.getAttribute('data-cursor') || '');
      } else if (e.target.closest('button, a, input, textarea, select')) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main White Dot Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-white mix-blend-difference"
        animate={{
          x: mousePos.x - 4,
          y: mousePos.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.2 }}
        style={{ width: 8, height: 8 }}
      />

      {/* Outer Titanium Ring / Badge Follower */}
      <motion.div
        className={`fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center rounded-full border border-white/40 bg-[#0F0F12]/90 backdrop-blur-md text-white text-[10px] font-mono-code font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.15)] ${
          cursorText ? 'px-3 py-1.5 rounded-2xl w-auto h-auto' : ''
        }`}
        animate={{
          x: mousePos.x - (cursorText ? 50 : isHovered ? 24 : 16),
          y: mousePos.y - (cursorText ? 16 : isHovered ? 24 : 16),
          width: cursorText ? 'auto' : isHovered ? 48 : 32,
          height: cursorText ? 'auto' : isHovered ? 48 : 32,
          scale: isHovered ? 1.1 : 1,
          borderColor: isHovered ? '#FFFFFF' : 'rgba(255, 255, 255, 0.3)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      >
        {cursorText && <span className="whitespace-nowrap text-white">{cursorText}</span>}
      </motion.div>
    </>
  );
}
