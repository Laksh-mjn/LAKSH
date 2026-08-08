import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Disc, ExternalLink, ArrowLeft, Music, Sparkles, Play, Volume2 } from 'lucide-react';

const songs = [
  {
    id: '5BtAQKpkYAqKxZAZyKnZEs',
    title: 'Panna',
    url: 'https://open.spotify.com/track/5BtAQKpkYAqKxZAZyKnZEs?si=b403b20601c241de',
    embedUrl: 'https://open.spotify.com/embed/track/5BtAQKpkYAqKxZAZyKnZEs?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e0284fecf66028f0e3254bf3d1e',
  },
  {
    id: '104O2xKmCd02SIOIDYfosm',
    title: 'Jaan',
    url: 'https://open.spotify.com/track/104O2xKmCd02SIOIDYfosm?si=24c6da6e25004fd2',
    embedUrl: 'https://open.spotify.com/embed/track/104O2xKmCd02SIOIDYfosm?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e0226dc20f8b1e432f2a04db545',
  },
  {
    id: '6SXoffS7ATLNxgQJ40Riic',
    title: 'Chuwaa',
    url: 'https://open.spotify.com/track/6SXoffS7ATLNxgQJ40Riic?si=83f0b81ab7a544b9',
    embedUrl: 'https://open.spotify.com/embed/track/6SXoffS7ATLNxgQJ40Riic?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02b3d14256a91ea96e9d544190',
  },
  {
    id: '4eJR6Gje8h7jt28wFD5ZpN',
    title: 'Paarwana',
    url: 'https://open.spotify.com/track/4eJR6Gje8h7jt28wFD5ZpN?si=0f1b5d0efe914a14',
    embedUrl: 'https://open.spotify.com/embed/track/4eJR6Gje8h7jt28wFD5ZpN?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02f18bfb812918f363d25a9e48',
  },
  {
    id: '2E1Cp57CDInr6z6fdJLQ0i',
    title: 'Khwaab',
    url: 'https://open.spotify.com/track/2E1Cp57CDInr6z6fdJLQ0i?si=ecb4e910adec4d8b',
    embedUrl: 'https://open.spotify.com/embed/track/2E1Cp57CDInr6z6fdJLQ0i?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02527e47c938da28265bb51eb7',
  },
  {
    id: '3GXXTU2nWroOoe00nerIPb',
    title: 'Motions',
    url: 'https://open.spotify.com/track/3GXXTU2nWroOoe00nerIPb?si=b88a493ea29d4c53',
    embedUrl: 'https://open.spotify.com/embed/track/3GXXTU2nWroOoe00nerIPb?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-fa.spotifycdn.com/image/ab67616d00001e02fbf29aa95b43a103fb7247b0',
  },
  {
    id: '2v3Bs32iRmxwUVET62BZht',
    title: 'Midnight',
    url: 'https://open.spotify.com/track/2v3Bs32iRmxwUVET62BZht?si=245f841996104139',
    embedUrl: 'https://open.spotify.com/embed/track/2v3Bs32iRmxwUVET62BZht?utm_source=generator&theme=0',
    coverImage: 'https://image-cdn-ak.spotifycdn.com/image/ab67616d00001e02f75b11daff10bbbbf472e96a',
  },
];

export default function RaktaanArtistPage({ onBack }) {
  // Ultra-clean 1.2s professional fade-through intro transition
  const [showIntro, setShowIntro] = useState(true);
  
  // Only ONE track iframe is mounted in the DOM at a time to strictly enforce single-song playback!
  const [activeSongId, setActiveSongId] = useState(songs[0].id);

  // Guarantee page opens at the very top section when mounted
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const introTimer = setTimeout(() => {
      setShowIntro(false);
    }, 1200);

    return () => clearTimeout(introTimer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0E0D] text-[#F5F5F5] font-sans pt-24 pb-28">
      
      {/* ------------------------------------------------------------- */}
      {/* PROFESSIONAL ULTRA-CLEAN FADE-THROUGH TRANSITION */}
      {/* ------------------------------------------------------------- */}
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
                RAKTAAN MUSIC WORLD
              </span>
              
              <h1 className="font-heading text-5xl sm:text-7xl font-medium tracking-tight text-[#F5F5F5]">
                Welcome to the <span className="italic text-[#D6C6A5]">Raktaan Universe</span>
              </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Back Link */}
        <div className="mb-10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono-code text-[#A7A7A7] hover:text-[#D6C6A5] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Engineering Portfolio</span>
          </button>
        </div>

        {/* Artistic Luxury Hero Banner featuring Raktaan Artistic Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1C1A17] via-[#141312] to-[#0F0E0D] border border-[#D6C6A5]/25 p-8 sm:p-14 mb-20 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6C6A5]/10 border border-[#D6C6A5]/30 text-[#D6C6A5] text-xs font-mono-code">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL SPOTIFY VERIFIED ARTIST</span>
              </div>

              <h1 className="font-heading text-6xl sm:text-8xl font-medium tracking-tight text-[#F5F5F5] leading-none">
                Raktaan World
              </h1>

              <p className="text-2xl sm:text-3xl font-medium text-[#D6C6A5] tracking-wide font-heading italic">
                Lyricist • Composer • Music Producer
              </p>

              <p className="text-base sm:text-lg text-[#A7A7A7] leading-relaxed max-w-2xl font-light">
                The dedicated artistic musical space of Laksh Mahajan (Raktaan). Featuring official Spotify single releases, original Hindi/Punjabi lyrics, acoustic arrangements, and dark atmospheric soundscapes.
              </p>

              <div className="flex flex-wrap gap-4 items-center pt-2">
                <a
                  href="https://open.spotify.com/artist/1lkEE1c2w8HcHWEixWwc7E?si=l7nGAUANSciFDPzbXnN0DQ"
                  target="_blank"
                  rel="noreferrer"
                  className="px-7 py-3.5 rounded-full bg-[#D6C6A5] hover:bg-[#c5b391] text-[#111111] text-xs font-bold tracking-wide flex items-center gap-2 transition-all shadow-xl hover:scale-105"
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

            {/* Raktaan Artistic Profile Picture -> Direct Click to Spotify Artist Profile */}
            <div className="lg:col-span-4 flex justify-center">
              <a
                href="https://open.spotify.com/artist/1lkEE1c2w8HcHWEixWwc7E?si=l7nGAUANSciFDPzbXnN0DQ"
                target="_blank"
                rel="noreferrer"
                className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-[#D6C6A5]/40 shadow-2xl bg-[#161513] group block cursor-pointer"
              >
                <img
                  src="/raktaan-artist.jpg"
                  alt="Raktaan Artist Profile"
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-lg font-heading font-bold text-[#F5F5F5] group-hover:text-[#D6C6A5] transition-colors">
                    <span>Raktaan</span>
                    <ExternalLink className="w-4 h-4 text-[#D6C6A5]" />
                  </div>
                  <span className="text-xs text-[#D6C6A5] font-mono-code">
                    Artist Identity
                  </span>
                </div>
              </a>
            </div>

          </div>
        </motion.div>

        {/* Section Heading */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono-code font-bold tracking-widest text-[#D6C6A5] uppercase block mb-2">
              DISCOGRAPHY CATALOG
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-medium text-[#F5F5F5] tracking-tight">
              Featured Singles & Official Cover Art
            </h2>
          </div>

          <a
            href="https://open.spotify.com/artist/1lkEE1c2w8HcHWEixWwc7E?si=l7nGAUANSciFDPzbXnN0DQ"
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono-code text-[#D6C6A5] hover:underline flex items-center gap-1.5"
          >
            <span>Follow on Spotify</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 7 High-End Artistic Cards — Minimal Smooth Play Trigger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {songs.map((song) => {
            const isActive = activeSongId === song.id;

            return (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                onClick={() => setActiveSongId(song.id)}
                className={`group relative rounded-3xl overflow-hidden border bg-[#171614] shadow-2xl flex flex-col justify-between min-h-[480px] transition-all duration-500 cursor-pointer ${
                  isActive
                    ? 'border-[#D6C6A5] shadow-[0_0_30px_rgba(214,198,165,0.25)]'
                    : 'border-[#D6C6A5]/25 hover:border-[#D6C6A5]/60'
                }`}
              >
                {/* Authentic Spotify Album Cover Background */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  <img
                    src={song.coverImage}
                    alt={song.title}
                    className={`w-full h-full object-cover object-center transition-transform duration-700 filter contrast-105 ${
                      isActive ? 'scale-105 opacity-85' : 'group-hover:scale-108 opacity-75'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0E0D] via-[#0F0E0D]/65 to-black/30" />
                </div>

                {/* Top Header Card Info */}
                <div className="relative z-10 p-6 flex items-center justify-between">
                  <span className="text-[11px] font-mono-code font-semibold px-3 py-1 rounded-full bg-black/70 text-[#D6C6A5] border border-[#D6C6A5]/40 backdrop-blur-md">
                    Raktaan
                  </span>

                  <div className="w-8 h-8 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-[#D6C6A5] backdrop-blur-md">
                    {isActive ? <Volume2 className="w-4 h-4 text-[#D6C6A5] animate-pulse" /> : <Music className="w-4 h-4" />}
                  </div>
                </div>

                {/* Bottom Card: Song Name & Embedded Player */}
                <div className="relative z-10 p-6">
                  <h3 className="font-heading text-4xl font-bold text-[#F5F5F5] mb-4 group-hover:text-[#D6C6A5] transition-colors drop-shadow-lg">
                    {song.title}
                  </h3>

                  {/* Active Card mounts the Spotify Player iframe; Inactive Card shows minimal smooth play bar */}
                  {isActive ? (
                    <div className="rounded-xl overflow-hidden border border-[#D6C6A5]/50 shadow-2xl mb-3 bg-black/90 backdrop-blur-md animate-fadeIn">
                      <iframe
                        src={`${song.embedUrl}&autoplay=1`}
                        width="100%"
                        height="152"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        title={`Spotify Player ${song.title}`}
                      />
                    </div>
                  ) : (
                    <div className="py-3 px-4 rounded-xl mb-3 bg-black/60 hover:bg-black/80 border border-white/10 hover:border-[#D6C6A5]/50 backdrop-blur-md flex items-center justify-between transition-all duration-300 group/bar">
                      <span className="text-[11px] font-mono-code font-bold text-[#D6C6A5] tracking-widest uppercase">
                        PLAY TRACK
                      </span>
                      <div className="w-7 h-7 rounded-full bg-[#D6C6A5]/20 group-hover/bar:bg-[#D6C6A5] group-hover/bar:text-[#111111] text-[#D6C6A5] flex items-center justify-center transition-all duration-300">
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}

                  <a
                    href={song.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-3 rounded-xl bg-[#D6C6A5] hover:bg-[#c5b391] text-[#111111] text-xs font-bold tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg"
                  >
                    <span>Listen on Spotify</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
