import React from 'react';
import { Disc, Music, Mic2, Radio, ExternalLink } from 'lucide-react';

export default function MusicSection() {
  return (
    <section id="music" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-purple-600 dark:text-purple-400 uppercase block mb-2">
            Creative Artistry
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white eyecare:text-[#2C221E] tracking-tight">
            Music Production & Lyricism as <span className="text-purple-600 dark:text-purple-400">Raktaan</span>
          </h2>
        </div>

        {/* Music Overview Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/10 via-slate-900/5 to-slate-900/10 dark:from-purple-950/40 dark:via-slate-900 dark:to-slate-900 eyecare:from-[#ECE3D7] eyecare:to-[#EBE3D8] border border-purple-200 dark:border-purple-900/50 eyecare:border-[#D6C7B7] shadow-sm max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-xs font-mono font-semibold mb-4">
                <Disc className="w-3.5 h-3.5" />
                Artist Name: Raktaan
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Original Composition & Sound Production
              </h3>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                Under the artist persona <strong className="text-slate-900 dark:text-white font-semibold">Raktaan</strong>, I write original lyrics, compose melodies, and produce audio tracks blending emotive soundscapes, modern beats, and storytelling.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
                >
                  <Disc className="w-4 h-4" />
                  <span>Listen on Spotify</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-xl bg-white/80 dark:bg-slate-800/80 eyecare:bg-[#EBE3D8] border border-purple-200 dark:border-purple-800/60 text-center">
              <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center mb-3 shadow-md">
                <Music className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">Raktaan</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">Lyricist • Composer • Producer</p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
