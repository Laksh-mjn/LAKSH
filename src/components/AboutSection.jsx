import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, HeartHandshake, Cpu, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const roles = ['AI ENGINEER', 'BUILDER', 'CREATOR', 'LEARNER', 'PROBLEM SOLVER'];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="about" className="py-28 bg-[#08080A]/60 backdrop-blur-md border-y border-white/[0.06] relative overflow-hidden">
      
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-16">
        
        {/* Minimal Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono-code font-medium tracking-widest text-[#86868B] uppercase px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 inline-block">
            BIOGRAPHY & EXECUTIVE OVERVIEW
          </span>
          
          <h2 className="font-heading text-4xl sm:text-6xl font-bold text-[#F5F5F7] tracking-tight">
            WHO AM I?
          </h2>

          <div className="h-14 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={roles[roleIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="font-mono-code text-2xl sm:text-4xl font-extrabold text-white tracking-wider uppercase border-b border-white/40 pb-1"
              >
                [ {roles[roleIndex]} ]
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="text-base sm:text-lg text-[#86868B] leading-relaxed font-light">
            Computer Science undergraduate, AI Engineer, lyricist, composer, music producer (Raktaan), novel writer, and executive youth leader.
          </p>
        </div>

        {/* Minimalist Profile Biography Card */}
        <div className="bg-[#0F0F12]/80 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-xl backdrop-blur-xl space-y-8 hairline-border">
          
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <span className="text-xs font-mono-code font-bold text-[#A1A1AA] tracking-wider uppercase">
              EXECUTIVE PROFILE // LAKSH MAHAJAN
            </span>
            <span className="text-[11px] font-mono-code text-white/70">VERIFIED</span>
          </div>

          <div className="space-y-6 text-base sm:text-lg text-[#D4D4D8] leading-relaxed font-light">
            <p>
              I’m <strong className="text-white font-semibold">Laksh Mahajan</strong>, an aspiring AI Engineer and Computer Science undergraduate with growing expertise in <span className="text-white font-medium">Artificial Intelligence, Machine Learning, Cybersecurity, Data Analytics, and Cloud Computing</span>. I am passionate about building intelligent, practical solutions and exploring emerging technologies.
            </p>

            <p>
              Beyond engineering, I am a creative artist and writer — working as a <strong className="text-white font-semibold">lyricist, composer, and music producer</strong> under the alias <strong className="text-white font-semibold">Raktaan</strong>, alongside writing <strong className="text-white font-semibold">novels in MJ World</strong>. On the executive side, I serve as <strong className="text-white font-semibold">President of Youth On Beat Organisation</strong> and <strong className="text-white font-semibold">District Vice President of Betiya Foundation</strong>, managing teams, organizing public events, and driving community development.
            </p>
          </div>

          {/* Minimal Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
            <div className="p-5 rounded-2xl bg-[#08080A] border border-white/10 text-center">
              <Award className="w-5 h-5 text-white/80 mx-auto mb-2" />
              <span className="text-3xl font-heading font-extrabold text-white block">19</span>
              <span className="text-[11px] font-mono-code text-[#86868B] uppercase">Verified Certifications</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#08080A] border border-white/10 text-center">
              <HeartHandshake className="w-5 h-5 text-white/80 mx-auto mb-2" />
              <span className="text-3xl font-heading font-extrabold text-white block">300+</span>
              <span className="text-[11px] font-mono-code text-[#86868B] uppercase">Artists Mentored</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#08080A] border border-white/10 text-center">
              <Cpu className="w-5 h-5 text-white/80 mx-auto mb-2" />
              <span className="text-3xl font-heading font-extrabold text-white block">7</span>
              <span className="text-[11px] font-mono-code text-[#86868B] uppercase">Spotify Singles (Raktaan)</span>
            </div>
          </div>

        </div>

        {/* Minimal Core Philosophy Slogan */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0F0F12] border border-white/10 text-center space-y-4 blade-shine">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#A1A1AA] text-xs font-mono-code uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPERATING PHILOSOPHY</span>
          </span>

          <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl italic font-normal leading-relaxed text-[#F5F5F7]">
            “I believe my strength lies in bringing together technology, creativity, and leadership — <span className="text-white font-medium underline underline-offset-8 decoration-white/30">building with logic</span>, <span className="text-white font-medium underline underline-offset-8 decoration-white/30">creating with purpose</span>, and <span className="text-white font-medium underline underline-offset-8 decoration-white/30">leading with impact</span>.”
          </blockquote>
        </div>

      </div>
    </section>
  );
}
