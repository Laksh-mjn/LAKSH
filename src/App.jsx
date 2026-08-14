import React, { useState, lazy, Suspense } from 'react';
import CustomCursor from './components/CustomCursor';
import InteractiveStrings from './components/InteractiveStrings';
import GlobalKatanaBackground from './components/GlobalKatanaBackground';
import KatanaScrollEntry from './components/KatanaScrollEntry';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EducationSection from './components/EducationSection';
import LeadershipSection from './components/LeadershipSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { ShieldCheck, ArrowRight, BookOpen, Feather, Disc } from 'lucide-react';

// Code-split subpage bundles to optimize initial load & Core Web Vitals
const CertificationsPage = lazy(() => import('./components/CertificationsPage'));
const MJWorldPage = lazy(() => import('./components/MJWorldPage'));
const RaktaanArtistPage = lazy(() => import('./components/RaktaanArtistPage'));

// Elegant Minimalist Loading Fallback
function SubpageLoadingFallback() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
      <span className="text-xs font-mono-code text-[#86868B] uppercase tracking-widest">
        LOADING EXPERIENCE...
      </span>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState('portfolio');

  const switchPage = (pageName) => {
    setActivePage(pageName);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F5F5F7] relative overflow-x-clip selection:bg-white selection:text-black">
      
      {/* Precision Dynamic Cursor for Desktop */}
      <CustomCursor />

      {/* Persistent Global Katana Animation Engine (Behind Every Page) */}
      <GlobalKatanaBackground activePage={activePage} />

      {/* Interactive Elastic Tension Strings */}
      <InteractiveStrings />

      {/* Minimal Header Glass Navbar */}
      <Navbar activePage={activePage} setActivePage={switchPage} />

      {/* Main Content View */}
      <div className="relative z-10">
        {activePage === 'raktaan' ? (
          <main className="pt-24">
            <Suspense fallback={<SubpageLoadingFallback />}>
              <RaktaanArtistPage onBack={() => switchPage('portfolio')} />
            </Suspense>
          </main>
        ) : activePage === 'certifications' ? (
          <main className="pt-24">
            <Suspense fallback={<SubpageLoadingFallback />}>
              <CertificationsPage onBack={() => switchPage('portfolio')} />
            </Suspense>
          </main>
        ) : activePage === 'mjworld' ? (
          <main className="pt-24">
            <Suspense fallback={<SubpageLoadingFallback />}>
              <MJWorldPage onBack={() => switchPage('portfolio')} />
            </Suspense>
          </main>
        ) : (
          <main>
            {/* Pinned Katana Opening Scroll Entry Experience */}
            <KatanaScrollEntry />

            {/* Main Portfolio Hero Section */}
            <div id="portfolio-start" className="scroll-mt-24">
              <HeroSection
                onOpenRaktaan={() => switchPage('raktaan')}
                onOpenMJWorld={() => switchPage('mjworld')}
                onOpenCertifications={() => switchPage('certifications')}
              />
            </div>

            <AboutSection />
            <EducationSection />

            {/* Certifications Vault Section Banner */}
            <section id="certifications" className="py-20 scroll-mt-24 bg-[#08080A]/60 backdrop-blur-md border-b border-white/[0.06] relative">
              <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
                <div className="p-8 sm:p-12 rounded-3xl bg-[#0F0F12]/80 border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 hairline-border">
                  <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#A1A1AA] text-xs font-mono-code uppercase">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>DEDICATED CERTIFICATIONS VAULT</span>
                    </div>
                    <h3 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7]">
                      Verified Certifications & Licenses (19)
                    </h3>
                    <p className="text-sm sm:text-base text-[#86868B] leading-relaxed font-light">
                      Explore Laksh’s full repository of 19 verified credentials from Anthropic (Claude 101), OpenAI (AI Foundations), IBM (AI Agents, RAG, LLMs, Bob), and Microsoft Learning.
                    </p>
                  </div>

                  <button
                    onClick={() => switchPage('certifications')}
                    className="px-8 py-4 rounded-full bg-white text-black font-mono-code font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-all hover:bg-[#E5E5EA] hover:scale-105 shadow-md shrink-0 cursor-pointer"
                    data-cursor="VAULT"
                  >
                    <span>Explore Vault</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </section>

            <LeadershipSection />
            <SkillsSection />
            <ProjectsSection />
            
            {/* MJ World Section Banner */}
            <section id="mjworld" className="py-20 scroll-mt-24 bg-[#08080A]/60 backdrop-blur-md border-b border-white/[0.06] relative">
              <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
                <div className="p-8 sm:p-12 rounded-3xl bg-[#0F0F12]/80 border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 hairline-border">
                  <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#A1A1AA] text-xs font-mono-code uppercase">
                      <Feather className="w-3.5 h-3.5" />
                      <span>MJ WORLD — LITERARY NOVELS</span>
                    </div>
                    <h3 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7]">
                      Discover MJ World — Novel Universe
                    </h3>
                    <p className="text-sm sm:text-base text-[#86868B] leading-relaxed font-light">
                      Enter Laksh’s dedicated author universe. Explore original fiction novels, psychological thrillers, chapter excerpts, and upload new manuscript editions.
                    </p>
                  </div>

                  <button
                    onClick={() => switchPage('mjworld')}
                    className="px-8 py-4 rounded-full bg-white text-black font-mono-code font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-all hover:bg-[#E5E5EA] hover:scale-105 shadow-md shrink-0 cursor-pointer"
                    data-cursor="NOVELS"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Enter MJ World Novels ↗</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Raktaan World Section Banner */}
            <section id="raktaan" className="py-20 scroll-mt-24 bg-[#08080A]/60 backdrop-blur-md border-b border-white/[0.06] relative">
              <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
                <div className="p-8 sm:p-12 rounded-3xl bg-[#0F0F12]/90 border border-white/10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 hairline-border">
                  <div className="space-y-4 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#A1A1AA] text-xs font-mono-code uppercase">
                      <Disc className="w-3.5 h-3.5" />
                      <span>RAKTAAN WORLD — MUSIC & ARTISTRY</span>
                    </div>
                    <h3 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#F5F5F7]">
                      Discover Raktaan World
                    </h3>
                    <p className="text-sm sm:text-base text-[#86868B] leading-relaxed font-light">
                      Enter Laksh’s dedicated musical universe. Explore 7 released Spotify singles (*Panna*, *Jaan*, *Chuwaa*, *Paarwana*, *Khwaab*, *Motions*, *Midnight*), original Hindi/Punjabi lyrics, and acoustic soundscapes.
                    </p>
                  </div>

                  <button
                    onClick={() => switchPage('raktaan')}
                    className="px-8 py-4 rounded-full bg-white text-black font-mono-code font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-all hover:bg-[#E5E5EA] hover:scale-105 shadow-md shrink-0 cursor-pointer"
                    data-cursor="RAKTAAN"
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

        <Footer activePage={activePage} />
      </div>

    </div>
  );
}
