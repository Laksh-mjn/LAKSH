import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles } from 'lucide-react';

export default function Phase1CompletionBanner() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 pointer-events-auto">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.8 }}
        className="bg-[#111111] dark:bg-white text-white dark:text-[#111111] rounded-full px-6 py-3.5 shadow-2xl flex items-center justify-between gap-4 border border-black/10 dark:border-white/20"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center text-emerald-400 dark:text-emerald-600 shrink-0">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wide">Phase 1 Complete</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/15 dark:bg-black/15">
                Ready for Review
              </span>
            </div>
            <p className="text-[11px] text-slate-300 dark:text-slate-600 font-normal">
              Editorial typography, header, 5-column feature bar, & image upload ready.
            </p>
          </div>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/15 dark:bg-black/10 hover:bg-white/25 dark:hover:bg-black/20 transition-colors shrink-0"
        >
          Top
        </button>
      </motion.div>
    </div>
  );
}
