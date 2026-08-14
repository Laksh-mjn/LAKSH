import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050507] border-t border-white/[0.06] py-12 text-[#86868B] font-mono-code text-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
          <span className="text-[#F5F5F7] font-medium">LAKSH MAHAJAN // PORTFOLIO</span>
        </div>

        {/* Live Clock & Copyright */}
        <div className="text-center space-y-1">
          <p>© {new Date().getFullYear()} Laksh Mahajan. Built with technology, music & purpose.</p>
          <p className="text-[10px] text-[#A1A1AA]">TIME: {time || '12:00:00'} IST</p>
        </div>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-[#0F0F12] border border-white/15 text-white hover:bg-white hover:text-black transition-all cursor-pointer shadow-md"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
}
