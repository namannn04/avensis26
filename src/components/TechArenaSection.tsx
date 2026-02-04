import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Code, Zap, Palette } from 'lucide-react';

export default function TechArenaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 0.8 },
        0
      );

      tl.fromTo(
        droneRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        0.2
      );

      // Glitch drone shake effect
      gsap.to(droneRef.current, {
        x: '2px',
        duration: 0.05,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.3,
      });

      const cards = cardsRef.current?.querySelectorAll('.glitch-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: -50 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.15 },
          0.3
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 md:py-32 bg-[#05060B] overflow-hidden"
    >
      {/* Glitch grid background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 240, 255, 0.05) 25%, rgba(0, 240, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 240, 255, 0.05) 75%, rgba(0, 240, 255, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B2BFF]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00F0FF]/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto h-full">
        {/* HUGE Glitch title */}
        <div className="mb-20 md:mb-32" style={{ opacity: 0 }} ref={titleRef}>
          <div className="relative inline-block">
            <h2 className="font-orbitron font-black text-7xl md:text-9xl text-[#F4F6FF] tracking-tighter leading-none mb-6" style={{ textShadow: '4px 4px 0px #FF2BD6, -4px -4px 0px #00F0FF' }}>
              TECH
              <br />
              ARENA
            </h2>
          </div>
          <p className="font-mono text-sm md:text-base text-[#00F0FF] uppercase tracking-widest mt-6">{'> INITIATE COMPETITION MODE'}</p>
        </div>

        {/* Grid layout - Drone + 3 cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {/* Drone - Large full width */}
          <div className="md:col-span-3 relative h-80 md:h-96 flex items-center justify-center mb-8 p-8 md:p-12 border-4 border-[#00F0FF]/40 bg-[#0B0E16]/60 backdrop-blur-xl">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-80 h-80 border-4 border-[#00F0FF]/30 rounded-full absolute" style={{ animation: 'pulse 2s infinite' }} />
              <div className="w-64 h-64 border-2 border-[#FF2BD6]/20 rounded-full absolute" style={{ animation: 'pulse 3s infinite 0.5s' }} />
            </div>
            <img
              ref={droneRef}
              src="/tech_drone.png"
              alt="Tech Drone"
              className="w-56 md:w-72 h-auto object-contain relative z-10"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 100px rgba(0, 240, 255, 0.9)) drop-shadow(0 0 50px rgba(123, 43, 255, 0.7))' }}
            />
          </div>

          {/* Three HUGE tech cards */}
          {[
            { label: 'CODE BATTLES', desc: 'Competitive coding & hackathons', color: '#7B2BFF', code: 'for(;;) { code(); }' },
            { label: 'AI SYSTEMS', desc: 'Machine learning challenges', color: '#00F0FF', code: 'λ AI.execute()' },
            { label: 'DESIGN WAR', desc: 'UI/UX visualization contests', color: '#FF2BD6', code: '{ design: "wild" }' },
          ].map((item, idx) => {
            return (
              <div
                key={idx}
                className="glitch-card p-8 md:p-12 rounded-none border-4 bg-[#0B0E16]/85 backdrop-blur-xl relative group overflow-hidden cursor-pointer h-full"
                style={{ borderColor: item.color, opacity: 0 }}
              >
                {/* Scan lines effect */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(0, 240, 255, 0.08) 25%, rgba(0, 240, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 240, 255, 0.08) 75%, rgba(0, 240, 255, 0.08) 76%, transparent 77%, transparent)', backgroundSize: '100% 4px' }} />

                {/* Hover gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity" style={{ background: `linear-gradient(45deg, transparent 30%, ${item.color}40 100%)` }} />

                <div className="relative z-10">
                  <div className="text-6xl md:text-7xl mb-6 font-black" style={{ color: item.color }}>
                    {idx === 0 ? '✓' : idx === 1 ? '⚡' : '▲'}
                  </div>
                  <h3 className="font-orbitron font-black text-2xl md:text-4xl text-[#F4F6FF] mb-3 uppercase tracking-wider leading-tight">
                    {item.label}
                  </h3>
                  <p className="font-inter text-base md:text-lg text-[#A7B0C8] mb-6">
                    {item.desc}
                  </p>
                  <code className="block font-mono text-sm md:text-base p-4 bg-[#05060B]/80 border-2 rounded-none mt-6" style={{ borderColor: item.color, color: item.color }}>
                    {item.code}
                  </code>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
