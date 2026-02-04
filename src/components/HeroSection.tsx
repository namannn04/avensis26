import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const floatBox1Ref = useRef<HTMLDivElement>(null);
  const floatBox2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'elastic.out' } });

      // Robot wild entrance - super bouncy
      tl.fromTo(
        robotRef.current,
        { y: 400, scale: 0, opacity: 0, rotation: -180 },
        { y: 0, scale: 1, opacity: 1, rotation: 0, duration: 1.5 },
        0
      );

      // Title with crazy glitch entrance
      tl.fromTo(
        titleRef.current,
        { x: -300, skewX: 45, opacity: 0, rotation: 20 },
        { x: 0, skewX: 0, opacity: 1, rotation: 0, duration: 1.2 },
        0.2
      );

      // Blobs cascade in from different angles
      tl.fromTo(
        blob1Ref.current,
        { x: -200, y: -200, scale: 0, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.9 },
        0.3
      );

      tl.fromTo(
        blob2Ref.current,
        { x: 300, y: 150, scale: 0, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.9 },
        0.4
      );

      tl.fromTo(
        blob3Ref.current,
        { x: -150, y: 250, scale: 0, opacity: 0 },
        { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.9 },
        0.5
      );

      // Float boxes slide in from sides
      tl.fromTo(
        floatBox1Ref.current,
        { x: -500, opacity: 0, rotation: -45 },
        { x: 0, opacity: 1, rotation: 0, duration: 0.8 },
        0.4
      );

      tl.fromTo(
        floatBox2Ref.current,
        { x: 500, opacity: 0, rotation: 45 },
        { x: 0, opacity: 1, rotation: 0, duration: 0.8 },
        0.5
      );
    }, sectionRef);

    // Continuous crazy animations
    gsap.to(robotRef.current, {
      y: -25,
      rotation: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#05060B] overflow-hidden pt-32 md:pt-24 pb-16"
    >
      {/* Crazy morphing blobs background */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#7B2BFF]/40 morph-blob blur-3xl" />
        <div className="absolute top-1/3 -right-60 w-80 h-80 bg-[#FF2BD6]/30 morph-blob blur-3xl" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-[#00FF88]/25 morph-blob blur-3xl" style={{ animationDelay: '4s' }} />
      </div>

      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        {/* Radical asymmetric layout */}
        <div className="relative min-h-[90vh] flex items-center">
          {/* Left side - HUGE title breaking bounds */}
          <div className="absolute left-0 top-0 w-full md:w-2/3 h-full flex flex-col justify-center">
            <h1
              ref={titleRef}
              className="font-orbitron font-black text-[clamp(48px, 12vw, 180px)] leading-[0.9] text-[#F4F6FF] tracking-tighter z-20 color-shift-text"
              style={{ opacity: 0 }}
            >
              AVENSIS
              <br />
              <span className="inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF2BD6] via-[#00FF88] to-[#00F0FF]">
                  {'\''}26
                </span>
              </span>
            </h1>

            {/* Subtitle with cool positioning */}
            <div className="mt-8 max-w-md">
              <p className="font-mono text-sm md:text-base text-[#00FF88] font-bold tracking-widest mb-3">
                ► TWO DAYS • PURE CHAOS • INFINITE INNOVATION
              </p>
              <p className="font-inter text-[#A7B0C8] text-base md:text-lg leading-relaxed">
                Where the brightest minds collide, code becomes art, and the impossible becomes inevitable.
              </p>
            </div>

            {/* CTA Button with wild style */}
            <button
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-8 w-fit px-8 md:px-12 py-4 md:py-5 bg-gradient-to-r from-[#7B2BFF] to-[#FF2BD6] text-white font-orbitron font-bold text-base md:text-lg tracking-wider rounded-full hover:scale-110 hover:shadow-2xl hover:shadow-[#7B2BFF]/50 transition-all duration-300 cursor-pointer relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                JUMP IN →
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF2BD6] to-[#7B2BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" style={{ zIndex: -1 }} />
            </button>
          </div>

          {/* Right side - Robot + floating elements */}
          <div className="absolute right-0 top-0 w-full md:w-1/2 h-full flex items-center justify-center md:justify-end md:pr-8">
            {/* Robot with intense glow */}
            <img
              ref={robotRef}
              src="/hero_robot.png"
              alt="Futuristic Robot"
              className="w-full max-w-xs md:max-w-md h-auto object-contain relative z-10"
              style={{
                opacity: 0,
                filter: 'drop-shadow(0 0 80px rgba(123, 43, 255, 0.8)) drop-shadow(0 0 40px rgba(0, 240, 255, 0.6)) drop-shadow(0 0 20px rgba(255, 43, 214, 0.4))',
              }}
            />
          </div>
        </div>

        {/* Floating boxes - positioned absolutely for crazy layout */}
        <div
          ref={floatBox1Ref}
          className="absolute top-1/3 left-[5%] md:left-[15%] w-72 md:w-80 bg-gradient-to-br from-[#7B2BFF]/30 to-[#FF2BD6]/20 backdrop-blur-2xl border border-[#00FF88]/50 rounded-3xl p-6 md:p-8 shadow-2xl z-20 hover:scale-105 transition-transform duration-300 cursor-pointer"
          style={{ opacity: 0 }}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#00FF88]/30 flex items-center justify-center flex-shrink-0">
              <span className="text-[#00FF88] font-bold">⚡</span>
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-[#F4F6FF] text-base">SYSTEM ONLINE</h3>
              <p className="font-mono text-xs text-[#A7B0C8]">feb 12-13</p>
            </div>
          </div>
          <p className="font-inter text-sm text-[#A7B0C8]">24 hours of pure innovation, competition, and absolute madness.</p>
        </div>

        <div
          ref={floatBox2Ref}
          className="absolute bottom-1/4 right-[5%] md:right-[10%] w-72 md:w-80 bg-gradient-to-br from-[#00F0FF]/30 to-[#7B2BFF]/20 backdrop-blur-2xl border border-[#FF2BD6]/50 rounded-3xl p-6 md:p-8 shadow-2xl z-20 hover:scale-105 transition-transform duration-300 cursor-pointer"
          style={{ opacity: 0 }}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#FF2BD6]/30 flex items-center justify-center flex-shrink-0">
              <span className="text-[#FF2BD6] font-bold">🚀</span>
            </div>
            <div>
              <h3 className="font-orbitron font-bold text-[#F4F6FF] text-base">LAUNCH SEQUENCE</h3>
              <p className="font-mono text-xs text-[#A7B0C8]">Events Await</p>
            </div>
          </div>
          <p className="font-inter text-sm text-[#A7B0C8]">12+ events across tech, gaming, robotics & chaos.</p>
        </div>

        {/* Morphing blob elements */}
        <div ref={blob1Ref} className="absolute top-1/4 left-10 w-32 h-32 bg-[#7B2BFF]/20 morph-blob blur-3xl rounded-full" style={{ opacity: 0 }} />
        <div ref={blob2Ref} className="absolute top-1/2 right-20 w-40 h-40 bg-[#FF2BD6]/15 morph-blob blur-3xl rounded-full" style={{ opacity: 0 }} />
        <div ref={blob3Ref} className="absolute bottom-1/3 left-1/3 w-36 h-36 bg-[#00FF88]/15 morph-blob blur-3xl rounded-full" style={{ opacity: 0 }} />
      </div>

      {/* Crazy scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#00FF88] animate-pulse">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <div className="w-1 h-8 bg-gradient-to-b from-[#00FF88] via-[#7B2BFF] to-transparent rounded-full" />
        </div>
      </div>
    </section>
  );
}
