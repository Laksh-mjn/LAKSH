import React from 'react';
import { School, GraduationCap, MapPin, Calendar, BookOpen, CheckCircle2, Award } from 'lucide-react';

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
      desc: 'Completed secondary education with strong foundation in mathematics, general science, logical reasoning, and core analytical subjects.',
      highlights: ['Mathematics & Logical Reasoning', 'General Science Foundations', 'Secondary Board Standard'],
      icon: School,
      accentColor: 'border-l-4 border-l-[#3E6B48]',
      badgeStyle: 'bg-[#3E6B48]/10 text-[#3E6B48] border-[#3E6B48]/20',
      iconBg: 'bg-[#3E6B48]/10 text-[#3E6B48]',
    },
    {
      id: 'class-12',
      stepNumber: '02',
      badge: 'SENIOR SECONDARY SCHOOLING',
      title: 'Class 12th Standard',
      institution: 'MHS DAV Public Higher Secondary School',
      location: 'Udhampur, Jammu & Kashmir',
      stream: 'Science Stream (PCM + PCB Dual Focus: Biology with Mathematics)',
      desc: 'Pursued senior secondary education specializing in both Physical Sciences (Physics, Chemistry, Mathematics) and Biological Sciences (Biology with Mathematics).',
      highlights: ['Physics, Chemistry & Higher Mathematics', 'Biology & Life Sciences', 'Dual Science Stream (PCM + PCB)'],
      icon: Award,
      accentColor: 'border-l-4 border-l-[#6F5B8A]',
      badgeStyle: 'bg-[#6F5B8A]/10 text-[#6F5B8A] border-[#6F5B8A]/20',
      iconBg: 'bg-[#6F5B8A]/10 text-[#6F5B8A]',
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
      accentColor: 'border-l-4 border-l-[#2B4C7E]',
      badgeStyle: 'bg-[#2B4C7E]/10 text-[#2B4C7E] border-[#2B4C7E]/20',
      iconBg: 'bg-[#2B4C7E]/10 text-[#2B4C7E]',
      status: 'CURRENT UNDERGRADUATE',
    },
  ];

  return (
    <section id="education" className="py-24 bg-[#F8F7F4] border-b border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-16">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#2B4C7E] uppercase block mb-3">
            ACADEMIC PROGRESSION
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-medium text-[#141414] tracking-tight mb-4">
            Education & Qualifications
          </h2>
          <p className="text-base sm:text-lg text-[#5C5C5C] leading-relaxed">
            Chronological academic journey from foundational schooling to higher engineering degree.
          </p>
        </div>

        {/* Sequential Academic Timeline Cards (10th -> 12th -> Engineering) */}
        <div className="space-y-10">
          {educationStages.map((stage) => {
            const IconComp = stage.icon;
            return (
              <div
                key={stage.id}
                className={`p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-sm hover:shadow-md transition-all duration-300 ${stage.accentColor}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E5E2DC]">
                  
                  <div className="flex items-start gap-5">
                    <div className={`p-4 rounded-2xl ${stage.iconBg} shrink-0`}>
                      <IconComp className="w-8 h-8" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-xs font-mono-code font-bold text-[#141414]/40">
                          {stage.stepNumber}
                        </span>
                        <span className={`text-[11px] font-mono-code font-bold px-3 py-0.5 rounded-full border ${stage.badgeStyle}`}>
                          {stage.badge}
                        </span>
                        {stage.status && (
                          <span className="text-[11px] font-mono-code font-bold px-3 py-0.5 rounded-full bg-[#2B4C7E]/10 text-[#2B4C7E] border border-[#2B4C7E]/20">
                            {stage.status}
                          </span>
                        )}
                      </div>

                      <h3 className="font-heading text-3xl sm:text-4xl font-bold text-[#141414]">
                        {stage.title}
                      </h3>

                      <p className="text-base sm:text-lg font-semibold text-[#141414]/80">
                        {stage.institution}
                      </p>

                      <div className="flex items-center gap-2 text-xs sm:text-sm font-mono-code text-[#5C5C5C]">
                        <MapPin className="w-4 h-4 text-[#2B4C7E]" />
                        <span>{stage.location}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Details & Highlights */}
                <div className="pt-6 space-y-4">
                  <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed font-normal">
                    {stage.desc}
                  </p>

                  <div>
                    <span className="text-xs font-mono-code font-bold text-[#141414] uppercase tracking-wider block mb-3">
                      KEY ACADEMIC HIGHLIGHTS & SUBJECTS
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {stage.highlights.map((item) => (
                        <div
                          key={item}
                          className="p-3.5 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] text-xs font-mono-code text-[#141414] font-medium flex items-center gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2B4C7E] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
