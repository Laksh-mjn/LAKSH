import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ArrowLeft, Feather, Plus } from 'lucide-react';
import { sanitizeString } from '../utils/security';

const initialNovels = [
  {
    id: 'novel-1',
    title: 'Shadows of Tomorrow',
    subtitle: 'A Cyberpunk Psychological Thriller',
    genre: 'Sci-Fi Thriller',
    year: '2026',
    status: 'Featured Novel',
    pages: '320 Pages',
    coverGradient: 'from-[#1A1C2E] via-[#0F101D] to-[#080912]',
    accentColor: 'border-l-4 border-l-[#3B82F6]',
    badgeStyle: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30',
    synopsis:
      'In a high-tech metropolis driven by cognitive AI implants, a rogue engineer uncovers a dark neural network manipulation scheme that threatens human free will.',
    excerpt:
      'The neon rain fell silently onto the obsidian pavement of Sector 7. Maya adjusted her optical lens, watching the glowing code streams drift across the midnight skyline. She knew the secret was buried deep inside the central core — and there was no turning back.',
    highlights: ['Psychological Suspense', 'AI Cyberpunk Lore', 'Multi-perspective Narrative'],
  },
  {
    id: 'novel-2',
    title: 'Echoes of the Unspoken',
    subtitle: 'Contemporary Drama & Emotional Journey',
    genre: 'Contemporary Drama',
    year: '2025',
    status: 'Published Edition',
    pages: '280 Pages',
    coverGradient: 'from-[#2E1A2C] via-[#1D0F1C] to-[#120811]',
    accentColor: 'border-l-4 border-l-[#EC4899]',
    badgeStyle: 'bg-[#EC4899]/10 text-[#EC4899] border-[#EC4899]/30',
    synopsis:
      'A poignant story exploring human relationships, unspoken letters, lost artistic dreams, and the quiet beauty of second chances in small-town India.',
    excerpt:
      'Letters sat tucked beneath the mahogany desk for seven years. Words left unsaid had grown heavier than silence itself. When Kabir returned to the hill town, every cobblestone path whispered memories of the music they used to compose together.',
    highlights: ['Emotional Depth', 'Character Driven', 'Poetic Prose Style'],
  },
  {
    id: 'novel-3',
    title: 'The Silent Horizon',
    subtitle: 'Philosophical Mystery & Mystery Fiction',
    genre: 'Philosophical Mystery',
    year: '2026',
    status: 'New Release',
    pages: '350 Pages',
    coverGradient: 'from-[#1E2E20] via-[#101D11] to-[#081009]',
    accentColor: 'border-l-4 border-l-[#10B981]',
    badgeStyle: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30',
    synopsis:
      'Set against remote coastal cliffs, an enigmatic writer discovers an uncataloged manuscript that predicts real-world occurrences before they happen.',
    excerpt:
      'The lighthouse beacon swept across the dark sea once every twelve seconds. Between those pulses of light, the manuscript revealed sentences that matched his exact thoughts at that very moment. It was impossible. Yet there it was, written in black ink.',
    highlights: ['Atmospheric Setting', 'Mind-Bending Plot', 'Intense Cliffhangers'],
  },
];

export default function MJWorldPage({ onBack }) {
  const [novels, setNovels] = useState(initialNovels);
  const [selectedNovel, setSelectedNovel] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // New Novel Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newGenre, setNewGenre] = useState('Fiction');
  const [newPages, setNewPages] = useState('250 Pages');
  const [newSynopsis, setNewSynopsis] = useState('');
  const [newExcerpt, setNewExcerpt] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const handleUploadNovel = (e) => {
    e.preventDefault();
    const cleanTitle = sanitizeString(newTitle, 80);
    const cleanSubtitle = sanitizeString(newSubtitle, 100);
    const cleanGenre = sanitizeString(newGenre, 40);
    const cleanPages = sanitizeString(newPages, 30);
    const cleanSynopsis = sanitizeString(newSynopsis, 800);
    const cleanExcerpt = sanitizeString(newExcerpt, 2000);

    if (!cleanTitle || !cleanSynopsis) return;

    const newBook = {
      id: `novel-${Date.now()}`,
      title: cleanTitle,
      subtitle: cleanSubtitle || 'Original Novel by MJ',
      genre: cleanGenre || 'Fiction',
      year: new Date().getFullYear().toString(),
      status: 'User Added Novel',
      pages: cleanPages || '250 Pages',
      coverGradient: 'from-[#2A2418] via-[#1B170F] to-[#0F0D08]',
      accentColor: 'border-l-4 border-l-[#D6C6A5]',
      badgeStyle: 'bg-[#D6C6A5]/10 text-[#D6C6A5] border-[#D6C6A5]/30',
      synopsis: cleanSynopsis,
      excerpt: cleanExcerpt || cleanSynopsis,
      highlights: ['Original Work', 'MJ World Novel', 'Creative Storytelling'],
    };

    setNovels([newBook, ...novels]);
    setShowUploadModal(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewSynopsis('');
    setNewExcerpt('');
  };

  return (
    <div className="min-h-screen bg-[#0F0E0D] text-[#F5F5F5] font-sans pt-24 pb-28">
      
      {/* Intro Overlay Transition */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#0F0E0D] text-[#F5F5F5] flex flex-col items-center justify-center p-6 text-center select-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <span className="text-xs font-mono-code font-bold tracking-[0.25em] text-[#D6C6A5] uppercase block">
                MJ WORLD — LITERARY UNIVERSE
              </span>
              <h1 className="font-heading text-5xl sm:text-7xl font-medium tracking-tight text-[#F5F5F5]">
                Welcome to <span className="italic text-[#D6C6A5]">MJ World Novels</span>
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Navigation Back Link */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono-code text-[#A7A7A7] hover:text-[#D6C6A5] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Main Portfolio</span>
          </button>
        </div>

        {/* MJ World Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1E1B18] via-[#141210] to-[#0F0E0D] border border-[#D6C6A5]/30 p-8 sm:p-14 mb-16 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D6C6A5]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D6C6A5]/10 border border-[#D6C6A5]/30 text-[#D6C6A5] text-xs font-mono-code font-semibold tracking-wide uppercase">
                <Feather className="w-4 h-4" />
                <span>OFFICIAL NOVELIST & AUTHOR UNIVERSE</span>
              </div>

              <h1 className="font-heading text-6xl sm:text-8xl font-medium tracking-tight text-[#F5F5F5] leading-none">
                MJ World
              </h1>

              <p className="text-2xl sm:text-3xl font-medium text-[#D6C6A5] tracking-wide font-heading italic">
                Novelist • Storyteller • Fiction Writer
              </p>

              <p className="text-base sm:text-lg text-[#A7A7A7] leading-relaxed max-w-2xl font-light">
                The dedicated literary space of Laksh Mahajan (MJ). Explore original novels, psychological mystery manuscripts, contemporary drama, and atmospheric fiction works.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-7 py-3.5 rounded-full bg-[#D6C6A5] hover:bg-[#c5b391] text-[#111111] text-xs font-bold font-mono-code tracking-wide flex items-center gap-2 transition-all shadow-xl hover:scale-105 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Upload / Add New Novel</span>
                </button>

                <button
                  onClick={onBack}
                  className="px-7 py-3.5 rounded-full bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-[#F5F5F5] border border-[#FFFFFF]/20 text-xs font-mono-code font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Switch to Portfolio</span>
                </button>
              </div>
            </div>

            {/* Right Decorative Literary Badge */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="p-7 rounded-2xl bg-[#181614] border border-[#D6C6A5]/30 shadow-2xl space-y-4 w-full max-w-xs text-xs font-mono-code text-center">
                <div className="w-14 h-14 rounded-full bg-[#D6C6A5]/20 border border-[#D6C6A5]/40 flex items-center justify-center text-[#D6C6A5] mx-auto">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-[#F5F5F5]">MJ Literary Vault</h3>
                <p className="text-[#A7A7A7] leading-relaxed">
                  Published works, work-in-progress manuscripts, and exclusive novel chapters.
                </p>
                <div className="pt-2 border-t border-[#D6C6A5]/20 text-[#D6C6A5] font-bold">
                  {novels.length} Active Novels & Manuscripts
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Section Title */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="text-xs font-mono-code font-bold tracking-widest text-[#D6C6A5] uppercase block mb-1">
              THE NOVEL COLLECTION
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium text-[#F5F5F5]">
              Featured Novels & Books
            </h2>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D6C6A5]/10 border border-[#D6C6A5]/30 text-[#D6C6A5] text-xs font-mono-code font-bold hover:bg-[#D6C6A5] hover:text-[#111111] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Novel</span>
          </button>
        </div>

        {/* Novels Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {novels.map((novel) => (
            <motion.div
              key={novel.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-3xl overflow-hidden bg-[#161413] border border-[#D6C6A5]/20 shadow-xl flex flex-col justify-between group hover:border-[#D6C6A5]/50 transition-all ${novel.accentColor}`}
            >
              <div>
                {/* Book Cover Simulated Header */}
                <div className={`p-8 bg-gradient-to-br ${novel.coverGradient} border-b border-[#FFFFFF]/10 relative min-h-[200px] flex flex-col justify-between`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono-code font-bold px-3 py-1 rounded-full border ${novel.badgeStyle}`}>
                      {novel.genre}
                    </span>
                    <span className="text-xs font-mono-code text-[#A7A7A7]">
                      {novel.pages}
                    </span>
                  </div>

                  <div className="mt-6">
                    <span className="text-xs font-mono-code text-[#D6C6A5] uppercase tracking-widest block mb-1">
                      NOVEL BY MJ
                    </span>
                    <h3 className="font-heading text-3xl font-bold text-[#F5F5F5] group-hover:text-[#D6C6A5] transition-colors">
                      {novel.title}
                    </h3>
                    <p className="text-xs font-mono-code text-[#A7A7A7] mt-1">
                      {novel.subtitle}
                    </p>
                  </div>
                </div>

                {/* Synopsis Body */}
                <div className="p-7 space-y-4">
                  <p className="text-sm text-[#A7A7A7] leading-relaxed font-light line-clamp-3">
                    {novel.synopsis}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {novel.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-2.5 py-1 rounded-md bg-[#22201D] border border-[#33302B] text-[11px] font-mono-code text-[#D6C6A5]"
                      >
                        • {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-[#D6C6A5]/10 gap-3">
                <span className="text-xs font-mono-code text-[#A7A7A7]">
                  Release: <strong className="text-[#F5F5F5]">{novel.year}</strong>
                </span>

                <button
                  onClick={() => setSelectedNovel(novel)}
                  className="px-5 py-2.5 rounded-full bg-[#D6C6A5] hover:bg-[#c5b391] text-[#111111] text-xs font-mono-code font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer hover:scale-105"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Read Chapter Sample</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chapter Preview Reader Modal */}
        <AnimatePresence>
          {selectedNovel && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                className="bg-[#181614] border border-[#D6C6A5]/30 rounded-3xl max-w-3xl w-full p-8 shadow-2xl relative overflow-hidden text-[#F5F5F5]"
              >
                <button
                  onClick={() => setSelectedNovel(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-[#22201D] border border-[#33302B] text-[#F5F5F5] hover:bg-[#D6C6A5] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  ✕
                </button>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono-code font-bold px-3 py-1 rounded-full border ${selectedNovel.badgeStyle}`}>
                      {selectedNovel.genre}
                    </span>
                    <span className="text-xs font-mono-code text-[#A7A7A7]">
                      {selectedNovel.pages} • Release {selectedNovel.year}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-heading text-3xl sm:text-4xl font-bold text-[#F5F5F5]">
                      {selectedNovel.title}
                    </h3>
                    <p className="text-sm font-mono-code text-[#D6C6A5] mt-1">
                      {selectedNovel.subtitle}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#0F0E0D] border border-[#D6C6A5]/20 space-y-2">
                    <h4 className="text-xs font-mono-code font-bold text-[#D6C6A5] uppercase tracking-wider">
                      Plot Synopsis:
                    </h4>
                    <p className="text-sm text-[#A7A7A7] leading-relaxed font-light">
                      {selectedNovel.synopsis}
                    </p>
                  </div>

                  <div className="space-y-3 p-6 rounded-2xl bg-[#12100E] border border-[#D6C6A5]/30 italic font-serif text-base text-[#E5DBC7] leading-relaxed">
                    <span className="text-xs font-mono-code not-italic font-bold text-[#D6C6A5] block uppercase tracking-wider mb-2">
                      EXCLUSIVE CHAPTER EXCERPT:
                    </span>
                    <p>“{selectedNovel.excerpt}”</p>
                  </div>

                  <div className="pt-6 border-t border-[#D6C6A5]/20 flex items-center justify-between">
                    <span className="text-xs font-mono-code text-[#A7A7A7]">
                      Author: <strong className="text-[#D6C6A5]">Laksh Mahajan (MJ)</strong>
                    </span>

                    <button
                      onClick={() => setSelectedNovel(null)}
                      className="px-6 py-2.5 rounded-full bg-[#D6C6A5] text-[#111111] text-xs font-mono-code font-bold cursor-pointer hover:bg-[#c5b391] transition-colors"
                    >
                      Close Sample Reader
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Upload Novel Modal */}
        <AnimatePresence>
          {showUploadModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                className="bg-[#181614] border border-[#D6C6A5]/30 rounded-3xl max-w-xl w-full p-8 shadow-2xl relative overflow-hidden text-[#F5F5F5]"
              >
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-[#22201D] border border-[#33302B] text-[#F5F5F5] hover:bg-[#D6C6A5] hover:text-[#111111] transition-colors cursor-pointer"
                >
                  ✕
                </button>

                <form onSubmit={handleUploadNovel} className="space-y-5">
                  <div>
                    <h3 className="font-heading text-3xl font-bold text-[#F5F5F5]">
                      Add New Novel to MJ World
                    </h3>
                    <p className="text-xs font-mono-code text-[#A7A7A7] mt-1">
                      Upload title, synopsis, and chapter preview for your new book.
                    </p>
                  </div>

                  <div className="space-y-4 text-xs font-mono-code">
                    <div>
                      <label className="block text-[#D6C6A5] mb-1.5 font-bold uppercase">Book Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Whispers in the Dark"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F0E0D] border border-[#D6C6A5]/30 text-[#F5F5F5] focus:outline-none focus:border-[#D6C6A5]"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[#D6C6A5] mb-1.5 font-bold uppercase">Subtitle / Tagline</label>
                        <input
                          type="text"
                          placeholder="e.g. A Sci-Fi Thriller"
                          value={newSubtitle}
                          onChange={(e) => setNewSubtitle(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#0F0E0D] border border-[#D6C6A5]/30 text-[#F5F5F5] focus:outline-none focus:border-[#D6C6A5]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#D6C6A5] mb-1.5 font-bold uppercase">Genre</label>
                        <input
                          type="text"
                          placeholder="e.g. Thriller"
                          value={newGenre}
                          onChange={(e) => setNewGenre(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#0F0E0D] border border-[#D6C6A5]/30 text-[#F5F5F5] focus:outline-none focus:border-[#D6C6A5]"
                        />
                      </div>
                      <div>
                        <label className="block text-[#D6C6A5] mb-1.5 font-bold uppercase">Pages</label>
                        <input
                          type="text"
                          placeholder="e.g. 280 Pages"
                          value={newPages}
                          onChange={(e) => setNewPages(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#0F0E0D] border border-[#D6C6A5]/30 text-[#F5F5F5] focus:outline-none focus:border-[#D6C6A5]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[#D6C6A5] mb-1.5 font-bold uppercase">Plot Synopsis *</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Brief summary of the novel storyline..."
                        value={newSynopsis}
                        onChange={(e) => setNewSynopsis(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F0E0D] border border-[#D6C6A5]/30 text-[#F5F5F5] focus:outline-none focus:border-[#D6C6A5]"
                      />
                    </div>

                    <div>
                      <label className="block text-[#D6C6A5] mb-1.5 font-bold uppercase">Sample Chapter Excerpt</label>
                      <textarea
                        rows={3}
                        placeholder="Paste a sample paragraph or chapter opening..."
                        value={newExcerpt}
                        onChange={(e) => setNewExcerpt(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#0F0E0D] border border-[#D6C6A5]/30 text-[#F5F5F5] focus:outline-none focus:border-[#D6C6A5]"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#D6C6A5]/20 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setShowUploadModal(false)}
                      className="px-5 py-2.5 rounded-full bg-[#22201D] text-[#A7A7A7] text-xs font-mono-code font-bold hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-[#D6C6A5] text-[#111111] text-xs font-mono-code font-bold hover:bg-[#c5b391] shadow-lg"
                    >
                      Publish Novel to MJ World
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
