import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#EFECE6] border-y border-[#E5E2DC]">
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#2B4C7E] uppercase block mb-3">
            BIOGRAPHY & OVERVIEW
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-[#141414] tracking-tight mb-4">
            About Me
          </h2>
          <p className="text-base sm:text-lg text-[#5C5C5C] leading-relaxed font-normal">
            Computer Science undergraduate, AI Engineer, lyricist, composer, music producer (Raktaan), novel writer, and executive youth leader.
          </p>
        </div>

        {/* Profile Biography Card */}
        <div className="bg-[#FFFFFF] p-8 sm:p-12 rounded-3xl border border-[#E5E2DC] shadow-sm mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2B4C7E]/10 border border-[#2B4C7E]/20 text-[#2B4C7E] text-xs font-mono-code font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>EXECUTIVE PROFILE</span>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-[#333333] leading-relaxed font-normal">
            <p>
              I’m <strong className="text-[#141414] font-semibold">Laksh Mahajan</strong>, an aspiring AI Engineer and Computer Science undergraduate with growing expertise in <span className="text-[#2B4C7E] font-semibold">Artificial Intelligence, Machine Learning, Cybersecurity, Data Analytics, and Cloud Computing</span>. I am passionate about building intelligent, practical solutions and exploring emerging technologies.
            </p>

            <p>
              Beyond engineering, I am a creative artist and writer — working as a <strong className="text-[#141414]">lyricist, composer, and music producer</strong> under the alias <strong className="text-[#141414]">Raktaan</strong>, alongside writing <strong className="text-[#141414]">novels</strong>. On the executive side, I serve as <strong className="text-[#141414]">President of Youth On Beat Organisation</strong> and <strong className="text-[#141414]">District Vice President of Betiya Foundation</strong>, managing teams, organizing public events, and driving community development.
            </p>
          </div>
        </div>

        {/* Core Slogan Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#141414] via-[#1A1918] to-[#0F0E0D] text-[#FFFFFF] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2B4C7E]/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF]/10 border border-[#FFFFFF]/20 text-[#D6C6A5] text-xs font-mono-code font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE SLOGAN & PHILOSOPHY</span>
            </div>
            
            <blockquote className="font-heading text-2xl sm:text-3xl lg:text-4xl italic font-medium leading-relaxed text-[#F8F7F4]">
              “I believe my strength lies in bringing together technology, creativity, and leadership — <span className="text-[#D6C6A5] font-semibold">building with logic</span>, <span className="text-[#D6C6A5] font-semibold">creating with purpose</span>, and <span className="text-[#D6C6A5] font-semibold">leading with impact</span>.”
            </blockquote>
          </div>
        </div>

      </div>
    </section>
  );
}
