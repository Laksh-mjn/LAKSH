import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import CertificationsPage from './components/CertificationsPage';
import MJWorldPage from './components/MJWorldPage';
import LeadershipSection from './components/LeadershipSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import RaktaanArtistPage from './components/RaktaanArtistPage';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { ShieldCheck, ArrowRight, BookOpen, Feather, Disc } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState('portfolio');

  const switchPage = (pageName) => {
    setActivePage(pageName);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        activePage === 'raktaan' || activePage === 'mjworld'
          ? 'raktaan-world bg-[#0F0E0D]'
          : 'bg-[#F8F7F4] text-[#141414]'
      }`}
    >
      {/* Header Navbar */}
      <Navbar activePage={activePage} setActivePage={switchPage} />

      {/* Dynamic Dedicated View Rendering */}
      {activePage === 'raktaan' ? (
        <main>
          <RaktaanArtistPage onBack={() => switchPage('portfolio')} />
        </main>
      ) : activePage === 'certifications' ? (
        <main>
          <CertificationsPage onBack={() => switchPage('portfolio')} />
        </main>
      ) : activePage === 'mjworld' ? (
        <main>
          <MJWorldPage onBack={() => switchPage('portfolio')} />
        </main>
      ) : (
        <main>
          <HeroSection onOpenRaktaan={() => switchPage('raktaan')} />
          <AboutSection />
          <EducationSection />

          {/* Certifications Vault Section Banner */}
          <section id="certifications" className="py-20 bg-[#F8F7F4] border-b border-[#E5E2DC]">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#141414] via-[#1A1918] to-[#0F0E0D] text-[#F8F7F4] border border-[#2B4C7E]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF]/10 border border-[#FFFFFF]/20 text-[#D6C6A5] text-xs font-mono-code font-bold uppercase">
                    <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                    <span>DEDICATED CERTIFICATIONS VAULT</span>
                  </div>
                  <h3 className="font-heading text-3xl sm:text-5xl font-medium tracking-tight text-[#FFFFFF]">
                    Verified Certifications & Licenses (19)
                  </h3>
                  <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed font-light">
                    Explore Laksh’s full repository of 19 verified credentials from Anthropic (Claude 101), OpenAI (AI Foundations), IBM (AI Agents, RAG, LLMs, Bob), and Microsoft Learning.
                  </p>
                </div>

                <button
                  onClick={() => switchPage('certifications')}
                  className="px-8 py-4 rounded-full bg-[#2B4C7E] hover:bg-[#1E3A8A] text-white text-xs font-mono-code font-bold tracking-wider uppercase flex items-center gap-3 transition-all shadow-lg hover:scale-105 shrink-0 cursor-pointer"
                >
                  <span>Explore Certifications Vault</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

          <LeadershipSection />
          <SkillsSection />
          <ProjectsSection />
          
          {/* MJ World Section Banner */}
          <section id="mjworld" className="py-20 bg-[#F8F7F4] border-b border-[#E5E2DC]">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1E1B18] via-[#141210] to-[#0F0E0D] text-[#F5F5F5] border border-[#D6C6A5]/35 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6C6A5]/10 border border-[#D6C6A5]/30 text-[#D6C6A5] text-xs font-mono-code font-bold uppercase">
                    <Feather className="w-4 h-4" />
                    <span>MJ WORLD — LITERARY NOVELS</span>
                  </div>
                  <h3 className="font-heading text-3xl sm:text-5xl font-medium tracking-tight text-[#F5F5F5]">
                    Discover MJ World — Novel Universe
                  </h3>
                  <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed font-light">
                    Enter Laksh’s dedicated author universe. Explore original fiction novels, psychological thrillers, chapter excerpts, and upload new manuscript editions.
                  </p>
                </div>

                <button
                  onClick={() => switchPage('mjworld')}
                  className="px-8 py-4 rounded-full bg-[#D6C6A5] hover:bg-[#c5b391] text-[#111111] text-xs font-mono-code font-bold tracking-wider uppercase flex items-center gap-3 transition-all shadow-xl hover:scale-105 shrink-0 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Enter MJ World Novels ↗</span>
                </button>
              </div>
            </div>
          </section>

          {/* Raktaan World Section Banner */}
          <section id="raktaan" className="py-20 bg-[#F8F7F4] border-b border-[#E5E2DC]">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1C1A17] via-[#141312] to-[#0F0E0D] text-[#F5F5F5] border border-[#D6C6A5]/35 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6C6A5]/10 border border-[#D6C6A5]/30 text-[#D6C6A5] text-xs font-mono-code font-bold uppercase">
                    <Disc className="w-4 h-4" />
                    <span>RAKTAAN WORLD — MUSIC & ARTISTRY</span>
                  </div>
                  <h3 className="font-heading text-3xl sm:text-5xl font-medium tracking-tight text-[#F5F5F5]">
                    Discover Raktaan World
                  </h3>
                  <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed font-light">
                    Enter Laksh’s dedicated musical universe. Explore 7 released Spotify singles (*Panna*, *Jaan*, *Chuwaa*, *Paarwana*, *Khwaab*, *Motions*, *Midnight*), original Hindi/Punjabi lyrics, and acoustic soundscapes.
                  </p>
                </div>

                <button
                  onClick={() => switchPage('raktaan')}
                  className="px-8 py-4 rounded-full bg-[#D6C6A5] hover:bg-[#c5b391] text-[#111111] text-xs font-mono-code font-bold tracking-wider uppercase flex items-center gap-3 transition-all shadow-xl hover:scale-105 shrink-0 cursor-pointer"
                >
                  <Disc className="w-4 h-4" />
                  <span>Enter Raktaan World ↗</span>
                </button>
              </div>
            </div>
          </section>

          <ContactSection onOpenRaktaan={() => switchPage('raktaan')} />
        </main>
      )}

      {/* Footer */}
      <Footer activePage={activePage} />
    </div>
  );
}
