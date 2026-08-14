import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, Code, Users, Music, ExternalLink, ShieldCheck, CheckCircle2, Disc,
  Brain, Layers, Terminal, Cloud, Database, Lock, Wand2
} from 'lucide-react';

const LINKEDIN_SKILLS_URL = 'https://www.linkedin.com/in/laksh-mahajan-696157329/details/skills/';

export default function SkillsSection() {
  const [activeNode, setActiveNode] = useState(0);

  const neuralNodes = [
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

  const active = neuralNodes[activeNode];

  return (
    <section id="skills" className="py-20 sm:py-24 bg-[#08080A] border-b border-white/[0.06] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-12 sm:space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-mono-code font-medium tracking-widest text-[#86868B] uppercase block mb-3">
              TECHNICAL & CREATIVE CAPABILITIES
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-bold text-[#F5F5F7] tracking-tight">
              Skills & Engineering Graph
            </h2>
            <p className="text-base sm:text-lg text-[#86868B] mt-2 font-light">
              Interactive circular radar connecting Laksh’s engineering and creative capabilities. Click any node to inspect.
            </p>
          </div>

          <a
            href={LINKEDIN_SKILLS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-white text-black text-xs font-mono-code font-bold inline-flex items-center gap-2 transition-all hover:bg-[#E5E5EA] hover:scale-105 shrink-0 cursor-pointer shadow-lg"
            data-cursor="LINKEDIN"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Verify on LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Circular Radar Selector + Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-6 sm:p-10 rounded-3xl shadow-2xl">
          
          {/* Left Column: Precision Circular Orbit Radar */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            {/* Square Radar Container with fixed aspect ratio */}
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-square flex items-center justify-center">
              
              {/* SVG Circular Orbit Track & Synapse Beams */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                viewBox="0 0 100 100"
              >
                <defs>
                  <linearGradient id="activeSynapseGrad" x1="50%" y1="50%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#D4D4D8" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {/* Outer Circular Track */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="36" 
                  fill="none" 
                  stroke="rgba(255, 255, 255, 0.12)" 
                  strokeWidth="0.5" 
                  strokeDasharray="2, 2"
                />

                {/* Inner Wave Ring */}
                <circle 
                  cx="50" 
                  cy="50" 
                  r="20" 
                  fill="none" 
                  stroke="rgba(255, 255, 255, 0.06)" 
                  strokeWidth="0.4" 
                />

                {/* Radial Spokes to all 8 circular nodes */}
                {neuralNodes.map((node, i) => {
                  const angle = (i * 360) / neuralNodes.length;
                  const rad = (angle * Math.PI) / 180;
                  const x = 50 + 36 * Math.cos(rad);
                  const y = 50 + 36 * Math.sin(rad);
                  const isSelected = activeNode === i;

                  return (
                    <g key={node.id}>
                      <line
                        x1="50"
                        y1="50"
                        x2={x}
                        y2={y}
                        stroke={isSelected ? 'url(#activeSynapseGrad)' : 'rgba(255, 255, 255, 0.08)'}
                        strokeWidth={isSelected ? '0.9' : '0.3'}
                        strokeDasharray={isSelected ? 'none' : '1.5, 1.5'}
                      />
                      {isSelected && (
                        <circle
                          cx={x}
                          cy={y}
                          r="1.5"
                          fill="#FFFFFF"
                          className="animate-ping opacity-75"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Central Core "LAKSH" */}
              <div className="relative z-20 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-white p-0.5 shadow-2xl flex items-center justify-center shrink-0">
                <div className="w-full h-full rounded-full bg-[#08080A] flex flex-col items-center justify-center p-1.5 text-center">
                  <span className="font-heading font-black text-[11px] sm:text-xs text-white tracking-widest">LAKSH</span>
                  <span className="text-[7px] sm:text-[8px] font-mono-code text-[#86868B]">AI CORE</span>
                </div>
              </div>

              {/* 8 Clean Circular Satellite Badges */}
              {neuralNodes.map((node, i) => {
                const angle = (i * 360) / neuralNodes.length;
                const rad = (angle * Math.PI) / 180;
                const xPct = 50 + 36 * Math.cos(rad);
                const yPct = 50 + 36 * Math.sin(rad);
                const isSelected = activeNode === i;
                const IconComponent = node.icon;

                return (
                  <motion.button
                    key={node.id}
                    onClick={() => setActiveNode(i)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      position: 'absolute',
                      left: `${xPct}%`,
                      top: `${yPct}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-300 z-30 group shadow-xl ${
                      isSelected
                        ? 'bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.6)] scale-110 ring-4 ring-white/30'
                        : 'bg-[#0F0F13] text-[#A1A1AA] border-white/15 hover:border-white/60 hover:text-white hover:bg-white/10'
                    }`}
                    data-cursor="SELECT"
                    title={node.name}
                  >
                    <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`} />
                  </motion.button>
                );
              })}

            </div>

            {/* Quick Skill Indicator Tag below orbit */}
            <div className="mt-4 text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono-code text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Selected: <strong>{active.name}</strong></span>
              </span>
            </div>

          </div>

          {/* Right Column: Node Details Inspector */}
          <div className="lg:col-span-6 glass-card p-6 sm:p-8 rounded-2xl space-y-6">
            
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono-code text-white/80 font-bold uppercase tracking-wider">
                [ NODE_0{active.id + 1} ]
              </span>
              <span className="text-[11px] font-mono-code px-2.5 py-0.5 rounded-full glass-pill text-[#A1A1AA]">
                {active.category}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                {active.name}
              </h3>
              <p className="text-sm text-[#86868B] leading-relaxed font-light">
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
                    className="px-3 py-1 rounded-xl glass-pill text-xs font-mono-code text-[#E5E5EA] flex items-center gap-1.5"
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
