import React from 'react';

export default function Footer({ activePage }) {
  const isRaktaan = activePage === 'raktaan';

  return (
    <footer
      className={`py-10 transition-colors duration-500 text-center ${
        isRaktaan
          ? 'bg-[#0F0E0D] border-t border-[#D6C6A5]/20 text-[#F5F5F5]'
          : 'bg-[#F8F7F4] border-t border-[#E5E2DC] text-[#5C5C5C]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          © {new Date().getFullYear()}{' '}
          <strong className={`font-semibold ${isRaktaan ? 'text-[#D6C6A5]' : 'text-[#141414]'}`}>
            Laksh Mahajan
          </strong>{' '}
          (Raktaan). All rights reserved.
        </div>

        <div className={`flex items-center gap-4 font-mono-code text-[11px] ${isRaktaan ? 'text-[#A7A7A7]' : 'text-[#5C5C5C]'}`}>
          <span>Aspiring AI Engineer</span>
          <span>•</span>
          <span>RIT Kottayam</span>
          <span>•</span>
          <span className={isRaktaan ? 'text-[#D6C6A5] font-bold' : ''}>Raktaan</span>
        </div>
      </div>
    </footer>
  );
}
