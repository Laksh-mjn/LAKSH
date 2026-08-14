import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, ExternalLink, ArrowLeft, Music, Sparkles, Play, Volume2 } from 'lucide-react';
import raktaanArtist from '../assets/raktaan-artist.jpg';

const songs = [
  {
    id: '5BtAQKpkYAqKxZAZyKnZEs',
    title: 'Panna',
    subtitle: 'Official Spotify Single',
    genre: 'Acoustic / Indie Pop',
    year: '2026',
    url: 'https://open.spotify.com/track/5BtAQKpkYAqKxZAZyKnZEs?si=b403b20601c241de',
    embedUrl: 'https://open.spotify.com/embed/track/5BtAQKpkYAqKxZAZyKnZEs?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0284fecf66028f0e3254bf3d1e',
    coverGradient: 'from-[#2A2218] via-[#191510] to-[#0F0E0D]',
    description: 'An atmospheric, soulful track featuring acoustic guitar arrangements, evocative Hindi/Punjabi lyrics, and deep ambient soundscapes.',
    highlights: ['Acoustic Guitars', 'Poetic Hindi/Punjabi Lyrics', 'Spotify Single'],
  },
  {
    id: '104O2xKmCd02SIOIDYfosm',
    title: 'Jaan',
    subtitle: 'Official Spotify Single',
    genre: 'Romantic Ballad',
    year: '2026',
    url: 'https://open.spotify.com/track/104O2xKmCd02SIOIDYfosm?si=24c6da6e25004fd2',
    embedUrl: 'https://open.spotify.com/embed/track/104O2xKmCd02SIOIDYfosm?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0226dc20f8b1e432f2a04db545',
    coverGradient: 'from-[#2C1820] via-[#1A0E13] to-[#0F0E0D]',
    description: 'A deeply emotional vocal performance blending contemporary pop production with traditional melodic songwriting.',
    highlights: ['Vocal Production', 'Melodic Composition', 'Emotional Depth'],
  },
  {
    id: '6SXoffS7ATLNxgQJ40Riic',
    title: 'Chuwaa',
    subtitle: 'Official Spotify Single',
    genre: 'Indie Fusion',
    year: '2026',
    url: 'https://open.spotify.com/track/6SXoffS7ATLNxgQJ40Riic?si=83f0b81ab7a544b9',
    embedUrl: 'https://open.spotify.com/embed/track/6SXoffS7ATLNxgQJ40Riic?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02b3d14256a91ea96e9d544190',
    coverGradient: 'from-[#1A2624] via-[#0F1816] to-[#0F0E0D]',
    description: 'Rhythmic fusion single built on layered percussion, intimate vocal melodies, and organic sound textures.',
    highlights: ['Rhythmic Layers', 'Organic Soundscapes', 'Fusion Elements'],
  },
  {
    id: '4eJR6Gje8h7jt28wFD5ZpN',
    title: 'Paarwana',
    subtitle: 'Official Spotify Single',
    genre: 'Sufi Ambient',
    year: '2026',
    url: 'https://open.spotify.com/track/4eJR6Gje8h7jt28wFD5ZpN?si=0f1b5d0efe914a14',
    embedUrl: 'https://open.spotify.com/embed/track/4eJR6Gje8h7jt28wFD5ZpN?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02f18bfb812918f363d25a9e48',
    coverGradient: 'from-[#251B2A] via-[#16101B] to-[#0F0E0D]',
    description: 'Philosophical composition reflecting themes of devotion, longing, and artistic transcendence through soaring vocal lines.',
    highlights: ['Sufi Melodic Lines', 'Philosophical Lyrics', 'High Dynamic Range'],
  },
  {
    id: '2E1Cp57CDInr6z6fdJLQ0i',
    title: 'Khwaab',
    subtitle: 'Official Spotify Single',
    genre: 'Atmospheric Pop',
    year: '2026',
    url: 'https://open.spotify.com/track/2E1Cp57CDInr6z6fdJLQ0i?si=ecb4e910adec4d8b',
    embedUrl: 'https://open.spotify.com/embed/track/2E1Cp57CDInr6z6fdJLQ0i?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02527e47c938da28265bb51eb7',
    coverGradient: 'from-[#1B242C] via-[#10171D] to-[#0F0E0D]',
    description: 'A dreamlike atmospheric track showcasing lush synth pads, warm acoustic rhythm, and delicate vocal harmonies.',
    highlights: ['Synth Atmosphere', 'Acoustic Rhythm', 'Vocal Harmonies'],
  },
  {
    id: '3GXXTU2nWroOoe00nerIPb',
    title: 'Motions',
    subtitle: 'Official Spotify Single',
    genre: 'Chill / Lo-Fi Beats',
    year: '2026',
    url: 'https://open.spotify.com/track/3GXXTU2nWroOoe00nerIPb?si=b88a493ea29d4c53',
    embedUrl: 'https://open.spotify.com/embed/track/3GXXTU2nWroOoe00nerIPb?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02fbf29aa95b43a103fb7247b0',
    coverGradient: 'from-[#282618] via-[#19180E] to-[#0F0E0D]',
    description: 'Laid-back grooves, subtle lo-fi vinyl textures, and smooth melodic phrasing designed for late-night listening.',
    highlights: ['Lo-Fi Grooves', 'Vinyl Textures', 'Late-Night Vibe'],
  },
  {
    id: '2v3Bs32iRmxwUVET62BZht',
    title: 'Midnight',
    subtitle: 'Official Spotify Single',
    genre: 'Dark Ambient / Pop',
    year: '2026',
    url: 'https://open.spotify.com/track/2v3Bs32iRmxwUVET62BZht?si=245f841996104139',
    embedUrl: 'https://open.spotify.com/embed/track/2v3Bs32iRmxwUVET62BZht?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02f75b11daff10bbbbf472e96a',
    coverGradient: 'from-[#171A24] via-[#0E1018] to-[#0F0E0D]',
    description: 'Moody, dark pop single exploring introspection, midnight thoughts, and cinematic instrumental arrangements.',
    highlights: ['Cinematic Instruments', 'Dark Pop Aesthetics', 'Introspective Vibe'],
  },
];

export default function RaktaanArtistPage({ onBack }) {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSongId, setActiveSongId] = useState(songs[0].id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const introTimer = setTimeout(() => setShowIntro(false), 900);
    return () => clearTimeout(introTimer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0E0D] text-[#F5F5F5] font-sans pt-24 pb-28">
      
      {/* Page Intro Transition Overlay */}
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
                RAKTAAN WORLD — MUSIC UNIVERSE
              </span>
              <h1 className="font-heading text-5xl sm:text-7xl font-medium tracking-tight text-[#F5F5F5]">
                Welcome to <span className="italic text-[#D6C6A5]">Raktaan World</span>
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

        {/* Raktaan World Hero Banner — Same Design & Style as MJ World */}
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
                <Sparkles className="w-4 h-4" />
                <span>OFFICIAL SPOTIFY VERIFIED ARTIST</span>
              </div>

              <h1 className="font-heading text-6xl sm:text-8xl font-medium tracking-tight text-[#F5F5F5] leading-none">
                Raktaan World
              </h1>

              <p className="text-2xl sm:text-3xl font-medium text-[#D6C6A5] tracking-wide font-heading italic">
                Lyricist • Composer • Music Producer
              </p>

              <p className="text-base sm:text-lg text-[#A7A7A7] leading-relaxed max-w-2xl font-light">
                The dedicated artistic musical space of Laksh Mahajan (Raktaan). Featuring 7 official Spotify single releases, original Hindi/Punjabi lyrics, acoustic arrangements, and dark atmospheric soundscapes.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="https://open.spotify.com/artist/1lkEE1c2w8HcHWEixWwc7E?si=l7nGAUANSciFDPzbXnN0DQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full bg-[#D6C6A5] hover:bg-[#c5b391] text-[#111111] text-xs font-bold font-mono-code tracking-wide flex items-center gap-2 transition-all shadow-xl hover:scale-105"
                >
                  <Disc className="w-4 h-4" />
                  <span>Open Spotify Artist Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={onBack}
                  className="px-7 py-3.5 rounded-full bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-[#F5F5F5] border border-[#FFFFFF]/20 text-xs font-mono-code font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Switch to Portfolio</span>
                </button>
              </div>
            </div>

            {/* Right Decorative Profile Badge */}
            <div className="lg:col-span-4 flex justify-center">
              <a
                href="https://open.spotify.com/artist/1lkEE1c2w8HcHWEixWwc7E?si=l7nGAUANSciFDPzbXnN0DQ"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-[#D6C6A5]/40 shadow-2xl bg-[#161513] group block cursor-pointer"
              >
                <img
                  src={raktaanArtist}
                  alt="Raktaan Artist Profile"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-lg font-heading font-bold text-[#F5F5F5] group-hover:text-[#D6C6A5] transition-colors">
                    <span>Raktaan</span>
                    <ExternalLink className="w-4 h-4 text-[#D6C6A5]" />
                  </div>
                  <span className="text-xs text-[#D6C6A5] font-mono-code">
                    Spotify Verified Artist
                  </span>
                </div>
              </a>
            </div>

          </div>
        </motion.div>

        {/* Section Heading */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono-code font-bold tracking-widest text-[#D6C6A5] uppercase block mb-1">
              DISCOGRAPHY CATALOG
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-medium text-[#F5F5F5]">
              Featured Singles & Cover Art
            </h2>
          </div>

          <a
            href="https://open.spotify.com/artist/1lkEE1c2w8HcHWEixWwc7E?si=l7nGAUANSciFDPzbXnN0DQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono-code text-[#D6C6A5] hover:underline flex items-center gap-1.5"
          >
            <span>Follow on Spotify</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 7 Track Cards — Matched to MJ World Black Card Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {songs.map((song) => {
            const isActive = activeSongId === song.id;

            return (
              <motion.div
                key={song.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setActiveSongId(song.id)}
                className={`rounded-3xl overflow-hidden bg-[#161413] border shadow-xl flex flex-col justify-between group transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'border-[#D6C6A5] shadow-[0_0_30px_rgba(214,198,165,0.25)]'
                    : 'border-[#D6C6A5]/20 hover:border-[#D6C6A5]/50'
                }`}
              >
                <div>
                  {/* Card Cover Header with Album Art */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#121110]">
                    <img
                      src={song.coverImage}
                      alt={song.title}
                      className={`w-full h-full object-cover object-center transition-transform duration-700 filter contrast-105 ${
                        isActive ? 'scale-105 opacity-90' : 'group-hover:scale-108 opacity-80'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161413] via-transparent to-black/30" />

                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="text-[10px] font-mono-code font-bold px-3 py-1 rounded-full bg-black/70 text-[#D6C6A5] border border-[#D6C6A5]/40 backdrop-blur-md">
                        {song.genre}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-[#D6C6A5] backdrop-blur-md">
                        {isActive ? <Volume2 className="w-4 h-4 text-[#D6C6A5] animate-pulse" /> : <Music className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-7 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-code text-[#D6C6A5] uppercase tracking-widest block">
                        RAKTAAN SINGLE
                      </span>
                      <span className="text-xs font-mono-code text-[#A7A7A7]">
                        {song.year}
                      </span>
                    </div>

                    <h3 className="font-heading text-3xl font-bold text-[#F5F5F5] group-hover:text-[#D6C6A5] transition-colors">
                      {song.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A7A7A7] leading-relaxed font-light line-clamp-2">
                      {song.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {song.highlights.map((h) => (
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

                {/* Card Action Footer */}
                <div className="p-6 pt-0 space-y-3 border-t border-[#D6C6A5]/10">
                  {isActive ? (
                    <div className="rounded-xl overflow-hidden border border-[#D6C6A5]/50 shadow-2xl mb-2 bg-black/90 backdrop-blur-md animate-fadeIn mt-4">
                      <iframe
                        src={`${song.embedUrl}&autoplay=1`}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        referrerPolicy="no-referrer-when-downgrade"
                        loading="lazy"
                        title={`Spotify Player ${song.title}`}
                      />
                    </div>
                  ) : (
                    <div className="py-2.5 px-4 rounded-xl mt-4 bg-[#22201D] hover:bg-[#2A2724] border border-[#33302B] flex items-center justify-between transition-all group/bar">
                      <span className="text-[11px] font-mono-code font-bold text-[#D6C6A5] uppercase">
                        PREVIEW TRACK
                      </span>
                      <Play className="w-3.5 h-3.5 text-[#D6C6A5] fill-current" />
                    </div>
                  )}

                  <a
                    href={song.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-3 rounded-full bg-[#D6C6A5] hover:bg-[#c5b391] text-[#111111] text-xs font-mono-code font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-md hover:scale-102"
                  >
                    <Disc className="w-3.5 h-3.5" />
                    <span>Listen on Spotify</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
