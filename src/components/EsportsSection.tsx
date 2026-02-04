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

      // Controller glitch effect
      tl.fromTo(
        controllerRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        0.3
      );

      // Glitch shake effect
      gsap.to(controllerRef.current, {
        x: '3px',
        duration: 0.04,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.4,
      });

      // VS glitch text
      tl.fromTo(
        vsRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.6 },
        0.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 md:py-32 bg-[#05060B] overflow-hidden"
    >
      {/* Glitch split background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 43, 214, 0.05) 25%, rgba(255, 43, 214, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 43, 214, 0.05) 75%, rgba(255, 43, 214, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-[#7B2BFF]/20 to-transparent" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#FF2BD6]/20 to-transparent" />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* HUGE Glitch title */}
        <div className="mb-20 md:mb-28 text-center" style={{ opacity: 0 }} ref={titleRef}>
          <h2 
            className="font-orbitron font-black text-7xl md:text-9xl text-[#F4F6FF] tracking-tighter leading-none mb-4"
            style={{ textShadow: '6px 0px 0px #7B2BFF, -6px 0px 0px #FF2BD6' }}
          >
            ESPORTS
            <br />
            ZONE
          </h2>
          <p className="font-mono text-sm md:text-base text-[#FF2BD6] uppercase tracking-widest mt-6">128 TEAMS | ₹1L+ PRIZE POOL</p>
        </div>

        {/* Battle arena layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">
          {/* Left team - HUGE stats */}
          <div 
            ref={leftTeamRef}
            className="space-y-6 md:space-y-8"
            style={{ opacity: 0 }}
          >
            <div className="p-8 md:p-12 rounded-none border-4 border-[#7B2BFF]/60 bg-[#0B0E16]/85 backdrop-blur-xl group relative overflow-hidden cursor-pointer">
              {/* Scan lines */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(123, 43, 255, 0.1) 25%, rgba(123, 43, 255, 0.1) 26%, transparent 27%, transparent 74%, rgba(123, 43, 255, 0.1) 75%, rgba(123, 43, 255, 0.1) 76%, transparent 77%, transparent)', backgroundSize: '100% 4px' }} />
              <div className="relative z-10">
                <Gamepad2 size={48} className="text-[#7B2BFF] mb-6" />
                <h3 className="font-orbitron font-black text-5xl md:text-6xl text-[#7B2BFF] mb-2 uppercase tracking-wider">128</h3>
                <p className="font-inter text-base md:text-lg text-[#A7B0C8]">Teams Competing</p>
              </div>
            </div>
            <div className="p-6 md:p-8 rounded-none border-2 border-[#7B2BFF]/30 bg-[#0B0E16]/60 backdrop-blur-xl">
              <p className="font-mono text-xs md:text-sm text-[#7B2BFF] uppercase">✓ ONLINE BATTLES</p>
            </div>
          </div>

          {/* Center - Controller + VS */}
          <div className="relative h-96 md:h-full min-h-96 flex flex-col items-center justify-center">
            {/* Concentric circles */}
            <div className="absolute w-80 h-80 border-4 border-[#00F0FF]/30 rounded-full" />
            <div className="absolute w-64 h-64 border-2 border-[#FF2BD6]/20 rounded-full" />
            
            <img
              ref={controllerRef}
              src="/esports_controller.png"
              alt="Gaming Controller"
              className="w-56 md:w-72 h-auto object-contain relative z-10"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 80px rgba(0, 240, 255, 0.8)) drop-shadow(0 0 40px rgba(255, 43, 214, 0.6))' }}
            />
            
            {/* VS Glitch */}
            <div 
              ref={vsRef}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ opacity: 0 }}
            >
              <h2 className="font-orbitron font-black text-8xl md:text-9xl text-[#F4F6FF]" style={{ textShadow: '6px 6px 0px #00F0FF, -6px -6px 0px #FF2BD6' }}>VS</h2>
            </div>
          </div>

          {/* Right team - HUGE stats */}
          <div 
            ref={rightTeamRef}
            className="space-y-6 md:space-y-8 text-right"
            style={{ opacity: 0 }}
          >
            <div className="p-8 md:p-12 rounded-none border-4 border-[#FF2BD6]/60 bg-[#0B0E16]/85 backdrop-blur-xl group relative overflow-hidden cursor-pointer">
              {/* Scan lines */}
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 43, 214, 0.1) 25%, rgba(255, 43, 214, 0.1) 26%, transparent 27%, transparent 74%, rgba(255, 43, 214, 0.1) 75%, rgba(255, 43, 214, 0.1) 76%, transparent 77%, transparent)', backgroundSize: '100% 4px' }} />
              <div className="relative z-10">
                <div className="flex justify-end mb-6">
                  <Trophy size={48} className="text-[#FF2BD6]" />
                </div>
                <h3 className="font-orbitron font-black text-5xl md:text-6xl text-[#FF2BD6] mb-2 uppercase tracking-wider">₹1L+</h3>
                <p className="font-inter text-base md:text-lg text-[#A7B0C8]">Prize Pool</p>
              </div>
            </div>
            <div className="p-6 md:p-8 rounded-none border-2 border-[#FF2BD6]/30 bg-[#0B0E16]/60 backdrop-blur-xl">
              <p className="font-mono text-xs md:text-sm text-[#FF2BD6] uppercase">📡 LIVE STREAMING</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
