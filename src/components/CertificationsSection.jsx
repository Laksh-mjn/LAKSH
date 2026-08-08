import React, { useState } from 'react';
import { Award, CheckCircle2, ExternalLink, Search, Sparkles, ShieldCheck, Tag } from 'lucide-react';

export default function CertificationsSection() {
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
      accentColor: 'border-l-4 border-l-[#D97706]',
      badgeStyle: 'bg-[#D97706]/10 text-[#D97706] border-[#D97706]/30',
      iconBg: 'bg-[#D97706]/10 text-[#D97706]',
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
      accentColor: 'border-l-4 border-l-[#10B981]',
      badgeStyle: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30',
      iconBg: 'bg-[#10B981]/10 text-[#10B981]',
    },
    {
      id: 'microsoft-fabric-analytics',
      title: 'Introduction to end-to-end analytics using Microsoft Fabric',
      issuer: 'Microsoft Learning',
      logoText: 'MICROSOFT',
      date: 'Aug 2026',
      skills: ['Microsoft Fabric', 'End-to-End Data Analytics', 'Cloud Analytics'],
      category: 'Microsoft',
      accentColor: 'border-l-4 border-l-[#0078D4]',
      badgeStyle: 'bg-[#0078D4]/10 text-[#0078D4] border-[#0078D4]/30',
      iconBg: 'bg-[#0078D4]/10 text-[#0078D4]',
    },
    {
      id: 'ibm-multiagent-systems',
      title: 'The Rise of Multiagent Systems',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['Multi-Agent Systems', 'Agent Orchestration', 'Autonomous Agents'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-mastering-bob-agentic',
      title: 'Mastering AI-assisted development with IBM Bob: From spec-driven practices to agentic engineering',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['IBM Bob', 'Agentic Engineering', 'Spec-Driven Development'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-unleashing-ai-agents',
      title: 'Unleashing the Power of AI Agents',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['AI Agents', 'Agentic Workflows', 'Autonomous Decision Making'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-ai-agents-jul',
      title: 'AI Agents',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jul 2026',
      skills: ['AI Agents', 'Intelligent Systems', 'Cognitive Agents'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-make-agentic-ai-work',
      title: 'Make Agentic AI Work for You',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['Agentic AI', 'Productivity Automation', 'AI Integration'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-rag-intro',
      title: 'Introduction to Retrieval Augmented Generation',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['Retrieval-Augmented Generation (RAG)', 'Vector Search', 'Knowledge Retrieval'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-llm-intro',
      title: 'Introduction to Large Language Models',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['Large Language Models (LLM)', 'Transformer Architectures', 'NLP'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-virtual-agents-watsonx',
      title: 'Introduction to Intelligent Virtual Agents (IVAs) with IBM watsonx Assistant',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jul 2026',
      skills: ['IBM watsonx Assistant', 'Virtual Agents', 'Conversational AI'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-foundations-genai',
      title: 'Foundations in Generative AI',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['Generative AI', 'Foundation Models', 'Prompting'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-intro-genai',
      title: 'Introduction to Generative AI',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['Generative AI', 'Deep Learning Basics', 'AI Concepts'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-getting-started-genai',
      title: 'Getting Started with Generative AI',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['Generative AI', 'Practical AI Application', 'AI Strategy'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-ethics-genai',
      title: 'Ethical Considerations for Generative AI',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jun 2026',
      skills: ['AI Ethics', 'Responsible AI', 'Bias & Safety'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-aicte-skillsbuild-internship',
      title: 'AICTE | IBM SkillsBuild AI Automation & Intelligent Solutions Internship | BharatCares',
      issuer: 'IBM / BharatCares / AICTE',
      logoText: 'IBM / BHARATCARES',
      date: 'Jul 2026',
      skills: ['AI Basics', 'Automation', 'Intelligent Solutions', 'Industry Internship'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-bob-troubleshoot-lab',
      title: 'Lab: Troubleshoot Your Code Using IBM Bob',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jul 2026',
      skills: ['IBM Bob Debugging', 'Code Troubleshooting', 'AI Code Assistants'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-world-youth-skills-day',
      title: 'World Youth Skills Day 2026: Skills for a Shared Future | BharatCares',
      issuer: 'IBM / BharatCares',
      logoText: 'IBM / BHARATCARES',
      date: 'Jul 2026',
      skills: ['Youth Skills', 'Future Readiness', 'Digital Empowerment'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
    },
    {
      id: 'ibm-resume-writing-ai',
      title: 'Improve your resume writing with AI',
      issuer: 'IBM',
      logoText: 'IBM',
      date: 'Jul 2026',
      skills: ['AI Resume Engineering', 'Career Communication', 'AI Productivity'],
      category: 'IBM',
      accentColor: 'border-l-4 border-l-[#0F62FE]',
      badgeStyle: 'bg-[#0F62FE]/10 text-[#0F62FE] border-[#0F62FE]/30',
      iconBg: 'bg-[#0F62FE]/10 text-[#0F62FE]',
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
    <section id="certifications" className="py-24 bg-[#F8F7F4] border-b border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-12">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#2B4C7E] uppercase block mb-3">
            VERIFIED CREDENTIALS & LICENSES ({certifications.length})
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-[#141414] tracking-tight mb-4">
            Certifications & Professional Licenses
          </h2>
          <p className="text-base sm:text-lg text-[#5C5C5C] leading-relaxed font-normal">
            Verified LinkedIn certifications in Agentic Engineering, Multi-Agent Systems, Generative AI, Retrieval-Augmented Generation (RAG), and Cloud Analytics from global technology leaders including Anthropic, OpenAI, IBM, and Microsoft.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 p-4 rounded-2xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-xs">
          
          {/* Issuer Tabs */}
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
                      ? 'bg-[#141414] text-[#F8F7F4] shadow-xs'
                      : 'bg-[#F8F7F4] text-[#5C5C5C] hover:bg-[#E5E2DC] hover:text-[#141414]'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] md:min-w-[280px]">
            <Search className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search certs (e.g. Agent, RAG, Claude)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] text-xs font-mono-code text-[#141414] focus:outline-none focus:ring-2 focus:ring-[#2B4C7E] transition-all"
            />
          </div>

        </div>

        {/* Certifications Grid */}
        {filteredCertifications.length === 0 ? (
          <div className="p-12 rounded-3xl bg-[#FFFFFF] border border-[#E5E2DC] text-center text-[#5C5C5C] font-mono-code text-sm">
            No certifications found matching "{searchQuery}".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertifications.map((cert) => (
              <div
                key={cert.id}
                className={`p-7 rounded-3xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-sm hover:shadow-md transition-all flex flex-col justify-between ${cert.accentColor}`}
              >
                <div>
                  {/* Top Issuer Badge & Date */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono-code font-bold px-2.5 py-1 rounded-full border ${cert.badgeStyle}`}>
                      {cert.logoText}
                    </span>
                    <span className="text-xs font-mono-code text-[#888888]">
                      Issued {cert.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-[#141414] leading-snug mb-3">
                    {cert.title}
                  </h3>

                  {/* Issuer */}
                  <p className="text-xs font-mono-code text-[#5C5C5C] font-semibold mb-4">
                    Issuer: <span className="text-[#141414]">{cert.issuer}</span>
                  </p>

                  {/* Credential ID */}
                  {cert.credentialId && (
                    <div className="mb-4 p-2.5 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] text-[11px] font-mono-code text-[#5C5C5C] flex items-center justify-between">
                      <span>Credential ID:</span>
                      <strong className="text-[#141414] font-bold">{cert.credentialId}</strong>
                    </div>
                  )}

                  {/* Skills Tags */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="mb-4">
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

                {/* Footer Credential Verification Link */}
                <div className="pt-4 border-t border-[#E5E2DC] flex items-center justify-between text-xs font-mono-code">
                  <span className="flex items-center gap-1.5 text-[#3E6B48] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified License</span>
                  </span>
                  
                  <span className="text-[#2B4C7E] flex items-center gap-1 font-semibold group-hover:underline">
                    <span>Show Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
