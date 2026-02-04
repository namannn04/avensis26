import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Gamepad2, Trophy, Eye } from 'lucide-react';

export default function EsportsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<HTMLImageElement>(null);
  const leftTeamRef = useRef<HTMLDivElement>(null);
  const rightTeamRef = useRef<HTMLDivElement>(null);
  const vsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: 60, opacity: 0, skewY: -15 },
        { y: 0, opacity: 1, skewY: 0, duration: 1 },
        0
      );

      // Left team slides in from left
      tl.fromTo(
        leftTeamRef.current,
        { x: -200, opacity: 0, rotateY: -45 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.9 },
        0.2
      );

      // Right team slides in from right
      tl.fromTo(
        rightTeamRef.current,
        { x: 200, opacity: 0, rotateY: 45 },
        { x: 0, opacity: 1, rotateY: 0, duration: 0.9 },
        0.2
      );

      // Controller bounces in
      tl.fromTo(
        controllerRef.current,
        { scale: 0, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.8 },
        0.4
      );

      // VS blinks in
      tl.fromTo(
        vsRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-16 md:py-24 bg-[#05060B] overflow-hidden flex items-center justify-center"
      style={{ perspective: '1200px' }}
    >
      {/* Diagonal split background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-[50%] h-full bg-gradient-to-r from-[#7B2BFF]/15 to-transparent" />
        <div className="absolute top-1/2 right-0 w-[50%] h-full bg-gradient-to-l from-[#FF2BD6]/15 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00F0FF]/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-4 md:px-8 w-full max-w-7xl mx-auto">
        {/* Diagonal title */}
        <div className="mb-20 md:mb-32 text-center" style={{ opacity: 0 }} ref={titleRef}>
          <h2 
            className="font-orbitron font-black text-6xl md:text-8xl text-[#F4F6FF] tracking-tighter leading-none mb-4"
            style={{ transform: 'skewX(-15deg)' }}
          >
            ESPORTS
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#FF2BD6]">ZONE</span>
          </h2>
          <p className="font-mono text-sm md:text-base text-[#00FF88]">128 TEAMS | ₹1L+ PRIZE | LIVE CHAOS</p>
        </div>

        {/* Diagonal battle layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          {/* Left team cards - slides from left */}
          <div 
            ref={leftTeamRef}
            className="space-y-4 md:space-y-6"
            style={{ opacity: 0, perspective: '1000px' }}
          >
            <div className="p-6 md:p-8 rounded-2xl border-2 border-[#7B2BFF]/50 bg-[#0B0E16]/80 backdrop-blur-xl hover:scale-105 transition-transform duration-300" style={{ transform: 'rotateX(-5deg)' }}>
              <Gamepad2 size={36} className="text-[#7B2BFF] mb-4" />
              <h3 className="font-orbitron font-black text-3xl md:text-4xl text-[#7B2BFF] mb-2">128</h3>
              <p className="font-inter text-sm text-[#A7B0C8]">Teams competing</p>
            </div>
            <div className="p-6 md:p-8 rounded-2xl border-2 border-[#7B2BFF]/30 bg-[#0B0E16]/50 backdrop-blur-xl hover:border-[#7B2BFF]/60 transition-all duration-300" style={{ transform: 'rotateX(5deg)' }}>
              <div className="text-sm md:text-base text-[#A7B0C8] font-mono">⚡ BATTLE ONLINE</div>
            </div>
          </div>

          {/* Center - Controller + VS */}
          <div className="relative h-80 md:h-96 flex flex-col items-center justify-center">
            {/* Controller */}
            <img
              ref={controllerRef}
              src="/esports_controller.png"
              alt="Gaming Controller"
              className="w-32 md:w-40 h-auto object-contain z-20 mb-8"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 60px rgba(0, 240, 255, 0.6))' }}
            />
            
            {/* VS text */}
            <div 
              ref={vsRef}
              className="absolute"
              style={{ opacity: 0 }}
            >
              <div className="font-orbitron font-black text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#FF2BD6]" style={{ transform: 'skewX(-20deg)' }}>
                VS
              </div>
            </div>
          </div>

          {/* Right team cards - slides from right */}
          <div 
            ref={rightTeamRef}
            className="space-y-4 md:space-y-6"
            style={{ opacity: 0, perspective: '1000px' }}
          >
            <div className="p-6 md:p-8 rounded-2xl border-2 border-[#FF2BD6]/50 bg-[#0B0E16]/80 backdrop-blur-xl hover:scale-105 transition-transform duration-300 text-right" style={{ transform: 'rotateX(-5deg)' }}>
              <Trophy size={36} className="text-[#FF2BD6] mb-4 ml-auto" />
              <h3 className="font-orbitron font-black text-3xl md:text-4xl text-[#FF2BD6] mb-2">₹1L+</h3>
              <p className="font-inter text-sm text-[#A7B0C8]">Prize pool</p>
            </div>
            <div className="p-6 md:p-8 rounded-2xl border-2 border-[#FF2BD6]/30 bg-[#0B0E16]/50 backdrop-blur-xl hover:border-[#FF2BD6]/60 transition-all duration-300 text-right" style={{ transform: 'rotateX(5deg)' }}>
              <div className="text-sm md:text-base text-[#A7B0C8] font-mono">📡 STREAMING LIVE</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
