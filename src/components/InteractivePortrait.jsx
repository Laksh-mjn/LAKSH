import React, { useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Camera, Check } from 'lucide-react';
import lakshPortrait from '../assets/laksh-portrait.jpg';

export default function InteractivePortrait() {
  const cardRef = useRef(null);
  // Default to Laksh's uploaded portrait photo
  const [portraitPhoto, setPortraitPhoto] = useState(lakshPortrait);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse normalized spring physics
  const mouseX = useSpring(0, { stiffness: 180, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 180, damping: 20 });

  // Light beam spring coordinates
  const lightX = useSpring(50, { stiffness: 220, damping: 22 });
  const lightY = useSpring(50, { stiffness: 220, damping: 22 });

  // Subtle 3D Tilt transforms (max ±6deg for ultra-sleek realistic motion)
  const rotateX = useTransform(mouseY, [-1, 1], [6, -6]);
  const rotateY = useTransform(mouseX, [-1, 1], [-8, 8]);

  // Subtle shadow shift
  const shadowX = useTransform(mouseX, [-1, 1], [15, -15]);
  const shadowY = useTransform(mouseY, [-1, 1], [15, -15]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    mouseX.set((x - 0.5) * 2);
    mouseY.set((y - 0.5) * 2);

    lightX.set(x * 100);
    lightY.set(y * 100);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    lightX.set(50);
    lightY.set(50);
    setIsHovered(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPortraitPhoto(url);
    }
  };

  return (
    <div className="relative w-full max-w-[540px] mx-auto flex items-center justify-between">
      
      {/* Central Portrait Container with Circular Halo Backdrop */}
      <div className="relative w-full flex items-center justify-center">
        
        {/* Soft Background Circular Glow */}
        <div className="absolute w-[420px] h-[420px] sm:w-[480px] sm:h-[480px] rounded-full portrait-halo pointer-events-none -z-10" />

        {/* 3D Motion Frame */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          className="relative w-full aspect-[4/5] max-w-[420px] rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300 shadow-2xl border border-black/10 dark:border-white/10"
        >
          {/* Dynamic Light Overlay */}
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-300"
            style={{
              background: useTransform(
                [lightX, lightY],
                ([x, y]) =>
                  `radial-gradient(circle 280px at ${x}% ${y}%, rgba(255, 255, 255, 0.18), transparent 75%)`
              ),
              opacity: isHovered ? 1 : 0.15,
            }}
          />

          {/* Change Photo Button Overlay */}
          <div className="absolute top-4 right-4 z-40">
            <label
              htmlFor="portrait-file-input"
              className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md text-[11px] font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-lg border border-white/20 hover:scale-105"
              title="Change Portrait Photo"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Change Photo</span>
              <input
                id="portrait-file-input"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Portrait Image Display */}
          <div className="relative w-full h-full">
            <img
              src={portraitPhoto}
              alt="Laksh Mahajan"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        </motion.div>
      </div>

      {/* Right Side Metadata Text (As in Reference Screenshot) */}
      <div className="hidden xl:flex flex-col gap-8 text-right min-w-[140px] pl-6">
        <div>
          <span className="text-[10px] font-mono font-semibold text-[#888888] dark:text-slate-400 uppercase tracking-widest block mb-1">
            BASED IN
          </span>
          <p className="text-xs font-semibold text-[#111111] dark:text-slate-100 leading-snug">
            Udhampur, J&K
            <br />
            INDIA
          </p>
        </div>

        <div>
          <span className="text-[10px] font-mono font-semibold text-[#888888] dark:text-slate-400 uppercase tracking-widest block mb-1">
            AVAILABLE FOR
          </span>
          <p className="text-xs font-semibold text-[#111111] dark:text-slate-100 leading-snug">
            Opportunities
          </p>
        </div>
      </div>
    </div>
  );
}
