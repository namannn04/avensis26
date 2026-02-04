import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'back.out' } });

      // Robot explosion entrance with massive scale
      tl.fromTo(
        robotRef.current,
        { y: 300, scale: 0.3, opacity: 0, rotation: -45 },
        { y: 0, scale: 1, opacity: 1, rotation: 0, duration: 1.2 },
        0
      );

      // Title with dramatic skew
      tl.fromTo(
        titleRef.current,
        { x: -150, skewY: 15, opacity: 0 },
        { x: 0, skewY: 0, opacity: 1, duration: 1 },
        0.15
      );

      // Floating cards with stagger and rotation
      [card1Ref, card2Ref, card3Ref].forEach((ref, i) => {
        tl.fromTo(
          ref.current,
          { y: 150 + i * 30, x: -100 + i * 50, opacity: 0, rotation: 20 - i * 10 },
          { y: 0, x: 0, opacity: 1, rotation: 0, duration: 0.8 },
          0.35 + i * 0.12
        );
      });
    }, sectionRef);

    // Continuous subtle float animation
    gsap.to(robotRef.current, {
      y: -15,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#05060B] overflow-hidden pt-24 md:pt-0 md:flex items-center justify-center"
    >
      {/* Animated radial background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#7B2BFF]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#00F0FF]/15 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-[#FF2BD6]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center min-h-screen md:min-h-fit">
          {/* Left side - Overlapping tilted cards */}
          <div className="relative h-96 md:h-full md:pr-8">
            {/* Big title */}
            <h1
              ref={titleRef}
              className="font-orbitron font-black text-6xl sm:text-7xl md:text-8xl text-[#F4F6FF] tracking-tighter leading-none mb-8 md:mb-12 relative z-30"
              style={{ opacity: 0 }}
            >
              AVENSIS
              <br />
              <span className="text-[#7B2BFF]">{'\''}26</span>
            </h1>

            {/* Card 1 - Tilted left */}
            <div
              ref={card1Ref}
              className="absolute top-20 md:top-32 -left-4 md:left-0 w-72 md:w-80 bg-gradient-to-br from-[#7B2BFF]/25 via-[#FF2BD6]/15 to-transparent border border-[#7B2BFF]/40 backdrop-blur-xl px-6 md:px-8 py-5 md:py-6 rounded-2xl transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer z-20 shadow-2xl"
              style={{ opacity: 0 }}
            >
              <div className="font-orbitron text-xs md:text-sm text-[#7B2BFF] font-bold tracking-wider mb-2">
                SYSTEM STATUS
              </div>
              <p className="font-inter text-sm md:text-base text-[#F4F6FF] font-semibold">
                Enter the Future
              </p>
              <p className="font-inter text-xs text-[#A7B0C8] mt-3">
                Two days of pure innovation
              </p>
            </div>

            {/* Card 2 - Centered tilted */}
            <div
              ref={card2Ref}
              className="absolute top-48 md:top-64 left-8 md:left-16 w-72 md:w-80 bg-gradient-to-br from-[#00F0FF]/25 via-[#7B2BFF]/15 to-transparent border border-[#00F0FF]/40 backdrop-blur-xl px-6 md:px-8 py-5 md:py-6 rounded-2xl transform rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer z-10 shadow-2xl"
              style={{ opacity: 0 }}
            >
              <div className="font-mono text-[10px] md:text-xs text-[#00F0FF] font-bold tracking-wider mb-2">
                {'{  TIMELINE  }'}
              </div>
              <p className="font-mono text-xs md:text-sm text-[#F4F6FF] font-bold">
                Feb 12–13, 2026
              </p>
              <p className="font-mono text-[9px] md:text-xs text-[#A7B0C8] mt-3">
                {'// Live in your city'}
              </p>
            </div>

            {/* Card 3 - Tilted right with CTA */}
            <div
              ref={card3Ref}
              className="absolute top-96 md:top-[480px] left-20 md:left-32 w-72 md:w-80 bg-gradient-to-br from-[#FF2BD6]/25 via-[#FFAA2B]/15 to-transparent border border-[#FF2BD6]/40 backdrop-blur-xl px-6 md:px-8 py-6 md:py-7 rounded-2xl transform -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-500 cursor-pointer z-10 shadow-2xl"
              style={{ opacity: 0 }}
            >
              <button
                onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full cyber-button text-sm md:text-base py-3"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore the Universe →
                </span>
              </button>
            </div>
          </div>

          {/* Right side - Robot with neon glow */}
          <div className="relative h-96 md:h-full flex items-center justify-center md:justify-start pl-0 md:pl-8">
            {/* Glow effect layers */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-96 h-96 bg-[#7B2BFF]/30 rounded-full blur-3xl" />
              <div className="absolute w-80 h-80 bg-[#00F0FF]/20 rounded-full blur-2xl" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Robot image */}
            <img
              ref={robotRef}
              src="/hero_robot.png"
              alt="Futuristic Robot"
              className="w-full max-w-sm h-auto object-contain relative z-10 drop-shadow-2xl"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 60px rgba(123, 43, 255, 0.6)) drop-shadow(0 0 30px rgba(0, 240, 255, 0.4))' }}
            />
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-3 animate-bounce">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#7B2BFF]">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          <div className="w-0.5 h-6 bg-gradient-to-b from-[#7B2BFF] to-transparent" />
        </div>
      </div>
    </section>
  );
}
