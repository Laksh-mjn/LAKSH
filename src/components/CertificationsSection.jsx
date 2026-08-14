import React, { useState } from 'react';
import { CheckCircle2, ExternalLink, Search, ShieldCheck } from 'lucide-react';

export default function CertificationsSection({ onOpenFullVault }) {
  const [selectedIssuer, setSelectedIssuer] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const certifications = [
    {
      id: 'anthropic-claude-101',
      title: 'Certificate of completion: Claude 101',
      issuer: 'Anthropic',
      logoText: 'ANTHROPIC',
      date: 'Aug 2026',
      credentialId: 'xepmi2735v44',
      skills: ['Anthropic Claude', 'Prompt Engineering', 'LLM Architectures'],
      category: 'Anthropic',
      accentColor: 'border-l-4 border-l-[#FFD700]',
      badgeStyle: 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]/40',
    },
    {
      id: 'openai-ai-foundations',
      title: 'AI Foundations',
      issuer: 'OpenAI',
      logoText: 'OPENAI',
      date: 'Aug 2026',
      credentialId: '8mf9prc96o',
      skills: ['ChatGPT', 'AI Basics', 'Generative Workflows'],
      category: 'OpenAI',
      accentColor: 'border-l-4 border-l-[#00FF9D]',
      badgeStyle: 'bg-[#00FF9D]/10 text-[#00FF9D] border-[#00FF9D]/40',
    },
    {
      id: 'microsoft-fabric-analytics',
      title: 'Introduction to end-to-end analytics using Microsoft Fabric',
      issuer: 'Microsoft Learning',
      logoText: 'MICROSOFT',
      date: 'Aug 2026',
      skills: ['Microsoft Fabric', 'End-to-End Data Analytics', 'Cloud Analytics'],
      category: 'Microsoft',
      accentColor: 'border-l-4 border-l-[#00F0FF]',
      badgeStyle: 'bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/40',
    },
    {
      id: 'ibm-multiagent-systems',
      title: 'The Rise of Multiagent Systems',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['Multi-Agent Systems', 'Agent Orchestration', 'Autonomous Agents'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#8A2BE2]',
      badgeStyle: 'bg-[#8A2BE2]/10 text-[#C084FC] border-[#8A2BE2]/40',
    },
    {
      id: 'ibm-mastering-bob-agentic',
      title: 'Mastering AI-assisted development with IBM Bob: From spec-driven practices to agentic engineering',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['IBM Bob', 'Agentic Engineering', 'Spec-Driven Development'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#8A2BE2]',
      badgeStyle: 'bg-[#8A2BE2]/10 text-[#C084FC] border-[#8A2BE2]/40',
    },
    {
      id: 'ibm-unleashing-ai-agents',
      title: 'Unleashing the Power of AI Agents',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['AI Agents', 'Agentic Workflows', 'Autonomous Decision Making'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#8A2BE2]',
      badgeStyle: 'bg-[#8A2BE2]/10 text-[#C084FC] border-[#8A2BE2]/40',
    },
    {
      id: 'ibm-rag-intro',
      title: 'Introduction to Retrieval Augmented Generation',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['Retrieval-Augmented Generation (RAG)', 'Vector Search', 'Knowledge Retrieval'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#8A2BE2]',
      badgeStyle: 'bg-[#8A2BE2]/10 text-[#C084FC] border-[#8A2BE2]/40',
    },
    {
      id: 'ibm-llm-intro',
      title: 'Introduction to Large Language Models',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['Large Language Models (LLM)', 'Transformer Architectures', 'NLP'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#8A2BE2]',
      badgeStyle: 'bg-[#8A2BE2]/10 text-[#C084FC] border-[#8A2BE2]/40',
    },
    {
      id: 'ibm-foundations-genai',
      title: 'Foundations in Generative AI',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['Generative AI', 'Foundation Models', 'Prompting'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#8A2BE2]',
      badgeStyle: 'bg-[#8A2BE2]/10 text-[#C084FC] border-[#8A2BE2]/40',
    },
  ];

  const categoriesList = ['All', 'Anthropic', 'OpenAI', 'IBM', 'Microsoft'];

  const filteredCertifications = certifications.filter((cert) => {
    const matchesIssuer = selectedIssuer === 'All' || cert.category === selectedIssuer;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesIssuer && matchesSearch;
  });

  return (
    <section id="certifications" className="py-28 bg-[#05060A] border-b border-[#00F0FF]/15 relative overflow-hidden scanline">
      
      {/* Grid background */}
      <div className="absolute inset-0 cyber-grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-4xl">
            <span className="text-xs font-mono-code font-bold tracking-widest text-[#00F0FF] uppercase block mb-3">
              VERIFIED CREDENTIALS & LICENSES (19 TOTAL)
            </span>
            <h2 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#F0F4FF] tracking-tight">
              Certifications & Credentials
            </h2>
            <p className="text-base sm:text-lg text-[#8A99AD] mt-2 font-light">
              Verified certifications in Agentic Engineering, Multi-Agent Systems, Generative AI, RAG, and Cloud Analytics from Anthropic, OpenAI, IBM, and Microsoft.
            </p>
          </div>

          {onOpenFullVault && (
            <button
              onClick={onOpenFullVault}
              className="px-8 py-4 rounded-full bg-[#00F0FF] text-black font-mono-code font-bold text-xs uppercase tracking-wider flex items-center gap-3 transition-all hover:bg-white hover:scale-105 shadow-[0_0_20px_#00F0FF] shrink-0 cursor-pointer"
              data-cursor="VAULT"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Explore All 19 Credentials ↗</span>
            </button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl glass-panel shadow-2xl backdrop-blur-2xl">
          
          <div className="flex flex-wrap items-center gap-2">
            {categoriesList.map((cat) => {
              const count = cat === 'All' ? certifications.length : certifications.filter((c) => c.category === cat).length;
              const isActive = selectedIssuer === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedIssuer(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono-code font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-black shadow-lg'
                      : 'glass-pill text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-[#8A99AD] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search certs (e.g. Claude, RAG)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs font-mono-code text-[#F0F4FF] focus:outline-none focus:border-white/40 transition-all"
            />
          </div>

        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertifications.map((cert) => (
            <div
              key={cert.id}
              className={`p-7 rounded-3xl glass-card hover:border-white/40 transition-all flex flex-col justify-between space-y-6 ${cert.accentColor}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-mono-code font-bold px-2.5 py-1 rounded-full border ${cert.badgeStyle}`}>
                    {cert.logoText}
                  </span>
                  <span className="text-xs font-mono-code text-[#8A99AD]">
                    {cert.date}
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-[#F0F4FF] leading-snug mb-3">
                  {cert.title}
                </h3>

                <p className="text-xs font-mono-code text-[#8A99AD] font-semibold mb-4">
                  Issuer: <span className="text-[#00F0FF]">{cert.issuer}</span>
                </p>

                {cert.credentialId && (
                  <div className="mb-4 p-2.5 rounded-xl bg-[#05060A] border border-white/10 text-[11px] font-mono-code text-[#8A99AD] flex items-center justify-between">
                    <span>Credential ID:</span>
                    <strong className="text-[#FFD700]">{cert.credentialId}</strong>
                  </div>
                )}

                {cert.skills && (
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="px-2.5 py-1 rounded-md bg-[#05060A] border border-[#00F0FF]/20 text-[11px] font-mono-code text-[#D0D9EA]">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-code">
                <span className="flex items-center gap-1.5 text-[#00FF9D] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified License</span>
                </span>
                <span className="text-[#00F0FF] flex items-center gap-1 font-semibold">
                  <span>Show Credential</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
