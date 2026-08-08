import React from 'react';
import { Award, HeartHandshake, Users, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LeadershipSection() {
  const organizations = [
    {
      title: 'President',
      org: 'Youth On Beat Organisation',
      impact: 'EXECUTIVE EVENT DIRECTION & TALENT MENTORSHIP',
      desc: 'An organization created to support young emerging artists regardless of caste, color, or race by providing them a professional stage to perform successfully and build confidence in dancing, modeling, and singing.',
      highlights: [
        'Mentored 300+ students to achieve their dreams in dancing, modeling, and singing.',
        'Provided performance opportunities across states & major cities: Delhi, Chandigarh, Ludhiana, Jalandhar, Jhansi, Himachal Pradesh, and Ayodhya.',
        'Secured sponsorships and resources to empower young talent with equal opportunity.',
        'Organized and executed multi-city talent platforms and cultural festivals.'
      ],
      skills: ['300+ Students Mentored', 'Multi-State Event Direction', 'Sponsorship Procurement', 'Youth Empowerment'],
      icon: Award,
    },
    {
      title: 'District Vice President',
      org: 'Betiya Foundation (National NGO)',
      impact: 'WOMEN EMPOWERMENT & COMMUNITY WELFARE',
      desc: 'Supervising district operations for a national NGO dedicated to women empowerment, safety, community health, and supporting underprivileged and handicapped individuals.',
      highlights: [
        'Distributed sewing machines to empower women to set up small-scale businesses and achieve financial independence.',
        'Provided gas stoves to needy families and handicap accessibility equipment (English seats & mobility aids).',
        'Spearheaded girl-child hygiene drives, introducing and distributing free sanitary pads.',
        'Managed district volunteer teams and community outreach programs.'
      ],
      skills: ['Women Empowerment', 'Small-Scale Business Setup', 'Accessibility Aid', 'Free Sanitary Pad Distribution'],
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
    <section id="leadership" className="py-24 bg-[#F8F7F4] border-b border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-14">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#3E6B48] uppercase block mb-3">
            EXECUTIVE ORGANIZATIONS & LEADERSHIP IMPACT
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-[#141414] tracking-tight mb-4">
            Organizations Led & Leadership Skills
          </h2>
          
          <p className="text-lg text-[#4A4A4A] leading-relaxed font-normal bg-[#FFFFFF] p-6 sm:p-8 rounded-2xl border border-[#E5E2DC] shadow-xs">
            I bring hands-on executive leadership and social impact experience. As <strong className="text-[#141414]">President of Youth On Beat Organisation</strong>, I have mentored 300+ young artists across multiple states to perform and excel. As <strong className="text-[#141414]">District Vice President of Betiya Foundation</strong>, I lead national NGO initiatives focused on women empowerment, small-business setup, accessibility aid, and girl-child hygiene.
          </p>
        </div>

        {/* Organizations Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {organizations.map((item) => {
            const IconComp = item.icon;
            return (
              <div
                key={item.org}
                className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono-code font-bold px-3 py-1 rounded-full bg-[#3E6B48]/10 text-[#3E6B48] border border-[#3E6B48]/20">
                      {item.impact}
                    </span>
                    <div className="p-3 rounded-xl bg-[#3E6B48]/10 text-[#3E6B48]">
                      <IconComp className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-heading text-3xl sm:text-4xl font-bold text-[#141414] mb-1">
                    {item.title}
                  </h3>

                  <p className="text-base font-mono-code text-[#3E6B48] font-bold mb-4">
                    {item.org}
                  </p>

                  <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed mb-6 font-normal">
                    {item.desc}
                  </p>

                  {/* Bulleted Highlights */}
                  <div className="mb-6 space-y-2.5">
                    <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#141414] mb-3">
                      Key Initiatives & Impact Highlights:
                    </h4>
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5C5C5C] leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E5E2DC] flex flex-wrap gap-2">
                  {item.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded bg-[#F8F7F4] border border-[#E5E2DC] text-[11px] font-mono-code text-[#141414] font-medium">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Leadership Core Skills Grid */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-xs">
          <h4 className="text-sm font-mono-code font-bold text-[#141414] uppercase tracking-wider mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-[#3E6B48]" />
            <span>Core Leadership & Event Management Competencies</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {leadershipSkills.map((skill) => (
              <div
                key={skill}
                className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] text-xs font-mono-code text-[#141414] font-medium flex items-center gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#3E6B48] shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
