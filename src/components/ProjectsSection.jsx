import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GitBranch, X, ArrowRight } from 'lucide-react';
import projectAIEngine from '../assets/project_ai_engine.jpg';
import projectYouthPortal from '../assets/project_youth_portal.jpg';
import projectRaktaanAudio from '../assets/project_raktaan_audio.jpg';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      id: '01',
      title: 'AI Data Intelligence & Analytics Engine',
      category: 'Artificial Intelligence & ML',
      image: projectAIEngine,
      shortDesc: 'Generative AI and machine learning pipeline for automatic data classification, insight extraction, and predictive forecasting.',
      problem: 'Enterprise datasets often lack automated classification, structured anomaly detection, and rapid insight synthesis from unstructured logs.',
      solution: 'Built a multi-layer Generative AI & machine learning engine leveraging LLM agents, custom data embeddings, and interactive React analytics dashboards.',
      results: 'Reduced manual report synthesis time by 85% with real-time inference streaming and high-precision anomaly alerts.',
      tags: ['Python', 'Generative AI', 'React', 'REST API', 'Tailwind CSS', 'LLMs'],
      github: 'https://github.com/Laksh-mjn',
      demo: 'https://github.com/Laksh-mjn',
    },
    {
      id: '02',
      title: 'Youth Organisation Event Management Portal',
      category: 'Full-Stack Web Architecture',
      image: projectYouthPortal,
      shortDesc: 'Full-stack platform built for event coordination, attendee registration, schedule management, and team communication.',
      problem: 'Coordinating multi-city youth events across 7+ states for 300+ performers created logistical friction in registration and ticketing.',
      solution: 'Engineered a full-stack event command center with real-time attendee density heatmaps, registration tracking, and stage logistics management.',
      results: 'Successfully handled registration for multi-state cultural festivals in Delhi, Ludhiana, Chandigarh, and Jhansi.',
      tags: ['React', 'Next.js', 'Tailwind CSS', 'SQL', 'Node.js'],
      github: 'https://github.com/Laksh-mjn',
      demo: 'https://github.com/Laksh-mjn',
    },
    {
      id: '03',
      title: 'Raktaan Audio Visualizer & Music Showcase',
      category: 'Creative Tech & Web Audio',
      image: projectRaktaanAudio,
      shortDesc: 'Interactive web platform featuring audio visualizer effects, track showcase, lyrics reader, and Spotify integration.',
      problem: 'Standard streaming links do not convey the immersive acoustic depth of original compositions and multitrack studio productions.',
      solution: 'Designed a real-time Web Audio API visualizer canvas with dynamic spectrum analyzers, synced lyric reading engine, and Spotify API integration.',
      results: 'Powers the dedicated music showcase for 7 released Spotify singles (*Panna*, *Jaan*, *Chuwaa*, *Paarwana*, *Khwaab*, *Motions*, *Midnight*).',
      tags: ['JavaScript', 'Web Audio API', 'React', 'Tailwind CSS', 'Canvas API'],
      github: 'https://github.com/Laksh-mjn',
      demo: 'https://open.spotify.com/artist/1lkEE1c2w8HcHWEixWwc7E',
    },
  ];

  return (
    <section id="projects" className="py-28 scroll-mt-24 bg-[#0B0B0E] border-y border-white/[0.06] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-20">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-mono-code font-medium tracking-widest text-[#86868B] uppercase block mb-3">
            ENGINEERING & SYSTEMS ARCHITECTURE
          </span>
          <h2 className="font-heading text-4xl sm:text-6xl font-bold text-[#F5F5F7] tracking-tight">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg text-[#86868B] mt-2 font-light">
            Selected engineering architectures spanning Artificial Intelligence, Web Platforms, and Creative Audio Systems.
          </p>
        </div>

        {/* Minimalist Editorial Projects List */}
        <div className="space-y-16">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl group"
            >
              {/* Image Preview */}
              <div
                className="lg:col-span-7 relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#08080A] cursor-pointer group/img"
                onClick={() => setSelectedProject(proj)}
                data-cursor="EXPAND"
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08080A]/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass-pill text-white text-xs font-mono-code">
                  {proj.category}
                </div>
              </div>

              {/* Case Study Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                  <span className="font-heading text-4xl font-black text-white">
                    {proj.id}
                  </span>
                  <span className="text-xs font-mono-code text-[#86868B] uppercase tracking-widest font-semibold">
                    CASE STUDY
                  </span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F5F7] leading-tight">
                  {proj.title}
                </h3>

                <p className="text-sm sm:text-base text-[#86868B] leading-relaxed font-light">
                  {proj.shortDesc}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-xl glass-pill text-xs font-mono-code text-[#D4D4D8]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="px-6 py-3 rounded-full bg-white text-black font-mono-code font-bold text-xs uppercase hover:bg-[#E5E5EA] transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    data-cursor="INSPECT"
                  >
                    <span>Inspect Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass-pill text-[#F5F5F7] hover:border-white transition-colors"
                  >
                    <GitBranch className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Expanded Modal Case Study Inspector with Glassmorphism */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-2xl p-4 sm:p-10 flex items-center justify-center overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel rounded-3xl max-w-4xl w-full p-6 sm:p-12 space-y-8 shadow-2xl relative my-8 max-h-[88vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-3 rounded-full bg-[#08080A] border border-white/15 text-[#A1A1AA] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-white text-xs font-mono-code">
                  {selectedProject.category}
                </span>
                <span className="text-xs font-mono-code text-[#86868B]">PROJECT {selectedProject.id}</span>
              </div>

              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white">
                {selectedProject.title}
              </h2>

              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-white/10">
                <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div className="p-6 rounded-2xl bg-[#08080A] border border-white/10 space-y-2">
                  <h4 className="text-xs font-mono-code font-bold text-white uppercase tracking-wider">
                    PROBLEM STATEMENT
                  </h4>
                  <p className="text-sm text-[#D4D4D8] leading-relaxed font-light">
                    {selectedProject.problem}
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#08080A] border border-white/10 space-y-2">
                  <h4 className="text-xs font-mono-code font-bold text-white uppercase tracking-wider">
                    ENGINEERING SOLUTION
                  </h4>
                  <p className="text-sm text-[#D4D4D8] leading-relaxed font-light">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {selectedProject.results && (
                <div className="p-6 rounded-2xl bg-[#08080A] border border-white/10 space-y-2">
                  <h4 className="text-xs font-mono-code font-bold text-white uppercase tracking-wider">
                    RESULTS & IMPACT
                  </h4>
                  <p className="text-sm text-[#D4D4D8] leading-relaxed font-light">
                    {selectedProject.results}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-xl bg-[#08080A] text-xs font-mono-code text-[#A1A1AA] border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-[#08080A] border border-white/20 text-[#F5F5F7] hover:border-white text-xs font-mono-code font-bold inline-flex items-center gap-2"
                  >
                    <GitBranch className="w-4 h-4" />
                    <span>GitHub Repo</span>
                  </a>
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono-code font-bold inline-flex items-center gap-2 hover:bg-[#E5E5EA] transition-all"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
