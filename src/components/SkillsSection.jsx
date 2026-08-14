import React, { useState } from 'react';
import { 
  Cpu, Code, Users, Music, ExternalLink, ShieldCheck, CheckCircle2, Disc,
  Brain, Layers, Terminal, Cloud, Database, Lock, Wand2
} from 'lucide-react';

const LINKEDIN_SKILLS_URL = 'https://www.linkedin.com/in/laksh-mahajan-696157329/details/skills/';

export default function SkillsSection() {
  const [activeNode, setActiveNode] = useState(0);

  const skills = [
    {
      id: 0,
      name: 'Artificial Intelligence',
      category: 'AI & ML Core',
      icon: Cpu,
      subSkills: ['Anthropic Claude', 'Generative AI', 'Large Language Models (LLM)', 'AI Agents', 'RAG Architectures', 'Prompt Engineering'],
      desc: 'Expertise in building AI agents, fine-tuning LLMs, RAG pipelines, and deploying automated intelligent workflows.',
    },
    {
      id: 1,
      name: 'Machine Learning',
      category: 'AI & ML Core',
      icon: Brain,
      subSkills: ['Supervised Learning', 'Unsupervised Clustering', 'Neural Networks', 'Scikit-learn', 'PyTorch Basics'],
      desc: 'Predictive modeling, data classification, and mathematical machine learning algorithm implementations.',
    },
    {
      id: 2,
      name: 'Generative AI',
      category: 'GenAI & Automation',
      icon: Wand2,
      subSkills: ['Claude 101 (Anthropic)', 'OpenAI AI Foundations', 'IBM AI Agents & RAG', 'Prompt Design', 'Chatbot Architectures'],
      desc: 'Generative model integration, multi-agent frameworks, synthetic data generation, and context optimization.',
    },
    {
      id: 3,
      name: 'Python',
      category: 'Programming & Logic',
      icon: Terminal,
      subSkills: ['Data Analytics', 'Pandas & NumPy', 'REST APIs', 'Backend Automation', 'Object-Oriented Programming'],
      desc: 'Primary engineering language used for data manipulation, AI scripting, automated workflows, and web services.',
    },
    {
      id: 4,
      name: 'Deep Learning',
      category: 'Neural Networks',
      icon: Layers,
      subSkills: ['Multi-Layer Perceptrons', 'Computer Vision Basics', 'Model Fine-tuning', 'Tensor Calculations'],
      desc: 'Neural network training, optimization algorithms, gradient descent, and deep neural layer abstractions.',
    },
    {
      id: 5,
      name: 'Cybersecurity',
      category: 'Systems & Security',
      icon: Lock,
      subSkills: ['Network Security', 'Threat Analysis', 'Operating Systems Hardening', 'Data Encryption Standards'],
      desc: 'Protecting digital infrastructures, secure coding principles, network protocol inspection, and access controls.',
    },
    {
      id: 6,
      name: 'Cloud Computing',
      category: 'Infrastructure',
      icon: Cloud,
      subSkills: ['Microsoft Cloud Basics', 'AWS/GCP Fundamentals', 'Container Deployment', 'Serverless APIs'],
      desc: 'Scalable cloud architectures, distributed system deployment, database hosting, and cloud service management.',
    },
    {
      id: 7,
      name: 'Data Analytics',
      category: 'Data Engineering',
      icon: Database,
      subSkills: ['SQL Databases', 'DBMS Systems', 'Data Visualization', 'Statistical Analysis', 'Predictive Metrics'],
      desc: 'Structured database management, SQL query optimization, data cleaning, and business intelligence reporting.',
    },
  ];

  const categories = [
    {
      title: 'Generative AI & Agentic Systems',
      icon: Cpu,
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

  const active = skills[activeNode];

  return (
    <section id="skills" className="py-20 sm:py-24 bg-[#08080A] border-b border-white/[0.06] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-mono-code font-medium tracking-widest text-[#86868B] uppercase block mb-3">
              TECHNICAL & CREATIVE CAPABILITIES
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-[#F5F5F7] tracking-tight">
              Skills & Engineering
            </h2>
            <p className="text-base sm:text-lg text-[#86868B] mt-2 font-light">
              Interactive circular skill hub. Select any node to inspect core engineering and creative specializations.
            </p>
          </div>

          <a
            href={LINKEDIN_SKILLS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono-code font-bold inline-flex items-center gap-2 transition-all hover:bg-[#E5E5EA] shrink-0 cursor-pointer shadow-lg"
            data-cursor="LINKEDIN"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify on LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Simple Circular Selector + Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-6 sm:p-10 rounded-3xl shadow-2xl">
          
          {/* Left Column: Clean Circular Orbit Wheel */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-2 sm:p-6">
            
            {/* Circular Container with clean fixed aspect ratio */}
            <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] flex items-center justify-center">
              
              {/* Clean Circular Track Ring */}
              <div className="absolute inset-4 rounded-full border border-white/10" />
              <div className="absolute inset-16 rounded-full border border-white/[0.04]" />

              {/* Central Hub */}
              <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/5 border border-white/20 p-1 flex items-center justify-center shadow-xl">
                <div className="w-full h-full rounded-full bg-[#08080A] flex flex-col items-center justify-center text-center p-1">
                  <span className="font-heading font-bold text-xs sm:text-sm text-white tracking-widest">LAKSH</span>
                  <span className="text-[8px] font-mono-code text-[#86868B]">SKILLS</span>
                </div>
              </div>

              {/* 8 Circular Skill Buttons positioned evenly around the circle */}
              {skills.map((skill, index) => {
                const angle = (index * 360) / skills.length;
                const rad = (angle * Math.PI) / 180;
                // Radius in percentage from center (0..100)
                const radius = 38;
                const xPct = 50 + radius * Math.cos(rad);
                const yPct = 50 + radius * Math.sin(rad);
                const isSelected = activeNode === index;
                const IconComp = skill.icon;

                return (
                  <button
                    key={skill.id}
                    onClick={() => setActiveNode(index)}
                    style={{
                      position: 'absolute',
                      left: `${xPct}%`,
                      top: `${yPct}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 shadow-md ${
                      isSelected
                        ? 'bg-white text-black border-2 border-white shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-110'
                        : 'bg-[#121216] text-[#A1A1AA] border border-white/15 hover:border-white/50 hover:text-white'
                    }`}
                    title={skill.name}
                    aria-label={skill.name}
                  >
                    <IconComp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                );
              })}
            </div>

            {/* Active Skill Indicator Badge */}
            <div className="mt-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono-code text-white">
                <span className="w-2 h-2 rounded-full bg-white" />
                <span>Selected: <strong>{active.name}</strong></span>
              </span>
            </div>

          </div>

          {/* Right Column: Clean Skill Inspector Details */}
          <div className="lg:col-span-6 glass-card p-6 sm:p-8 rounded-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono-code text-white/80 font-bold uppercase tracking-wider">
                [ SKILL_0{active.id + 1} ]
              </span>
              <span className="text-[11px] font-mono-code px-3 py-1 rounded-full glass-pill text-[#A1A1AA]">
                {active.category}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                {active.name}
              </h3>
              <p className="text-sm sm:text-base text-[#86868B] leading-relaxed font-light">
                {active.desc}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-mono-code font-medium text-[#A1A1AA] uppercase tracking-wider block">
                SPECIALIZED SKILLS & FRAMEWORKS:
              </span>
              <div className="flex flex-wrap gap-2">
                {active.subSkills.map((sub) => (
                  <span
                    key={sub}
                    className="px-3 py-1.5 rounded-xl glass-pill text-xs font-mono-code text-[#E5E5EA] flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-white/70" />
                    <span>{sub}</span>
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Skill Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <div
                key={cat.title}
                className="p-8 rounded-3xl glass-card hover:border-white/40 transition-all flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-[#08080A] border border-white/10 text-white">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                        {cat.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((s) =>
                      cat.isLinkedIn ? (
                        <a
                          key={s}
                          href={LINKEDIN_SKILLS_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 rounded-xl bg-[#08080A] hover:bg-white hover:text-black border border-white/10 text-xs font-mono-code text-[#A1A1AA] transition-all inline-flex items-center gap-1.5 cursor-pointer group"
                        >
                          <span>{s}</span>
                          <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100" />
                        </a>
                      ) : (
                        <span
                          key={s}
                          className="px-3.5 py-1.5 rounded-xl bg-[#08080A] border border-white/10 text-xs font-mono-code text-[#A1A1AA] inline-flex items-center gap-1.5"
                        >
                          <span>✓ {s}</span>
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-code">
                  {cat.isLinkedIn ? (
                    <>
                      <span className="flex items-center gap-1.5 text-white/70 font-medium text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>LinkedIn Verified</span>
                      </span>

                      <a
                        href={LINKEDIN_SKILLS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:underline font-medium text-[11px] flex items-center gap-1"
                      >
                        <span>Verify Skillset</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-1.5 text-white/70 font-medium text-[11px]">
                        <Disc className="w-3.5 h-3.5" />
                        <span>Artistic Profile (Raktaan)</span>
                      </span>

                      <span className="text-[#86868B] font-normal text-[11px]">
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
