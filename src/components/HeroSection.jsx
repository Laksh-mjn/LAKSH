import lakshPortrait from '../assets/laksh-portrait.jpg';

export default function HeroSection() {
  return (
    <section className="pt-36 pb-24 bg-[#F8F7F4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Bio */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2B4C7E]/10 border border-[#2B4C7E]/20 text-[#2B4C7E] text-xs font-mono-code font-semibold tracking-wide">
              <span>ASPIRING AI ENGINEER & CREATIVE TECHNOLOGIST</span>
            </div>

            <h1 className="font-heading text-6xl sm:text-7xl lg:text-8xl font-medium tracking-tight text-[#141414] leading-[1.05]">
              Laksh Mahajan
            </h1>

            <p className="text-[#0F2942] font-heading italic tracking-wide text-lg sm:text-xl font-semibold leading-relaxed">
              Lyricist • Composer • Music Producer • Event Organizer • Event Manager • Novelist • B.Tech CSE
            </p>

            <p className="text-base sm:text-lg text-[#5C5C5C] leading-relaxed max-w-2xl font-normal">
              I’m Laksh Mahajan, an aspiring AI Engineer exploring AI, Machine Learning, Cybersecurity, Data Analytics, and Cloud Computing. Beyond technology, I’m a lyricist, composer, and music producer known as <strong className="text-[#141414] font-semibold">Raktaan</strong>, while leading as President of Youth On Beat Organisation and District Vice President of Betiya Foundation.
            </p>

            {/* Clean & Minimal Large Slogan */}
            <div className="pt-4">
              <p className="font-heading text-2xl sm:text-3xl lg:text-4xl italic text-[#141414] font-medium leading-snug tracking-tight">
                “I build with technology, create through music, and lead with purpose.”
              </p>
            </div>
          </div>

          {/* Right Column: Handcrafted Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border-2 border-[#E5E2DC] bg-[#FFFFFF] p-3 shadow-xl group">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#EFECE6]">
                <img
                  src={lakshPortrait}
                  alt="Laksh Mahajan"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                
                {/* Subtle Lighting Accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/70 via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="text-xl font-heading font-bold text-[#FFFFFF]">Laksh Mahajan</span>
                  <span className="text-xs text-[#EFECE6] font-mono-code">B.Tech CSE . RIT Kottayam</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
