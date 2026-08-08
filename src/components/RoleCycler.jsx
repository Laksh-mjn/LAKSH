import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const roles = [
  { title: 'Aspiring AI Engineer', tag: 'Tech & Research', color: 'from-purple-400 to-indigo-400' },
  { title: 'Computer Science Student', tag: 'B.Tech (3rd Year)', color: 'from-blue-400 to-cyan-400' },
  { title: 'President — Youth On Beat', tag: 'Leadership', color: 'from-amber-400 to-orange-400' },
  { title: 'District Vice President — Betiya Foundation', tag: 'Social Impact', color: 'from-pink-400 to-rose-400' },
  { title: 'Event Organizer', tag: 'Management', color: 'from-emerald-400 to-teal-400' },
  { title: 'Music Producer', tag: 'Creative Studio', color: 'from-violet-400 to-purple-400' },
  { title: 'Artist — Raktaan', tag: 'Original Music', color: 'from-red-400 to-pink-500' },
];

export default function RoleCycler() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const current = roles[index];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 my-4 min-h-[56px]">
      <span className="text-sm font-mono tracking-wider text-slate-400 uppercase flex items-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        Current Focus:
      </span>

      <div className="relative overflow-hidden h-9 flex items-center min-w-[280px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ y: 24, opacity: 0, filter: 'blur(8px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -24, opacity: 0, filter: 'blur(8px)' }}
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-3"
          >
            <span
              className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${current.color} bg-clip-text text-transparent`}
            >
              {current.title}
            </span>

            <span className="text-[11px] font-mono font-medium uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
              {current.tag}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
