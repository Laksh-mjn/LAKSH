import React, { useState } from 'react';
import { Mail, Phone, MapPin, ExternalLink, Send, CheckCircle2, AlertCircle, Globe, Share2, Disc } from 'lucide-react';
import { validateContactPayload } from '../utils/security';

export default function ContactSection({ _onOpenRaktaan }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formError, setFormError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // Strict input validation and sanitization against XSS and CRLF injection
    const validation = validateContactPayload(formData.name, formData.email, formData.message);
    if (!validation.isValid) {
      setFormError(validation.errors[0] || 'Please complete all required fields.');
      return;
    }

    const { name, email, message } = validation.data;
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hello Laksh,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n--- Sent from lakshmahajan.dev`
    );
    window.location.href = `mailto:laksh7583@gmail.com?subject=${subject}&body=${body}`;

    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 6000);
  };

  const socials = [
    {
      name: 'LinkedIn Profile',
      handle: 'Laksh Mahajan',
      href: 'https://www.linkedin.com/in/laksh-mahajan-696157329/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BUYEdRiLrScW7qBHKCbQcog%3D%3D',
      icon: Globe,
    },
    {
      name: 'Personal Instagram',
      handle: '@laksh_mahajann',
      href: 'https://www.instagram.com/laksh_mahajann/',
      icon: Share2,
    },
    {
      name: 'Artist Instagram',
      handle: '@raktaan',
      href: 'https://www.instagram.com/raktaan/',
      icon: Share2,
    },
    {
      name: 'Spotify Artist Profile',
      handle: 'Raktaan (7 Singles)',
      href: 'https://open.spotify.com/artist/1lkEE1c2w8HcHWEixWwc7E?si=l7nGAUANSciFDPzbXnN0DQ',
      icon: Disc,
    },
  ];

  return (
    <section id="contact" className="py-28 scroll-mt-24 bg-[#08080A] border-t border-white/[0.06] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 space-y-20">
        
        {/* Minimalist Bold CTA Headline */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#86868B] text-xs font-mono-code uppercase">
            <span>GET IN TOUCH</span>
          </span>

          <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black text-[#F5F5F7] tracking-tight uppercase leading-[0.95]">
            LET’S BUILD <br />
            <span className="text-white">SOMETHING</span> <br />
            <span className="text-[#86868B]">INTELLIGENT.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#86868B] font-light max-w-2xl mx-auto">
            Open for AI engineering projects, technology leadership roles, software development, or music production inquiries.
          </p>
        </div>

        {/* Contact Info & Direct Mail Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Credentials & Social Badges */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <a
              href="tel:+917006659770"
              className="p-6 rounded-2xl glass-card flex items-center justify-between hover:border-white/40 transition-all group cursor-pointer"
              data-cursor="CALL"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl glass-pill text-white group-hover:bg-white group-hover:text-black transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-mono-code font-medium text-[#86868B] uppercase tracking-wider">
                    Direct Phone / WhatsApp
                  </h4>
                  <p className="text-xl font-bold text-[#F5F5F7] group-hover:text-white transition-colors">
                    +91 7006659770
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#86868B] group-hover:text-white" />
            </a>

            {/* Email Card */}
            <a
              href="mailto:laksh7583@gmail.com"
              className="p-6 rounded-2xl glass-card flex items-center justify-between hover:border-white/40 transition-all group cursor-pointer"
              data-cursor="EMAIL"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl glass-pill text-white group-hover:bg-white group-hover:text-black transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-mono-code font-medium text-[#86868B] uppercase tracking-wider">
                    Direct Email
                  </h4>
                  <p className="text-lg font-bold text-[#F5F5F7] group-hover:text-white transition-colors">
                    laksh7583@gmail.com
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#86868B] group-hover:text-white" />
            </a>

            {/* Location Card */}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Udhampur%2C+Jammu+and+Kashmir"
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl glass-card flex items-center justify-between hover:border-white/40 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-xl glass-pill text-white group-hover:bg-white group-hover:text-black transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-mono-code font-medium text-[#86868B] uppercase tracking-wider">
                    Primary Location
                  </h4>
                  <p className="text-lg font-bold text-[#F5F5F7] group-hover:text-white transition-colors">
                    Udhampur, Jammu and Kashmir
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-[#86868B] group-hover:text-white shrink-0" />
            </a>

            {/* Social Handles */}
            <div className="pt-4 space-y-3">
              <span className="text-xs font-mono-code font-medium text-[#86868B] uppercase tracking-wider block">
                HANDLES & PROFILES:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {socials.map((s) => {
                  const IconComp = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl glass-card text-[#F5F5F7] flex items-center justify-between hover:border-white/40 transition-all group"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <IconComp className="w-4 h-4 shrink-0 text-white/70 group-hover:text-white" />
                        <div className="truncate">
                          <span className="block font-bold text-xs truncate group-hover:text-white">{s.name}</span>
                          <span className="block text-[10px] text-[#86868B] font-mono-code truncate">{s.handle}</span>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#86868B] group-hover:text-white" />
                    </a>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Direct Email Form with Glassmorphism */}
          <div className="lg:col-span-7 p-6 sm:p-12 rounded-3xl glass-panel shadow-2xl space-y-6">
            <div className="space-y-1">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#F5F5F7]">
                Send a Message
              </h3>
              <p className="text-xs text-[#86868B] font-mono-code">
                Submitting this form safely prepares and opens your email client addressed to laksh7583@gmail.com.
              </p>
            </div>

            {submitted && (
              <div className="p-4 rounded-xl glass-pill text-white text-xs font-mono-code flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-[#10B981]" />
                <span>Message prepared securely! Opening your email client.</span>
              </div>
            )}

            {formError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono-code flex items-center gap-3">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 font-mono-code">
              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] uppercase mb-2">
                  YOUR FULL NAME *
                </label>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-5 py-3.5 rounded-xl glass-input text-[#F5F5F7] text-sm focus:outline-none focus:border-white/40 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] uppercase mb-2">
                  YOUR EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  maxLength={100}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-5 py-3.5 rounded-xl glass-input text-[#F5F5F7] text-sm focus:outline-none focus:border-white/40 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#A1A1AA] uppercase mb-2">
                  YOUR MESSAGE *
                </label>
                <textarea
                  rows="5"
                  required
                  maxLength={3000}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hello Laksh, I would like to get in touch regarding..."
                  className="w-full px-5 py-3.5 rounded-xl glass-input text-[#F5F5F7] text-sm focus:outline-none focus:border-white/40 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all hover:bg-[#E5E5EA] hover:scale-102 active:scale-98 cursor-pointer shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>Send to laksh7583@gmail.com</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
