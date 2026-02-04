import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'cubic.out' } });

      // Stagger entrance animations
      tl.fromTo(
        robotRef.current,
        { y: 60, scale: 0.85, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.8 },
        0
      );

      tl.fromTo(
        titleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.1
      );

      tl.fromTo(
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.2
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.25
      );

      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#05060B] overflow-hidden flex items-center justify-center py-16 md:py-0"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(123,43,255,.05)_25%,rgba(123,43,255,.05)_26%,transparent_27%,transparent_74%,rgba(123,43,255,.05)_75%,rgba(123,43,255,.05)_76%,transparent_77%,transparent)] bg-[50px_50px]" />
      </div>

      {/* Content wrapper */}
      <div ref={contentRef} className="relative z-10 w-full px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text content */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-8">
            <div>
              <h1
                ref={titleRef}
                className="font-orbitron font-black text-[3rem] sm:text-5xl md:text-6xl text-[#F4F6FF] tracking-tight text-glow-violet mb-4"
                style={{ opacity: 0 }}
              >
                AVENSIS{'\''}26
              </h1>
              <p
                ref={taglineRef}
                className="font-inter text-lg md:text-xl text-[#A7B0C8] font-light tracking-wide"
                style={{ opacity: 0 }}
              >
                Enter the Future
              </p>
            </div>

            <div
              ref={subtitleRef}
              className="space-y-2 md:space-y-3"
              style={{ opacity: 0 }}
            >
              <p className="font-inter text-[#A7B0C8] text-sm md:text-base leading-relaxed">
                Two days of cutting-edge technology, intense competition, and unforgettable cultural experiences.
              </p>
              <div className="flex items-center gap-3 text-[#7B2BFF] font-mono text-xs md:text-sm">
                <span className="w-2 h-2 rounded-full bg-[#7B2BFF]" />
                <span>February 12–13, 2026</span>
              </div>
            </div>

            <button
              ref={ctaRef}
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              className="cyber-button w-fit px-8 py-3 text-sm md:text-base group"
              style={{ opacity: 0 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Events
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>

          {/* Right: Robot image */}
          <div className="flex items-center justify-center md:justify-end">
            <img
              ref={robotRef}
              src="/hero_robot.png"
              alt="Futuristic Robot"
              className="w-full max-w-xs md:max-w-md h-auto object-contain floating"
              style={{ opacity: 0 }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs md:text-sm text-[#A7B0C8] font-mono">Scroll</span>
        <div className="w-6 h-10 border border-[#7B2BFF]/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-[#7B2BFF] rounded-full animate-pulse" />
        </div>
      </div>

      {/* Decorative accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#7B2BFF]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00F0FF]/20 to-transparent" />
    </section>
  );
}
