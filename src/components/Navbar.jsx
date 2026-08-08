import React from 'react';
import { ArrowLeft, Feather, Disc } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const isRaktaan = activePage === 'raktaan';
  const isCertifications = activePage === 'certifications';
  const isMJWorld = activePage === 'mjworld';

  const standardNavLinks = [
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 backdrop-blur-md ${
        isRaktaan || isMJWorld
          ? 'bg-[#0F0E0D]/90 border-b border-[#D6C6A5]/20 text-[#F5F5F5]'
          : 'bg-[#F8F7F4]/90 border-b border-[#E5E2DC] text-[#141414]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
        
        {/* Brand Logo - Clean Laksh Mahajan */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('portfolio')}>
          <span className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
            Laksh Mahajan
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-4 text-xs sm:text-sm font-medium">
          {/* Standard Navigation Links */}
          {standardNavLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                if (link.name === 'Certifications') {
                  e.preventDefault();
                  setActivePage('certifications');
                } else if (isRaktaan || isCertifications || isMJWorld) {
                  setActivePage('portfolio');
                }
              }}
              className={`transition-colors cursor-pointer px-2 py-1 ${
                isRaktaan || isMJWorld
                  ? 'text-[#A7A7A7] hover:text-[#D6C6A5]'
                  : 'text-[#5C5C5C] hover:text-[#141414]'
              }`}
            >
              {link.name}
            </a>
          ))}

          {/* Stylish Distinctive MJ World Button */}
          <button
            onClick={() => setActivePage('mjworld')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code font-bold inline-flex items-center gap-1.5 transition-all shadow-xs border cursor-pointer hover:scale-105 ${
              isMJWorld
                ? 'bg-[#D6C6A5] text-[#111111] border-[#D6C6A5] shadow-[0_0_15px_rgba(214,198,165,0.4)]'
                : 'bg-[#1C1A17] text-[#D6C6A5] border-[#D6C6A5]/40 hover:border-[#D6C6A5] hover:bg-[#282420]'
            }`}
          >
            <Feather className="w-3.5 h-3.5 text-[#D6C6A5]" />
            <span>MJ World</span>
          </button>

          {/* Stylish Distinctive Raktaan World Button */}
          <button
            onClick={() => setActivePage('raktaan')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code font-bold inline-flex items-center gap-1.5 transition-all shadow-xs border cursor-pointer hover:scale-105 ${
              isRaktaan
                ? 'bg-[#D6C6A5] text-[#111111] border-[#D6C6A5] shadow-[0_0_15px_rgba(214,198,165,0.4)]'
                : 'bg-[#1A1816] text-[#F5F5F5] border-[#D6C6A5]/40 hover:border-[#D6C6A5] hover:bg-[#25221F]'
            }`}
          >
            <Disc className="w-3.5 h-3.5 text-[#D6C6A5]" />
            <span>Raktaan World</span>
          </button>
        </div>

        {/* CTA Action Buttons */}
        <div className="flex items-center gap-3">
          {isRaktaan || isCertifications || isMJWorld ? (
            <button
              onClick={() => setActivePage('portfolio')}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-mono-code flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
                isRaktaan || isMJWorld
                  ? 'bg-[#D6C6A5] text-[#111111] hover:bg-[#c5b391]'
                  : 'bg-[#2B4C7E] text-white hover:bg-[#1E3A8A]'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Switch to Portfolio</span>
            </button>
          ) : null}

          {/* Single Contact Action Button */}
          <a
            href="#contact"
            onClick={(e) => {
              if (isRaktaan || isCertifications || isMJWorld) {
                e.preventDefault();
                setActivePage('portfolio');
                setTimeout(() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className={`px-5 py-2 rounded-full text-xs font-semibold border transition-all ${
              isRaktaan || isMJWorld
                ? 'border-[#D6C6A5]/40 text-[#D6C6A5] hover:bg-[#D6C6A5]/10'
                : 'border-[#141414] text-[#141414] hover:bg-[#141414] hover:text-[#F8F7F4]'
            }`}
          >
            Contact
          </a>
        </div>

      </div>
    </nav>
  );
}
