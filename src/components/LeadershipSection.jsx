import React from 'react';
import { Award, HeartHandshake, Users, CheckCircle2 } from 'lucide-react';

export default function LeadershipSection() {
  const organizations = [
    {
      title: 'President',
      org: 'Youth On Beat Organisation',
      impact: 'EXECUTIVE EVENT DIRECTION & TALENT MENTORSHIP',
      desc: 'An organization created to support emerging young artists by providing them a professional platform to perform successfully and build confidence in dancing, modeling, and singing.',
      highlights: [
        'Mentored 300+ students to achieve their potential in performing arts.',
        'Directed major events across Delhi, Chandigarh, Ludhiana, Jalandhar, Jhansi, Himachal Pradesh, and Ayodhya.',
        'Secured corporate sponsorships and resource allocation to empower youth talent.',
        'Organized and executed multi-city talent platforms and cultural festivals.'
      ],
      skills: ['300+ Students Mentored', 'Multi-State Event Direction', 'Sponsorship Procurement', 'Youth Empowerment'],
      icon: Award,
    },
    {
      title: 'District Vice President',
      org: 'Betiya Foundation (National NGO)',
      impact: 'WOMEN EMPOWERMENT & COMMUNITY WELFARE',
      desc: 'Supervising district operations for a national NGO dedicated to women empowerment, healthcare access, and community support for underprivileged individuals.',
      highlights: [
        'Distributed sewing machines empowering women to build small-scale enterprises and gain financial independence.',
        'Provided domestic equipment and disability accessibility support for underprivileged families.',
        'Spearheaded healthcare hygiene drives, introducing and distributing free sanitary supplies.',
        'Managed district volunteer teams and community outreach programs.'
      ],
      skills: ['Women Empowerment', 'Small-Scale Enterprise Setup', 'Accessibility Aid', 'Community Health Drives'],
      icon: HeartHandshake,
    },
  ];

  const leadershipSkills = [
    'Executive Team Leadership & Delegation',
    'Event Planning, Logistics & Budget Management',
    'Youth Mentorship & Talent Development (300+ Artists)',
    'Multi-State Event Execution & Public Relations',
    'Community Welfare & NGO Outreach Operations',
    'Sponsorship Procurement & Resource Allocation',
  ];

  return (
    <section id="leadership" className="py-28 bg-[#08080A]/60 backdrop-blur-md border-b border-white/[0.06] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono-code font-medium tracking-widest text-[#86868B] uppercase block">
            EXECUTIVE ORGANIZATIONS & LEADERSHIP IMPACT
          </span>
          <h2 className="font-heading text-4xl sm:text-6xl font-bold text-[#F5F5F7] tracking-tight">
            Leadership & Community Impact
          </h2>
          <p className="text-base sm:text-lg text-[#86868B] font-light">
            Executive leadership roles guiding non-profit initiatives, youth mentorship, and multi-state cultural events.
          </p>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {organizations.map((org) => {
            const IconComp = org.icon;
            return (
              <div
                key={org.title}
                className="rounded-3xl p-8 sm:p-10 bg-[#0F0F12]/90 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-8 group hairline-border hover:border-white/30 transition-all duration-300"
              >
                <div className="space-y-6">
                  {/* Top Role Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3.5 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider bg-white text-black">
                      {org.impact}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-white">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Org */}
                  <div className="space-y-1">
                    <h3 className="font-heading text-3xl font-bold text-[#F5F5F7] tracking-tight">
                      {org.title}
                    </h3>
                    <p className="text-sm font-mono-code text-[#A1A1AA] font-semibold">
                      {org.org}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#86868B] leading-relaxed font-light">
                    {org.desc}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-2.5 pt-2">
                    <span className="text-[11px] font-mono-code text-[#A1A1AA] uppercase tracking-wider block font-semibold">
                      Key Responsibilities & Outcomes:
                    </span>
                    <div className="space-y-2">
                      {org.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-[#D4D4D8] leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills Tags */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                  {org.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#A1A1AA] text-[11px] font-mono-code"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Executive Capabilities Matrix */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0F0F12]/80 border border-white/10 backdrop-blur-xl shadow-xl space-y-6 hairline-border">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-white" />
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#F5F5F7]">
              Core Executive & Management Competencies
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leadershipSkills.map((skill, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-[#08080A] border border-white/10 flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-white" />
                <span className="text-xs font-mono-code text-[#D4D4D8]">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
