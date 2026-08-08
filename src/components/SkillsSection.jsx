import React from 'react';
import { Cpu, Code, Users, Music, ExternalLink, CheckCircle2, ShieldCheck, Disc } from 'lucide-react';

const LINKEDIN_SKILLS_URL = 'https://www.linkedin.com/in/laksh-mahajan-696157329/details/skills/';

export default function SkillsSection() {
  const categories = [
    {
      title: 'Generative AI & Agentic Systems',
      icon: Cpu,
      accent: 'text-[#D97706]',
      isLinkedIn: true,
      skills: [
        'Anthropic Claude',
        'Generative AI',
        'Large Language Models (LLM)',
        'AI Agents',
        'Retrieval-Augmented Generation (RAG)',
        'AI Automation',
        'ChatGPT',
        'AI Basics',
        'Prompt Writing',
      ],
    },
    {
      title: 'Technical & Computer Science Engineering',
      icon: Code,
      accent: 'text-[#2B4C7E]',
      isLinkedIn: true,
      skills: [
        'Engineering',
        'Python (Programming Language)',
        'C (Programming Language)',
        'C++ (Programming Language)',
        'HTML',
        'CSS',
        'JavaScript',
        'Bash',
        'DBMS',
        'Operating Systems',
        'Computer Networks',
        'Overleaf / LaTeX',
      ],
    },
    {
      title: 'Leadership & Event Operations',
      icon: Users,
      accent: 'text-[#3E6B48]',
      isLinkedIn: true,
      skills: [
        'Situational Leadership',
        'Event Management',
        'Event Organization',
        'Crowd Control',
        'Communication',
        'Youth Mentorship (300+ Students)',
      ],
    },
    {
      title: 'Creative & Artistry (Raktaan)',
      icon: Music,
      accent: 'text-[#6F5B8A]',
      isLinkedIn: false,
      skills: [
        'Lyricist & Songwriter (Hindi, English, Dogri, Punjabi)',
        'Music Composition',
        'Audio Mixing & Production',
        'Vocal Arranging',
        'DAW Sound Design',
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 bg-[#F8F7F4] border-b border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <span className="text-xs font-mono-code font-bold tracking-widest text-[#2B4C7E] uppercase block mb-2">
              CORE COMPETENCIES & ARTISTRY
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-medium text-[#141414] tracking-tight">
              Skills & Multidisciplinary Capabilities
            </h2>
          </div>

          <a
            href={LINKEDIN_SKILLS_URL}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-mono-code font-bold inline-flex items-center gap-2 transition-all shadow-md hover:scale-105 shrink-0"
          >
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Verify Skills on LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <div
                key={cat.title}
                className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-xs hover:border-[#2B4C7E]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC]">
                        <IconComp className={`w-6 h-6 ${cat.accent}`} />
                      </div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#141414]">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {cat.skills.map((s) =>
                      cat.isLinkedIn ? (
                        <a
                          key={s}
                          href={LINKEDIN_SKILLS_URL}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-[#F8F7F4] hover:bg-[#0A66C2]/10 hover:border-[#0A66C2]/40 border border-[#E5E2DC] text-xs font-mono-code text-[#141414] hover:text-[#0A66C2] font-medium transition-all inline-flex items-center gap-1.5 cursor-pointer group"
                        >
                          <span>{s}</span>
                          <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <span
                          key={s}
                          className="px-3.5 py-1.5 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] text-xs font-mono-code text-[#141414] font-medium inline-flex items-center gap-1.5"
                        >
                          <span>✓ {s}</span>
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-[#E5E2DC] flex items-center justify-between text-xs font-mono-code">
                  {cat.isLinkedIn ? (
                    <>
                      <span className="flex items-center gap-1.5 text-[#3E6B48] font-bold text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>LinkedIn Verified</span>
                      </span>

                      <a
                        href={LINKEDIN_SKILLS_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0A66C2] hover:underline font-bold text-[11px] flex items-center gap-1"
                      >
                        <span>Verify Skillset</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-1.5 text-[#6F5B8A] font-bold text-[11px]">
                        <Disc className="w-3.5 h-3.5" />
                        <span>Artistic Profile (Raktaan)</span>
                      </span>

                      <span className="text-[#5C5C5C] font-semibold text-[11px]">
                        Hindi • English • Dogri • Punjabi
                      </span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
