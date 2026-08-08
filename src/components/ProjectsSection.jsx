import React from 'react';
import { ExternalLink, GitBranch } from 'lucide-react';

export default function ProjectsSection() {
  const projects = [
    {
      title: 'AI Data Intelligence & Analytics Engine',
      category: 'Artificial Intelligence',
      desc: 'Generative AI and machine learning pipeline for automatic data classification, insight extraction, and predictive forecasting.',
      tags: ['Python', 'Generative AI', 'React', 'REST API', 'Tailwind CSS'],
      github: 'https://github.com',
      demo: '#',
    },
    {
      title: 'Youth Organisation Event Management Portal',
      category: 'Web Application',
      desc: 'Full-stack platform built for event coordination, attendee registration, schedule management, and team communication.',
      tags: ['React', 'Next.js', 'Tailwind CSS', 'SQL', 'Node.js'],
      github: 'https://github.com',
      demo: '#',
    },
    {
      title: 'Raktaan Audio Visualizer & Music Showcase',
      category: 'Creative Tech & Audio',
      desc: 'Interactive web platform featuring audio visualizer effects, track showcase, lyrics reader, and Spotify integration.',
      tags: ['JavaScript', 'Web Audio API', 'React', 'Tailwind CSS'],
      github: 'https://github.com',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="py-24 bg-[#EFECE6] border-y border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#2B4C7E] uppercase block mb-2">
            FEATURED ENGINEERING
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium text-[#141414] tracking-tight">
            Projects & Systems Architecture
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.title}
              className="p-7 rounded-3xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-xs flex flex-col justify-between hover:border-[#2B4C7E]/40 transition-all"
            >
              <div>
                <span className="text-xs font-mono-code font-bold px-3 py-1 rounded bg-[#2B4C7E]/10 text-[#2B4C7E] inline-block mb-4">
                  {proj.category}
                </span>

                <h3 className="font-heading text-2xl font-bold text-[#141414] mb-3">
                  {proj.title}
                </h3>

                <p className="text-sm text-[#5C5C5C] mb-6 leading-relaxed font-normal">
                  {proj.desc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.tags.map((t) => (
                    <span key={t} className="text-xs font-mono-code px-2.5 py-1 rounded bg-[#F8F7F4] text-[#5C5C5C] border border-[#E5E2DC]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#E5E2DC]">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono-code font-bold text-[#141414] hover:text-[#2B4C7E] flex items-center gap-1.5"
                  >
                    <GitBranch className="w-4 h-4 text-[#2B4C7E]" />
                    <span>Repository</span>
                  </a>
                  <span className="text-[#E5E2DC]">|</span>
                  <a
                    href={proj.demo}
                    className="text-xs font-mono-code font-bold text-[#2B4C7E] hover:underline flex items-center gap-1.5"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
