import React from 'react';
import { GraduationCap, MapPin, Calendar, BookOpen, Cpu, CheckCircle2 } from 'lucide-react';

export default function EngineeringSection() {
  const engineeringModules = [
    'Artificial Intelligence & Machine Learning',
    'Data Structures & Algorithms (DSA)',
    'Database Management Systems (DBMS)',
    'Object-Oriented Programming (Python / C++)',
    'Computer Networks & Cybersecurity',
    'Operating Systems & System Architecture',
  ];

  return (
    <section id="engineering" className="py-24 bg-[#F8F7F4] border-b border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-mono-code font-bold tracking-widest text-[#2B4C7E] uppercase block mb-2">
            HIGHER EDUCATION & DEGREE
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-medium text-[#141414] tracking-tight mb-3">
            Engineering Education
          </h2>
          <p className="text-base text-[#5C5C5C] leading-relaxed">
            Undergraduate technical degree focusing on computer science, AI algorithms, and software engineering.
          </p>
        </div>

        {/* Engineering Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-sm hover:shadow-md transition-all">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#E5E2DC]">
            <div className="flex items-start gap-5">
              <div className="p-4 rounded-2xl bg-[#2B4C7E]/10 text-[#2B4C7E] shrink-0 border border-[#2B4C7E]/20">
                <GraduationCap className="w-9 h-9" />
              </div>
              <div>
                <span className="text-xs font-mono-code font-bold px-3 py-1 rounded-full bg-[#2B4C7E]/10 text-[#2B4C7E] border border-[#2B4C7E]/20 inline-block mb-3">
                  BACHELOR OF TECHNOLOGY (B.TECH)
                </span>
                <h3 className="font-heading text-3xl sm:text-4xl font-bold text-[#141414]">
                  Rajiv Gandhi Institute of Technology (RIT)
                </h3>
                <p className="text-lg font-semibold text-[#2B4C7E] mt-1">
                  Computer Science Engineering
                </p>

                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-[#5C5C5C] font-mono-code">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#2B4C7E]" />
                    <span>Kottayam, Kerala</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#2B4C7E]" />
                    <span>Current Undergraduate</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Engineering Core Modules */}
          <div className="pt-8">
            <h4 className="text-xs font-mono-code font-bold text-[#141414] uppercase tracking-wider mb-5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#2B4C7E]" />
              <span>Core Computer Science & Engineering Modules</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {engineeringModules.map((module) => (
                <div
                  key={module}
                  className="p-4 rounded-xl bg-[#F8F7F4] border border-[#E5E2DC] text-xs font-mono-code text-[#141414] font-medium flex items-center gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#2B4C7E] shrink-0" />
                  <span>{module}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
