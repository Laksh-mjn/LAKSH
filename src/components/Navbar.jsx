import React, { useState } from 'react';
import { ArrowLeft, Feather, Disc, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledPastIntro, setScrolledPastIntro] = useState(false);

  const isRaktaan = activePage === 'raktaan';
  const isCertifications = activePage === 'certifications';
  const isMJWorld = activePage === 'mjworld';

  React.useEffect(() => {
    const checkScroll = () => {
      if (isRaktaan || isCertifications || isMJWorld) {
        setScrolledPastIntro(true);
        return;
      }
      const portfolioStart = document.querySelector('#portfolio-start');
      if (portfolioStart) {
        setScrolledPastIntro(portfolioStart.getBoundingClientRect().top <= 80);
      } else {
        setScrolledPastIntro(window.scrollY > window.innerHeight * 4.5);
      }
    };
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [isRaktaan, isCertifications, isMJWorld]);

  const standardNavLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
  ];

  const handleNavClick = (linkName, href, e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);

    if (linkName === 'Certifications') {
      setActivePage('certifications');
    } else {
      const scrollToTarget = () => {
        const el = document.querySelector(href);
        if (el) {
          const navHeight = 90;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      };

      if (isRaktaan || isCertifications || isMJWorld) {
        setActivePage('portfolio');
        setTimeout(scrollToTarget, 150);
      } else {
        scrollToTarget();
      }
    }
  };

  const showNav = scrolledPastIntro || isRaktaan || isCertifications || isMJWorld;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 transition-all duration-700 pointer-events-none ${
      showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        
        {/* Brand Logo */}
        <div
          onClick={() => {
            setActivePage('portfolio');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 glass-pill px-4 py-2 rounded-full shadow-lg cursor-pointer group hover:border-white/40 transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="font-heading text-xs sm:text-sm font-bold tracking-tight text-[#F5F5F7]">
            LAKSH MAHAJAN
          </span>
        </div>

        {/* Desktop Minimal Nav Pills */}
        <nav className="hidden lg:flex items-center gap-1 glass-panel px-3 py-1.5 rounded-full shadow-xl">
          {standardNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(link.name, link.href, e)}
              className="px-3.5 py-1 rounded-full text-xs font-mono-code font-medium text-[#86868B] hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
            >
              {link.name}
            </a>
          ))}

          <div className="w-px h-3.5 bg-white/10 mx-1" />

          {/* MJ World */}
          <button
            onClick={() => setActivePage('mjworld')}
            className={`px-3.5 py-1 rounded-full text-xs font-mono-code font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer ${
              isMJWorld
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.08]'
            }`}
            data-cursor="MJ WORLD"
          >
            <Feather className="w-3 h-3" />
            <span>MJ World</span>
          </button>

          {/* Raktaan World */}
          <button
            onClick={() => setActivePage('raktaan')}
            className={`px-3.5 py-1 rounded-full text-xs font-mono-code font-medium inline-flex items-center gap-1.5 transition-all cursor-pointer ${
              isRaktaan
                ? 'bg-white text-black font-bold shadow-md'
                : 'text-[#A1A1AA] hover:text-white hover:bg-white/[0.08]'
            }`}
            data-cursor="RAKTAAN"
          >
            <Disc className="w-3 h-3" />
            <span>Raktaan</span>
          </button>
        </nav>

        {/* Action Controls & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          {(isRaktaan || isCertifications || isMJWorld) && (
            <button
              onClick={() => setActivePage('portfolio')}
              className="px-4 py-2 rounded-full text-xs font-mono-code font-bold bg-white text-black hover:bg-[#E5E5EA] transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Portfolio</span>
            </button>
          )}

          <a
            href="#contact"
            onClick={(e) => handleNavClick('Contact', '#contact', e)}
            className="hidden sm:flex px-5 py-2 rounded-full text-xs font-mono-code font-bold border border-white/20 text-[#F5F5F7] hover:bg-white hover:text-black transition-all glass-pill"
          >
            Contact
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full glass-card text-white active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer with Glassmorphism */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden pointer-events-auto fixed inset-x-4 top-20 z-50 glass-panel rounded-3xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono-code text-[#86868B]">
              <span>NAVIGATION</span>
              <span>LAKSH MAHAJAN</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {standardNavLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(link.name, link.href, e)}
                  className="p-3.5 rounded-xl glass-pill text-xs font-mono-code text-[#D4D4D8] hover:text-white active:bg-white active:text-black transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick('Contact', '#contact', e)}
                className="p-3.5 rounded-xl glass-pill text-xs font-mono-code text-white font-bold bg-white/10"
              >
                Contact ↗
              </a>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setActivePage('mjworld');
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-xl glass-card text-[#F5F5F7] font-mono-code font-medium text-xs flex items-center justify-center gap-2 active:scale-95"
              >
                <Feather className="w-3.5 h-3.5" />
                <span>MJ World</span>
              </button>

              <button
                onClick={() => {
                  setActivePage('raktaan');
                  setMobileMenuOpen(false);
                }}
                className="p-3 rounded-xl glass-card text-[#F5F5F7] font-mono-code font-medium text-xs flex items-center justify-center gap-2 active:scale-95"
              >
                <Disc className="w-3.5 h-3.5" />
                <span>Raktaan</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
