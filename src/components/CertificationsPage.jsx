import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ArrowLeft, ExternalLink, Search, ShieldCheck, CheckCircle2, Copy, Check, Filter } from 'lucide-react';

const LINKEDIN_CERTS_URL = 'https://www.linkedin.com/in/laksh-mahajan-696157329/details/certifications/';

const certificationsData = [
  {
    id: 'anthropic-claude-101',
    title: 'Certificate of completion: Claude 101',
    issuer: 'Anthropic',
    logoText: 'ANTHROPIC',
    date: 'Aug 2026',
    credentialId: 'xepmi2735v44',
    skills: ['Anthropic Claude', 'Prompt Engineering', 'LLM Architectures'],
    category: 'Anthropic',
    domain: 'Generative AI & LLMs',
    accentColor: 'border-l-4 border-l-[#D97706]',
    badgeStyle: 'bg-[#D97706]/10 text-[#D97706] border-[#D97706]/30',
    iconBg: 'bg-[#D97706]/10 text-[#D97706]',
    description: 'Comprehensive certification covering Anthropic Claude model architectures, advanced prompt engineering techniques, API integration strategies, and alignment safety principles.',
  },
  {
    id: 'openai-ai-foundations',
    title: 'AI Foundations',
    issuer: 'OpenAI',
    logoText: 'OPENAI',
    date: 'Aug 2026',
    credentialId: '8mf9prc96o',
    skills: ['ChatGPT', 'AI Basics', 'Generative Workflows', 'Prompt Design'],
    category: 'OpenAI',
    domain: 'Generative AI & LLMs',
    accentColor: 'border-l-4 border-l-[#10B981]',
    badgeStyle: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30',
    iconBg: 'bg-[#10B981]/10 text-[#10B981]',
    description: 'Official OpenAI credential validating foundational expertise in ChatGPT capabilities, generative model mechanics, and practical AI application design.',
  },
  {
    id: 'microsoft-fabric-analytics',
    title: 'Introduction to end-to-end analytics using Microsoft Fabric',
    issuer: 'Microsoft Learning',
    logoText: 'MICROSOFT',
    date: 'Aug 2026',
    skills: ['Microsoft Fabric', 'End-to-End Data Analytics', 'Cloud Analytics', 'Data Lakehouse'],
    category: 'Microsoft',
    domain: 'Analytics & Cloud',
    accentColor: 'border-l-4 border-l-[#0078D4]',
    badgeStyle: 'bg-[#0078D4]/10 text-[#0078D4] border-[#0078D4]/30',
    iconBg: 'bg-[#0078D4]/10 text-[#0078D4]',
    description: 'Microsoft Learning credential covering enterprise analytics architecture, Microsoft Fabric OneLake integration, real-time data engineering, and business intelligence pipelines.',
  },
  {
    id: 'ibm-multiagent-systems',
    title: 'The Rise of Multiagent Systems',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jun 2026',
    skills: ['Multi-Agent Systems', 'Agent Orchestration', 'Autonomous Agents'],
    category: 'IBM',
    domain: 'Agentic & Multi-Agent',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Explores multi-agent system design, inter-agent communication protocols, task decomposition, and cooperative autonomous agent frameworks.',
  },
  {
    id: 'ibm-mastering-bob-agentic',
    title: 'Mastering AI-assisted development with IBM Bob: From spec-driven practices to agentic engineering',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jun 2026',
    skills: ['IBM Bob', 'Agentic Engineering', 'Spec-Driven Development'],
    category: 'IBM',
    domain: 'Agentic & Multi-Agent',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Advanced credential focusing on AI-assisted software engineering, spec-driven code generation, automated debugging pipelines, and autonomous agent integration using IBM Bob.',
  },
  {
    id: 'ibm-unleashing-ai-agents',
    title: 'Unleashing the Power of AI Agents',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jun 2026',
    skills: ['AI Agents', 'Agentic Workflows', 'Autonomous Decision Making'],
    category: 'IBM',
    domain: 'Agentic & Multi-Agent',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Deep dive into autonomous AI agents, tool-augmented LLMs, memory management strategies, and goal-oriented execution loops.',
  },
  {
    id: 'ibm-ai-agents-jul',
    title: 'AI Agents',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jul 2026',
    skills: ['AI Agents', 'Intelligent Systems', 'Cognitive Agents'],
    category: 'IBM',
    domain: 'Agentic & Multi-Agent',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Specialized credential validating practical implementation of goal-driven cognitive agents, environment feedback loops, and automated decision flows.',
  },
  {
    id: 'ibm-make-agentic-ai-work',
    title: 'Make Agentic AI Work for You',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jun 2026',
    skills: ['Agentic AI', 'Productivity Automation', 'AI Integration'],
    category: 'IBM',
    domain: 'Agentic & Multi-Agent',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Applied course on integrating agentic AI into production engineering workflows, automating repetitive development tasks, and orchestrating complex goals.',
  },
  {
    id: 'ibm-rag-intro',
    title: 'Introduction to Retrieval Augmented Generation',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jun 2026',
    skills: ['Retrieval-Augmented Generation (RAG)', 'Vector Search', 'Knowledge Retrieval'],
    category: 'IBM',
    domain: 'Generative AI & LLMs',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Covers RAG architecture, vector database indexing, semantic similarity retrieval, and grounding Large Language Models with external enterprise data.',
  },
  {
    id: 'ibm-llm-intro',
    title: 'Introduction to Large Language Models',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jun 2026',
    skills: ['Large Language Models (LLM)', 'Transformer Architectures', 'NLP'],
    category: 'IBM',
    domain: 'Generative AI & LLMs',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Foundational course on Transformer neural networks, tokenization, pre-training, fine-tuning, and text generation algorithms.',
  },
  {
    id: 'ibm-virtual-agents-watsonx',
    title: 'Introduction to Intelligent Virtual Agents (IVAs) with IBM watsonx Assistant',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jul 2026',
    skills: ['IBM watsonx Assistant', 'Virtual Agents', 'Conversational AI'],
    category: 'IBM',
    domain: 'Agentic & Multi-Agent',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Building enterprise intelligent virtual agents using IBM watsonx Assistant, intent recognition, dialog flow design, and backend API actions.',
  },
  {
    id: 'ibm-foundations-genai',
    title: 'Foundations in Generative AI',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jun 2026',
    skills: ['Generative AI', 'Foundation Models', 'Prompting'],
    category: 'IBM',
    domain: 'Generative AI & LLMs',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Comprehensive grounding in foundation models, diffusion models, generative adversarial networks (GANs), and generative AI capabilities.',
  },
  {
    id: 'ibm-intro-genai',
    title: 'Introduction to Generative AI',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jun 2026',
    skills: ['Generative AI', 'Deep Learning Basics', 'AI Concepts'],
    category: 'IBM',
    domain: 'Generative AI & LLMs',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Introductory IBM module explaining core generative AI principles, machine learning paradigms, and industry applications.',
  },
  {
    id: 'ibm-getting-started-genai',
    title: 'Getting Started with Generative AI',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jun 2026',
    skills: ['Generative AI', 'Practical AI Application', 'AI Strategy'],
    category: 'IBM',
    domain: 'Generative AI & LLMs',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Hands-on framework for applying generative AI tools, prompt design patterns, and AI-driven content generation in software projects.',
  },
  {
    id: 'ibm-ethics-genai',
    title: 'Ethical Considerations for Generative AI',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jun 2026',
    skills: ['AI Ethics', 'Responsible AI', 'Bias & Safety'],
    category: 'IBM',
    domain: 'Generative AI & LLMs',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Covers AI governance, algorithmic bias detection, transparency frameworks, copyright guidelines, and ethical deployment of AI models.',
  },
  {
    id: 'ibm-aicte-skillsbuild-internship',
    title: 'AICTE | IBM SkillsBuild AI Automation & Intelligent Solutions Internship | BharatCares',
    issuer: 'IBM / BharatCares / AICTE',
    logoText: 'IBM / BHARATCARES',
    date: 'Jul 2026',
    skills: ['AI Basics', 'Automation', 'Intelligent Solutions', 'Industry Internship'],
    category: 'IBM',
    domain: 'Analytics & Cloud',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Official government-backed AICTE and IBM SkillsBuild internship program focused on AI automation, intelligent software solutions, and social impact projects with BharatCares.',
  },
  {
    id: 'ibm-bob-troubleshoot-lab',
    title: 'Lab: Troubleshoot Your Code Using IBM Bob',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jul 2026',
    skills: ['IBM Bob Debugging', 'Code Troubleshooting', 'AI Code Assistants'],
    category: 'IBM',
    domain: 'Agentic & Multi-Agent',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Hands-on practical lab applying IBM Bob AI assistant to diagnose runtime errors, fix code bugs, optimize logic, and execute automated unit test passes.',
  },
  {
    id: 'ibm-world-youth-skills-day',
    title: 'World Youth Skills Day 2026: Skills for a Shared Future | BharatCares',
    issuer: 'IBM / BharatCares',
    logoText: 'IBM / BHARATCARES',
    date: 'Jul 2026',
    skills: ['Youth Skills', 'Future Readiness', 'Digital Empowerment'],
    category: 'IBM',
    domain: 'Analytics & Cloud',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Global skill development program hosted by IBM SkillsBuild and BharatCares, focusing on future-ready digital competencies, technology leadership, and social innovation.',
  },
  {
    id: 'ibm-resume-writing-ai',
    title: 'Improve your resume writing with AI',
    issuer: 'IBM',
    logoText: 'IBM',
    date: 'Jul 2026',
    skills: ['AI Resume Engineering', 'Career Communication', 'AI Productivity'],
    category: 'IBM',
    domain: 'Generative AI & LLMs',
    accentColor: 'border-l-4 border-l-[#0F62FE]',
    badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
    iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    description: 'Practical training on leveraging generative AI tools to structure executive engineering resumes, showcase technical impact, and optimize keywords.',
  },
];

export default function CertificationsPage({ onBack }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDomain, setSelectedDomain] = useState('All Domains');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const categoriesList = ['All', 'Anthropic', 'OpenAI', 'IBM', 'Microsoft'];
  const domainList = ['All Domains', 'Agentic & Multi-Agent', 'Generative AI & LLMs', 'Analytics & Cloud'];

  const filteredCerts = certificationsData.filter((cert) => {
    const matchesCategory = selectedCategory === 'All' || cert.category === selectedCategory;
    const matchesDomain = selectedDomain === 'All Domains' || cert.domain === selectedDomain;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.credentialId && cert.credentialId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesDomain && matchesSearch;
  });

  const copyToClipboard = (idText) => {
    navigator.clipboard.writeText(idText);
    setCopiedId(idText);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#141414] font-sans pt-24 pb-28">
      
      {/* Page Intro Transition Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#141414] text-[#F8F7F4] flex flex-col items-center justify-center p-6 text-center select-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <span className="text-xs font-mono-code font-bold tracking-[0.25em] text-[#2B4C7E] uppercase block">
                VERIFIED CREDENTIALS VAULT
              </span>
              <h1 className="font-heading text-5xl sm:text-7xl font-medium tracking-tight text-[#F8F7F4]">
                Laksh Mahajan <span className="italic text-[#2B4C7E]">— Certifications</span>
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
            className="inline-flex items-center gap-2 text-xs font-mono-code text-[#5C5C5C] hover:text-[#141414] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>
        </div>

        {/* Hero Banner for Certifications Vault */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#141414] via-[#1A1918] to-[#0F0E0D] text-[#F8F7F4] p-8 sm:p-14 mb-14 shadow-2xl border border-[#2B4C7E]/40"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2B4C7E]/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF]/10 border border-[#FFFFFF]/20 text-[#D6C6A5] text-xs font-mono-code font-semibold tracking-wide uppercase">
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                <span>OFFICIAL LINKEDIN VERIFIED CREDENTIALS</span>
              </div>

              <h1 className="font-heading text-6xl sm:text-8xl font-medium tracking-tight text-[#FFFFFF] leading-none">
                Certifications Vault
              </h1>

              <p className="text-xl sm:text-2xl font-medium text-[#D6C6A5] tracking-wide font-heading italic">
                Agentic AI • Generative AI • Large Language Models • Cloud Analytics
              </p>

              <p className="text-base sm:text-lg text-[#A7A7A7] leading-relaxed max-w-2xl font-light">
                Explore 19 verified professional licenses and industry certifications from <strong className="text-[#F8F7F4]">Anthropic</strong>, <strong className="text-[#F8F7F4]">OpenAI</strong>, <strong className="text-[#F8F7F4]">IBM</strong>, and <strong className="text-[#F8F7F4]">Microsoft Learning</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={LINKEDIN_CERTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-mono-code font-bold flex items-center gap-2 transition-all shadow-xl hover:scale-105"
                >
                  <span>Verify All Licenses on LinkedIn</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={onBack}
                  className="px-7 py-3.5 rounded-full bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 text-[#F8F7F4] border border-[#FFFFFF]/20 text-xs font-mono-code font-bold flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Switch to Portfolio</span>
                </button>
              </div>
            </div>

            {/* Right Decorative Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="p-6 rounded-2xl bg-[#FFFFFF]/5 border border-[#FFFFFF]/15 backdrop-blur-md space-y-4 w-full max-w-xs text-xs font-mono-code">
                <div className="flex items-center gap-2 text-[#D6C6A5]">
                  <Award className="w-5 h-5" />
                  <span className="font-bold">VERIFIED LINKEDIN REPOSITORY</span>
                </div>
                <p className="text-[#A7A7A7] leading-relaxed">
                  All licenses match official LinkedIn credentials with active IDs, demonstrated skills, and course specifications.
                </p>
                <a
                  href={LINKEDIN_CERTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pt-2 border-t border-[#FFFFFF]/10 text-[11px] text-[#10B981] font-bold flex items-center justify-between hover:underline"
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>LinkedIn Authenticated</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Filter Controls Bar */}
        <div className="space-y-4 mb-10">
          
          {/* Top Row: Search + Category Tabs */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-xs">
            
            {/* Issuer Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {categoriesList.map((cat) => {
                const count = cat === 'All' ? certificationsData.length : certificationsData.filter((c) => c.category === cat).length;
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-mono-code font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#141414] text-[#F8F7F4] shadow-xs'
                        : 'bg-[#F8F7F4] text-[#5C5C5C] hover:bg-[#E5E2DC] hover:text-[#141414]'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Instant Search Bar */}
            <div className="relative min-w-[260px] md:min-w-[300px]">
              <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search certs (e.g. Agent, Claude, RAG, xepmi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] text-xs font-mono-code text-[#141414] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E] transition-all"
              />
            </div>

          </div>

          {/* Bottom Row: Domain Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 px-2">
            <span className="text-xs font-mono-code font-bold text-[#5C5C5C] mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Domain:</span>
            </span>
            {domainList.map((domain) => {
              const isActive = selectedDomain === domain;
              return (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-3 py-1 rounded-full text-xs font-mono-code font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2B4C7E] text-white shadow-xs'
                      : 'bg-[#FFFFFF] border border-[#E5E2DC] text-[#5C5C5C] hover:border-[#2B4C7E]'
                  }`}
                >
                  {domain}
                </button>
              );
            })}
          </div>

        </div>

        {/* Certifications Cards Grid */}
        {filteredCerts.length === 0 ? (
          <div className="p-16 rounded-3xl bg-[#FFFFFF] border border-[#E5E2DC] text-center space-y-3">
            <Award className="w-12 h-12 text-[#888888] mx-auto" />
            <h3 className="font-heading text-2xl font-bold text-[#141414]">No Credentials Found</h3>
            <p className="text-sm font-mono-code text-[#5C5C5C]">
              No certifications matched your filter "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedDomain('All Domains');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full bg-[#141414] text-[#F8F7F4] text-xs font-mono-code font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-7 rounded-3xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group ${cert.accentColor}`}
              >
                <div>
                  {/* Top Header: Brand Tag + Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-mono-code font-bold px-3 py-1 rounded-full border ${cert.badgeStyle}`}>
                      {cert.logoText}
                    </span>
                    <span className="text-xs font-mono-code text-[#888888]">
                      Issued {cert.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedCert(cert)}
                    className="font-heading text-xl font-bold text-[#141414] leading-snug mb-3 group-hover:text-[#2B4C7E] transition-colors cursor-pointer"
                  >
                    {cert.title}
                  </h3>

                  {/* Issuer & Domain */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono-code text-[#5C5C5C] mb-4">
                    <span>Issuer: <strong className="text-[#141414]">{cert.issuer}</strong></span>
                    <span>•</span>
                    <span className="text-[#2B4C7E] font-medium">{cert.domain}</span>
                  </div>

                  {/* Description preview */}
                  <p className="text-xs sm:text-sm text-[#5C5C5C] leading-relaxed mb-4 line-clamp-2 font-normal">
                    {cert.description}
                  </p>

                  {/* Credential ID section */}
                  {cert.credentialId && (
                    <div className="mb-4 p-3 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] text-xs font-mono-code flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-[10px] text-[#888888] uppercase block">Credential ID</span>
                        <strong className="text-[#141414] font-bold block">{cert.credentialId}</strong>
                      </div>
                      <button
                        onClick={() => copyToClipboard(cert.credentialId)}
                        className="p-1.5 rounded-lg bg-white border border-[#E5E2DC] text-[#5C5C5C] hover:text-[#141414] hover:border-[#141414] transition-all cursor-pointer flex items-center gap-1 text-[11px]"
                      >
                        {copiedId === cert.credentialId ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#10B981]" />
                            <span className="text-[#10B981]">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Skills tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mb-6">
                      <span className="text-[10px] font-mono-code font-bold text-[#888888] uppercase tracking-wider block mb-2">
                        SKILLS DEMONSTRATED
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-md bg-[#F8F7F4] border border-[#E5E2DC] text-[11px] font-mono-code text-[#141414] font-medium"
                          >
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Footer: Verify on LinkedIn Button */}
                <div className="pt-4 border-t border-[#E5E2DC] flex items-center justify-between gap-3 text-xs font-mono-code">
                  <span className="flex items-center gap-1.5 text-[#3E6B48] font-bold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>

                  <a
                    href={LINKEDIN_CERTS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white text-[11px] font-mono-code font-bold flex items-center gap-1.5 transition-all shadow-xs hover:scale-105"
                  >
                    <span>Verify on LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Detailed Credential Specification Modal */}
        <AnimatePresence>
          {selectedCert && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 16 }}
                className="bg-[#FFFFFF] border border-[#E5E2DC] rounded-3xl max-w-2xl w-full p-8 shadow-2xl relative overflow-hidden"
              >
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-[#F8F7F4] border border-[#E5E2DC] text-[#141414] hover:bg-[#E5E2DC] transition-colors cursor-pointer"
                >
                  ✕
                </button>

                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-mono-code font-bold px-3 py-1 rounded-full border ${selectedCert.badgeStyle}`}>
                      {selectedCert.logoText}
                    </span>
                    <span className="text-xs font-mono-code text-[#888888]">
                      Issued {selectedCert.date}
                    </span>
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#141414]">
                    {selectedCert.title}
                  </h3>

                  <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#E5E2DC] space-y-2 text-xs font-mono-code">
                    <div className="flex justify-between">
                      <span className="text-[#5C5C5C]">Issuing Organization:</span>
                      <strong className="text-[#141414]">{selectedCert.issuer}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5C5C5C]">Domain Focus:</span>
                      <strong className="text-[#2B4C7E]">{selectedCert.domain}</strong>
                    </div>
                    {selectedCert.credentialId && (
                      <div className="flex justify-between items-center pt-2 border-t border-[#E5E2DC]">
                        <span className="text-[#5C5C5C]">Credential ID:</span>
                        <strong className="text-[#141414] font-bold">{selectedCert.credentialId}</strong>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#141414]">
                      Course Description & Competency Scope:
                    </h4>
                    <p className="text-sm text-[#4A4A4A] leading-relaxed">
                      {selectedCert.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#141414]">
                      Demonstrated Skill Badges:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1.5 rounded-lg bg-[#F8F7F4] border border-[#E5E2DC] text-xs font-mono-code text-[#141414] font-medium"
                        >
                          ✓ {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E5E2DC] flex items-center justify-between gap-4">
                    <a
                      href={LINKEDIN_CERTS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 rounded-full bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-mono-code font-bold flex items-center gap-2 transition-all shadow-md"
                    >
                      <span>Verify on LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => setSelectedCert(null)}
                      className="px-6 py-2.5 rounded-full bg-[#141414] text-[#F8F7F4] text-xs font-mono-code font-bold cursor-pointer hover:bg-[#2B4C7E] transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
