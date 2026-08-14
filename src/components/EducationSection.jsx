import React from 'react';
import { School, GraduationCap, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function EducationSection() {
  const educationStages = [
    {
      id: 'class-10',
      stepNumber: '01',
      badge: 'SECONDARY SCHOOLING',
      title: 'Class 10th Standard',
      institution: 'MHS DAV Public Higher Secondary School',
      location: 'Udhampur, Jammu & Kashmir',
      stream: 'General Academics & Fundamental Sciences',
      desc: 'Completed secondary education with strong foundation in mathematics, analytical reasoning, and core physical sciences.',
      highlights: ['Mathematics & Logical Reasoning', 'General Science Foundations', 'Secondary Board Standard'],
      icon: School,
      accentColor: 'border-l-4 border-l-white/40',
      badgeStyle: 'bg-white/[0.06] text-[#E4E4E7] border-white/10',
      iconBg: 'bg-white/[0.06] text-white',
    },
    {
      id: 'class-12',
      stepNumber: '02',
      badge: 'SENIOR SECONDARY SCHOOLING',
      title: 'Class 12th Standard',
      institution: 'MHS DAV Public Higher Secondary School',
      location: 'Udhampur, Jammu & Kashmir',
      stream: 'Science Stream (Dual Focus: Physics, Chemistry, Biology & Mathematics)',
      desc: 'Pursued senior secondary education specializing in both Physical Sciences (Physics, Chemistry, Mathematics) and Biological Sciences (Biology with Mathematics).',
      highlights: ['Physics, Chemistry & Higher Mathematics', 'Biological Sciences', 'Dual Science Stream (PCM + PCB)'],
      icon: Award,
      accentColor: 'border-l-4 border-l-white/60',
      badgeStyle: 'bg-white/[0.06] text-[#E4E4E7] border-white/10',
      iconBg: 'bg-white/[0.06] text-white',
    },
    {
      id: 'engineering',
      stepNumber: '03',
      badge: 'UNDERGRADUATE TECHNICAL DEGREE',
      title: 'B.Tech in Computer Science Engineering',
      institution: 'Rajiv Gandhi Institute of Technology (RIT)',
      location: 'Kottayam, Kerala',
      stream: 'Artificial Intelligence, Machine Learning & Software Systems',
      desc: 'Currently pursuing Bachelor of Technology in CSE, focusing on Artificial Intelligence, Machine Learning, Data Analytics, Cybersecurity, Cloud Computing, and Software Engineering.',
      highlights: [
        'Artificial Intelligence & Machine Learning',
        'Data Structures & Algorithms (DSA)',
        'Database Management Systems (DBMS)',
        'Cybersecurity & Cloud Architectures',
        'Object-Oriented Programming (Python / C++)',
        'Web & Distributed Systems Engineering',
      ],
      icon: GraduationCap,
      accentColor: 'border-l-4 border-l-white',
      badgeStyle: 'bg-white text-black border-white font-bold',
      iconBg: 'bg-white text-black',
      status: 'CURRENT UNDERGRADUATE',
    },
  ];

  return (
    <section id="education" className="py-28 bg-[#08080A]/60 backdrop-blur-md border-b border-white/[0.06] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-mono-code font-medium tracking-widest text-[#86868B] uppercase block">
            ACADEMIC FOUNDATION & TECHNICAL DEGREE
          </span>
          <h2 className="font-heading text-4xl sm:text-6xl font-bold text-[#F5F5F7] tracking-tight">
            Education Journey
          </h2>
          <p className="text-base sm:text-lg text-[#86868B] font-light">
            Comprehensive academic progression spanning secondary sciences to undergraduate Computer Science & Engineering.
          </p>
        </div>

        {/* Chronological Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {educationStages.map((stage) => {
            const IconComp = stage.icon;
            return (
              <div
                key={stage.id}
                className={`rounded-3xl p-8 bg-[#0F0F12]/90 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-8 relative group hairline-border hover:border-white/30 transition-all duration-300 ${stage.accentColor}`}
              >
                <div className="space-y-6">
                  {/* Step & Badge Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono-code text-2xl font-black text-white/20 group-hover:text-white/60 transition-colors">
                      {stage.stepNumber}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-mono-code font-bold uppercase tracking-wider border ${stage.badgeStyle}`}>
                      {stage.badge}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="space-y-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-md ${stage.iconBg}`}>
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3 className="font-heading text-2xl font-bold text-[#F5F5F7] tracking-tight">
                      {stage.title}
                    </h3>
                  </div>

                  {/* Institution & Location */}
                  <div className="space-y-1.5 border-t border-b border-white/[0.06] py-3.5 text-xs font-mono-code">
                    <div className="text-[#F5F5F7] font-semibold flex items-center gap-1.5">
                      <span>{stage.institution}</span>
                    </div>
                    <div className="text-[#86868B] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-white/60" />
                      <span>{stage.location}</span>
                    </div>
                  </div>

                  {/* Stream Focus */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono-code text-[#A1A1AA] uppercase tracking-wider block font-semibold">
                      Stream & Specialization:
                    </span>
                    <p className="text-sm font-medium text-white/90 leading-snug">
                      {stage.stream}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#86868B] leading-relaxed font-light">
                    {stage.desc}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-mono-code text-[#71717A] uppercase tracking-wider block">
                      Core Pillars:
                    </span>
                    <div className="space-y-1.5">
                      {stage.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#D4D4D8]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white/80 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Status Pill */}
                {stage.status && (
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono-code text-white">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      {stage.status}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
