import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function KatanaBladeScroll() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 2.2);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Blade unsheathes (draws out) as user scrolls down the page
  const bladeDraw = useTransform(smoothProgress, [0, 1], [15, 100]);
  const bladeSheenX = useTransform(smoothProgress, [0, 1], ['-100%', '200%']);

  if (!isVisible) return null;

  return (
    <div className="fixed top-24 right-8 z-40 hidden xl:flex flex-col items-center pointer-events-none select-none transition-opacity duration-500">
      
      {/* Katana Blade Vertical Assembly */}
      <div className="relative w-8 h-64 flex flex-col items-center">
        
        {/* Tsuka (Handle) */}
        <div className="w-3.5 h-16 rounded-t-sm bg-[#18181B] border border-white/20 relative shadow-lg flex flex-col justify-around py-1.5 items-center">
          {/* Tsuka-ito diamond wrap pattern */}
          <div className="w-2.5 h-1.5 bg-[#27272A] border-y border-white/10" />
          <div className="w-2.5 h-1.5 bg-[#27272A] border-y border-white/10" />
          <div className="w-2.5 h-1.5 bg-[#27272A] border-y border-white/10" />
        </div>

        {/* Tsuba (Handguard) */}
        <div className="w-8 h-1.5 rounded-full bg-[#3F3F46] border border-white/30 shadow-md my-0.5 z-10" />

        {/* Habaki & Exposed Blade (Unsheathes based on scroll) */}
        <div className="relative w-2 h-44 bg-[#121214] border border-white/10 rounded-b-sm overflow-hidden flex flex-col justify-end">
          
          {/* Razor Steel Katana Blade (Extends on scroll) */}
          <motion.div
            style={{ height: `${bladeDraw.get()}%` }}
            className="w-full bg-gradient-to-t from-[#FFFFFF] via-[#E2E8F0] to-[#94A3B8] relative shadow-[0_0_12px_rgba(255,255,255,0.4)]"
          >
            {/* Hamon (Temper Line) */}
            <div className="absolute inset-y-0 right-0 w-[0.5px] bg-white/80" />

            {/* Dynamic Blade Sheen Sweep */}
            <motion.div
              style={{ top: bladeSheenX }}
              className="absolute inset-x-0 h-6 bg-gradient-to-b from-transparent via-white to-transparent opacity-80"
            />
          </motion.div>
        </div>

      </div>

      {/* Minimalist Katana Progress Monospace Label */}
      <div className="mt-3 text-[9px] font-mono-code text-[#86868B] tracking-widest uppercase text-center">
        <span>KATANA // PROGRESS</span>
      </div>

    </div>
  );
}
