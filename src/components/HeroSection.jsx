import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Disc, BookOpen, ShieldCheck } from 'lucide-react';
import heroKatanaMinimal from '../assets/hero_katana_minimal.jpg';

export default function HeroSection({ onOpenRaktaan, onOpenMJWorld, onOpenCertifications }) {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMouseOffset({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden">
      
      {/* Background Subtle Gradient & Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-white/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Minimal Apple-Grade Typography */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Minimal Monospace Tag */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#A1A1AA] text-xs font-mono-code tracking-wider"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>ASPIRING AI ENGINEER & CREATIVE TECHNOLOGIST</span>
            </motion.div>

            {/* Main Headline with Razor Slash Underline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-[#F5F5F7] leading-[0.95] uppercase"
              >
                Laksh <br />
                <span className="text-white relative inline-block">
                  Mahajan
                  {/* Subtle razor-thin Katana underline */}
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
                    className="absolute -bottom-2 left-0 h-[1.5px] bg-gradient-to-r from-white via-white/60 to-transparent"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="font-mono-code text-xs sm:text-sm text-[#A1A1AA] tracking-wide uppercase font-medium pt-1"
              >
                Lyricist • Composer • Music Producer • Event Director • Novelist • B.Tech CSE
              </motion.p>
            </div>

            {/* Core Bio */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-base sm:text-lg text-[#86868B] leading-relaxed max-w-2xl font-light"
            >
              I’m <strong className="text-[#F5F5F7] font-semibold">Laksh Mahajan</strong>, an aspiring AI Engineer exploring <span className="text-white font-medium">Artificial Intelligence, Machine Learning, Cybersecurity, Data Analytics, and Cloud Computing</span>. Beyond engineering, I compose and produce music as <strong className="text-white font-semibold">Raktaan</strong>, author novels in <strong className="text-white font-semibold">MJ World</strong>, and lead as President of Youth On Beat & District VP of Betiya Foundation.
            </motion.p>

            {/* Minimalist Core Philosophy Block */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="p-6 rounded-2xl bg-[#0F0F12]/80 border border-white/10 backdrop-blur-xl relative overflow-hidden blade-shine"
            >
              <p className="font-display text-lg sm:text-xl italic text-[#E5E5EA] leading-snug font-normal">
                “I build with technology, create through music, and lead with purpose.”
              </p>
            </motion.div>

            {/* Minimal Editorial Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#projects"
                className="px-8 py-4 rounded-full bg-white text-black font-mono-code font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-all hover:bg-[#E5E5EA] hover:scale-105 shadow-lg cursor-pointer"
                data-cursor="PROJECTS"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenRaktaan}
                className="px-6 py-4 rounded-full bg-white/[0.05] border border-white/15 text-[#F5F5F7] hover:bg-white hover:text-black font-mono-code font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer blade-shine"
                data-cursor="RAKTAAN"
              >
                <Disc className="w-4 h-4 text-[#A1A1AA]" />
                <span>Raktaan World ↗</span>
              </button>

              <button
                onClick={onOpenMJWorld}
                className="px-6 py-4 rounded-full bg-white/[0.05] border border-white/15 text-[#F5F5F7] hover:bg-white hover:text-black font-mono-code font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer blade-shine"
                data-cursor="MJ WORLD"
              >
                <BookOpen className="w-4 h-4 text-[#A1A1AA]" />
                <span>MJ World ↗</span>
              </button>
            </motion.div>

          </div>

          {/* Right Column: Minimal Katana Anime Artwork Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              style={{
                transform: `perspective(1000px) rotateY(${mouseOffset.x * 6}deg) rotateX(${-mouseOffset.y * 6}deg)`,
              }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="relative w-full max-w-md rounded-3xl p-1 bg-gradient-to-b from-white/20 via-white/5 to-white/10 shadow-2xl group"
              data-cursor="KATANA"
            >
              <div className="relative w-full aspect-[4/5] rounded-[22px] overflow-hidden bg-[#0A0A0C]">
                <img
                  src={heroKatanaMinimal}
                  alt="Laksh Mahajan - Minimal Katana & Strings Anime Aesthetic"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />

                {/* Subtle Apple-style bottom overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080A] via-transparent to-transparent flex flex-col justify-end p-6 pointer-events-none">
                  <div className="space-y-1 bg-[#0F0F12]/80 border border-white/10 p-4 rounded-2xl backdrop-blur-xl">
                    <span className="text-lg font-heading font-bold text-[#F5F5F7] block tracking-wide">
                      Laksh Mahajan
                    </span>
                    <span className="text-xs text-[#86868B] font-mono-code block">
                      B.Tech CSE • RIT Kottayam, Kerala
                    </span>
                    <div className="flex items-center gap-3 pt-2 text-[11px] text-[#A1A1AA] font-mono-code border-t border-white/10">
                      <span>★ 19 Verified Licenses</span>
                      <span>• 7 Spotify Tracks</span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
