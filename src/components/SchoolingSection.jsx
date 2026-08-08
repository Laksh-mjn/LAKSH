import React from 'react';
import { School, MapPin, Award, BookCheck, Sparkles } from 'lucide-react';

export default function SchoolingSection() {
  const milestones = [
    {
      stage: 'Class 12th (Senior Secondary)',
      stream: 'Science Stream (PCM + PCB Dual Focus: Biology with Mathematics)',
      desc: 'Completed Higher Secondary education with a comprehensive science background, mastering Physics, Chemistry, Mathematics, and Biology.',
      badge: 'PCM & PCB SCIENCE STREAM',
    },
    {
      stage: 'Class 10th (Secondary Schooling)',
      stream: 'General Academics & Foundation Sciences',
      desc: 'Completed 10th standard with strong performance across science, mathematics, social studies, and languages.',
      badge: '10TH STANDARD COMPLETED',
    },
  ];

  return (
    <section id="schooling" className="py-24 bg-[#EFECE6] border-b border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#3E6B48] uppercase block mb-2">
            PRIMARY & SECONDARY ACADEMICS
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium text-[#141414] tracking-tight mb-3">
            Schooling & Academic Foundations
          </h2>
          <p className="text-base text-[#5C5C5C] leading-relaxed">
            Early academic foundation building strong analytical, mathematical, and scientific reasoning skills.
          </p>
        </div>

        {/* School Main Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-sm mb-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#E5E2DC]">
            <div className="flex items-start gap-5">
              <div className="p-4 rounded-2xl bg-[#3E6B48]/10 text-[#3E6B48] shrink-0 border border-[#3E6B48]/20">
                <School className="w-9 h-9" />
              </div>
              <div>
                <span className="text-xs font-mono-code font-bold px-3 py-1 rounded-full bg-[#3E6B48]/10 text-[#3E6B48] border border-[#3E6B48]/20 inline-block mb-3">
                  PRIMARY & SECONDARY EDUCATION
                </span>
                <h3 className="font-heading text-3xl sm:text-4xl font-bold text-[#141414]">
                  MHS DAV Public Higher Secondary School
                </h3>
                <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-[#5C5C5C] font-mono-code">
                  <MapPin className="w-4 h-4 text-[#3E6B48]" />
                  <span>Udhampur, Jammu & Kashmir</span>
                </div>
              </div>
            </div>
          </div>

          {/* 10th and 12th Milestones Breakdown */}
          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {milestones.map((item) => (
              <div
                key={item.stage}
                className="p-6 rounded-2xl bg-[#F8F7F4] border border-[#E5E2DC] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono-code font-bold px-2.5 py-1 rounded bg-[#3E6B48]/10 text-[#3E6B48]">
                      {item.badge}
                    </span>
                    <BookCheck className="w-4 h-4 text-[#3E6B48]" />
                  </div>

                  <h4 className="font-heading text-2xl font-bold text-[#141414] mb-1">
                    {item.stage}
                  </h4>

                  <p className="text-xs font-mono-code text-[#3E6B48] font-semibold mb-3">
                    {item.stream}
                  </p>

                  <p className="text-sm text-[#5C5C5C] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
