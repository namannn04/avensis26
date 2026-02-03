import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, Linkedin, Download, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const quickLinks = [
  { label: 'Events', href: '#events' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Sponsors', href: '#sponsors' },
  { label: 'Register', href: '#register' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Code of Conduct', href: '#' },
];

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // CTA animation
      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Footer animation
      gsap.fromTo(
        footerRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="register"
      className="relative w-full bg-[#05060B]"
    >
      {/* City glow gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-[#7B2BFF]/10 via-transparent to-transparent pointer-events-none" />

      {/* CTA Section */}
      <div
        ref={ctaRef}
        className="relative py-20 lg:py-32 text-center px-6"
      >
        <h2 className="font-orbitron font-black text-[clamp(32px,5vw,72px)] text-[#F4F6FF] tracking-[0.08em] mb-6">
          READY TO ENTER
          <br />
          <span className="text-glow-violet">THE FUTURE?</span>
        </h2>
        <p className="font-inter text-[#A7B0C8] text-lg mb-10 max-w-xl mx-auto">
          Register now. Limited seats for select events.
          <br />
          Don't miss the ultimate tech fest experience.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="cyber-button pulse-glow text-lg px-10 py-4">
            <span className="relative z-10 flex items-center gap-2">
              Register Now
              <ArrowUpRight size={18} />
            </span>
          </button>
          <button className="flex items-center gap-2 px-8 py-4 border border-white/20 rounded-lg font-mono text-sm text-[#A7B0C8] hover:border-[#7B2BFF]/50 hover:text-[#F4F6FF] transition-all">
            <Download size={16} />
            Download Brochure
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="relative border-t border-white/5 py-16 px-6 lg:px-12"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <a href="#" className="font-orbitron font-bold text-2xl text-[#F4F6FF] mb-4 block">
                AVENSIS'<span className="text-[#7B2BFF]">26</span>
              </a>
              <p className="font-inter text-sm text-[#A7B0C8] leading-relaxed mb-6">
                The flagship annual technical extravaganza of MSIT. Enter the future of technology, gaming, and innovation.
              </p>
              
              {/* Social links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-[#0B0E16] border border-white/10 rounded-lg flex items-center justify-center text-[#A7B0C8] hover:border-[#7B2BFF]/50 hover:text-[#7B2BFF] transition-all"
                      aria-label={social.label}
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-orbitron font-semibold text-sm text-[#F4F6FF] tracking-wider mb-6">
                QUICK LINKS
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="font-inter text-sm text-[#A7B0C8] hover:text-[#7B2BFF] transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-orbitron font-semibold text-sm text-[#F4F6FF] tracking-wider mb-6">
                CONTACT
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-[#7B2BFF] mt-1 shrink-0" />
                  <span className="font-inter text-sm text-[#A7B0C8]">
                    Maharaja Surajmal Institute of Technology
                    <br />
                    C-4, Janakpuri, New Delhi
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={16} className="text-[#7B2BFF] shrink-0" />
                  <a
                    href="mailto:avensis@msit.in"
                    className="font-inter text-sm text-[#A7B0C8] hover:text-[#7B2BFF] transition-colors"
                  >
                    avensis@msit.in
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-[#7B2BFF] shrink-0" />
                  <a
                    href="tel:+911234567890"
                    className="font-inter text-sm text-[#A7B0C8] hover:text-[#7B2BFF] transition-colors"
                  >
                    +91 12345 67890
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-orbitron font-semibold text-sm text-[#F4F6FF] tracking-wider mb-6">
                LEGAL
              </h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-inter text-sm text-[#A7B0C8] hover:text-[#7B2BFF] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-[#A7B0C8]/60">
              © AVENSIS'26, MSIT. All rights reserved.
            </p>
            <p className="font-mono text-xs text-[#A7B0C8]/60">
              Designed with <span className="text-[#FF2BD6]">♥</span> by Naman for the future
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}