import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  variant = 'default',
  icon: Icon,
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Magnetic displacement strength
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer overflow-hidden group border';

  const variants = {
    primary:
      'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white border-purple-500/40 shadow-lg shadow-purple-900/30 hover:shadow-purple-500/40 hover:border-purple-400',
    secondary:
      'bg-slate-900/80 text-slate-200 border-slate-700/60 hover:bg-slate-800/90 hover:text-white hover:border-purple-500/50 backdrop-blur-md shadow-md hover:shadow-purple-900/20',
    glass:
      'glass-pill text-slate-100 hover:text-white hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]',
    outline:
      'border-slate-800 text-slate-300 hover:text-white hover:border-purple-500/60 bg-transparent hover:bg-purple-950/20',
  };

  const selectedVariant = variants[variant] || variants.primary;

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.1 }}
      className={`${baseStyles} ${selectedVariant} ${className}`}
      onClick={onClick}
    >
      {/* Radial Hover Spotlight */}
      <div
        className={`absolute inset-0 bg-radial from-white/20 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Button Text */}
      <span className="relative z-10 font-semibold tracking-wide flex items-center gap-2">
        {children}
        {Icon && (
          <Icon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
        )}
      </span>

      {/* Glow highlight line */}
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent group-hover:w-3/4 transition-all duration-300 opacity-80" />
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
        {content}
      </a>
    );
  }

  return content;
}
