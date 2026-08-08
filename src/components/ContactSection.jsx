import React, { useState } from 'react';
import { Mail, Phone, MapPin, ExternalLink, Send, CheckCircle2, Globe, Share2, Disc } from 'lucide-react';

export default function ContactSection({ onOpenRaktaan }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Direct mailto trigger so the user's browser opens their mail client targeting laksh7583@gmail.com
    const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Laksh,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:laksh7583@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
  };

  const socials = [
    {
      name: 'LinkedIn Profile',
      handle: 'Laksh Mahajan',
      href: 'https://www.linkedin.com/in/laksh-mahajan-696157329/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BUYEdRiLrScW7qBHKCbQcog%3D%3D',
      icon: Globe,
      color: 'hover:border-[#0A66C2] hover:text-[#0A66C2]',
    },
    {
      name: 'Personal Instagram',
      handle: '@laksh_mahajann',
      href: 'https://www.instagram.com/laksh_mahajann/',
      icon: Share2,
      color: 'hover:border-[#E4405F] hover:text-[#E4405F]',
    },
    {
      name: 'Artist Instagram',
      handle: '@raktaan',
      href: 'https://www.instagram.com/raktaan/',
      icon: Share2,
      color: 'hover:border-[#E4405F] hover:text-[#E4405F]',
    },
    {
      name: 'Spotify Artist Profile',
      handle: 'Raktaan (7 Singles)',
      href: 'https://open.spotify.com/artist/1lkEE1c2w8HcHWEixWwc7E?si=l7nGAUANSciFDPzbXnN0DQ',
      icon: Disc,
      color: 'hover:border-[#1DB954] hover:text-[#1DB954]',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-[#EFECE6] border-t border-[#E5E2DC]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-sm font-mono-code font-bold tracking-widest text-[#2B4C7E] uppercase block mb-3">
            GET IN TOUCH
          </span>
          <h2 className="font-heading text-5xl sm:text-6xl font-bold text-[#141414] tracking-tight mb-4">
            Let's Connect & Collaborate
          </h2>
          <p className="text-base sm:text-lg text-[#5C5C5C] leading-relaxed font-normal">
            Open for AI engineering projects, technology leadership roles, software development, or music production inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Info & Working Profile Links */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Phone Card */}
            <a
              href="tel:+917006659770"
              className="p-7 rounded-2xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-xs flex items-center justify-between hover:border-[#2B4C7E] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-[#2B4C7E]/10 text-[#2B4C7E] shrink-0 group-hover:bg-[#2B4C7E] group-hover:text-white transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-mono-code font-bold text-[#2B4C7E] uppercase tracking-wider mb-1">
                    Direct Phone / WhatsApp
                  </h4>
                  <p className="text-xl sm:text-2xl font-bold text-[#141414] group-hover:text-[#2B4C7E] transition-colors">
                    +91 7006659770
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-[#5C5C5C] group-hover:text-[#2B4C7E]" />
            </a>

            {/* Email Direct Card */}
            <a
              href="mailto:laksh7583@gmail.com"
              className="p-7 rounded-2xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-xs flex items-center justify-between hover:border-[#2B4C7E] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-[#2B4C7E]/10 text-[#2B4C7E] shrink-0 group-hover:bg-[#2B4C7E] group-hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-mono-code font-bold text-[#2B4C7E] uppercase tracking-wider mb-1">
                    Direct Email
                  </h4>
                  <p className="text-lg sm:text-xl font-bold text-[#141414] group-hover:text-[#2B4C7E] transition-colors">
                    laksh7583@gmail.com
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-[#5C5C5C] group-hover:text-[#2B4C7E]" />
            </a>

            {/* Primary Location Card (Udhampur, Jammu and Kashmir) */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Udhampur%2C+Jammu+and+Kashmir"
              target="_blank"
              rel="noreferrer"
              className="p-7 rounded-2xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-xs flex items-center justify-between hover:border-[#2B4C7E] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-xl bg-[#2B4C7E]/10 text-[#2B4C7E] shrink-0 group-hover:bg-[#2B4C7E] group-hover:text-white transition-colors">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-mono-code font-bold text-[#2B4C7E] uppercase tracking-wider mb-1">
                    Primary Location
                  </h4>
                  <p className="text-lg sm:text-xl font-bold text-[#141414] group-hover:text-[#2B4C7E] transition-colors">
                    Udhampur, Jammu and Kashmir
                  </p>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-[#5C5C5C] group-hover:text-[#2B4C7E] shrink-0" />
            </a>

            {/* Social & Professional Profile Badges */}
            <div className="pt-6 border-t border-[#E5E2DC]">
              <h4 className="text-xs font-mono-code font-bold text-[#2B4C7E] uppercase tracking-wider mb-4">
                Social & Professional Handles
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socials.map((s) => {
                  const IconComp = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E2DC] text-[#141414] flex items-center justify-between transition-all shadow-xs ${s.color}`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <IconComp className="w-5 h-5 shrink-0 text-[#2B4C7E]" />
                        <div className="truncate">
                          <span className="block font-bold text-sm truncate">{s.name}</span>
                          <span className="block text-xs text-[#5C5C5C] font-mono-code truncate font-medium">{s.handle}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 shrink-0 text-[#5C5C5C]" />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Direct Email Contact Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 rounded-2xl bg-[#FFFFFF] border border-[#E5E2DC] shadow-xs">
            <h3 className="font-heading text-3xl font-bold text-[#141414] mb-2">
              Send a Direct Message
            </h3>
            <p className="text-sm text-[#5C5C5C] mb-8 font-mono-code">
              Submitting this form directly opens your email client addressed to laksh7583@gmail.com.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-xl bg-[#3E6B48]/10 border border-[#3E6B48]/30 text-[#3E6B48] text-sm font-medium flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <span>Opening email client with your message for laksh7583@gmail.com!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-mono-code font-bold text-[#141414] uppercase mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-5 py-3.5 rounded-xl border border-[#E5E2DC] bg-[#F8F7F4] text-[#141414] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code font-bold text-[#141414] uppercase mb-2">
                  Your Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-5 py-3.5 rounded-xl border border-[#E5E2DC] bg-[#F8F7F4] text-[#141414] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code font-bold text-[#141414] uppercase mb-2">
                  Your Message *
                </label>
                <textarea
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hello Laksh, I would like to get in touch regarding..."
                  className="w-full px-5 py-3.5 rounded-xl border border-[#E5E2DC] bg-[#F8F7F4] text-[#141414] text-base font-medium focus:outline-none focus:ring-2 focus:ring-[#2B4C7E] focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#141414] hover:bg-[#2B4C7E] text-[#F8F7F4] font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all shadow-md cursor-pointer"
              >
                <Send className="w-5 h-5" />
                <span>Send Message to laksh7583@gmail.com</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
