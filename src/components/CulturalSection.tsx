import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Music, Drama, Mic, Sparkles } from 'lucide-react';

export default function CulturalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLImageElement>(null);
  const eventsGridRef = useRef<HTMLDivElement>(null);

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
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        0
      );

      tl.fromTo(
        stageRef.current,
        { scale: 0.4, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.9 },
        0.2
      );

      // Pixelated burst of cards
      const cards = eventsGridRef.current?.querySelectorAll('.event-card-cultural');
      if (cards) {
        cards.forEach((card, idx) => {
          const angle = (idx / Math.max(cards.length, 1)) * Math.PI * 2;
          const x = Math.cos(angle) * 250;
          const y = Math.sin(angle) * 250;
          
          tl.fromTo(
            card,
            { x, y, scale: 0, opacity: 0 },
            { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.7 },
            0.3
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const events = [
    { icon: Music, label: 'MUSIC', description: 'Live performances & concerts', color: '#FF2BD6' },
    { icon: Drama, label: 'DANCE', description: 'Dance battles & shows', color: '#7B2BFF' },
    { icon: Mic, label: 'OPEN MIC', description: 'Comedy & spoken word', color: '#00F0FF' },
    { icon: Sparkles, label: 'SURPRISES', description: 'Amazing experiences', color: '#FFAA2B' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 md:py-32 bg-[#05060B] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Glitch grid background */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 43, 214, 0.05) 25%, rgba(255, 43, 214, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 43, 214, 0.05) 75%, rgba(255, 43, 214, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF2BD6]/25 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#7B2BFF]/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 px-4 md:px-8 w-full max-w-6xl mx-auto">
        {/* HUGE glitch title */}
        <div className="mb-20 md:mb-32 text-center" style={{ opacity: 0 }} ref={titleRef}>
          <h2 
            className="font-orbitron font-black text-7xl md:text-9xl text-[#F4F6FF] tracking-tighter leading-none mb-4"
            style={{ textShadow: '6px 0px 0px #FF2BD6, -6px 0px 0px #7B2BFF' }}
          >
            CULTURAL
            <br />
            & FUN
          </h2>
          <p className="font-mono text-sm md:text-base text-[#FF2BD6] uppercase tracking-widest mt-6">Music • Dance • Comedy • Chaos</p>
        </div>

        {/* Center stage with radiating cards */}
        <div className="relative w-full max-w-2xl mx-auto mb-16 h-96 md:h-[520px]">
          {/* Center stage HUGE */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative w-56 md:w-80 h-56 md:h-80 flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full border-4 border-[#FF2BD6]/40" style={{ animation: 'pulse 2s infinite' }} />
              <div className="absolute w-4/5 h-4/5 rounded-full border-2 border-[#7B2BFF]/20" style={{ animation: 'pulse 3s infinite 0.5s' }} />
              <img
                ref={stageRef}
                src="/cultural_stage.png"
                alt="Cultural Stage"
                className="w-48 md:w-64 h-auto object-contain relative z-10"
                style={{ opacity: 0, filter: 'drop-shadow(0 0 80px rgba(255, 43, 214, 0.7)) drop-shadow(0 0 40px rgba(123, 43, 255, 0.5))' }}
              />
            </div>
          </div>

          {/* Radiating glitch cards - pixelated burst */}
          <div ref={eventsGridRef} className="absolute inset-0" style={{ opacity: 0 }}>
            {events.map((event, idx) => {
              const Icon = event.icon;
              const angle = (idx / Math.max(events.length, 1)) * Math.PI * 2;
              const x = Math.cos(angle) * 220;
              const y = Math.sin(angle) * 220;
              
              return (
                <div
                  key={idx}
                  className="event-card-cultural absolute top-1/2 left-1/2 w-44 md:w-56 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <div 
                    className="p-6 md:p-8 rounded-none border-4 bg-[#0B0E16]/90 backdrop-blur-xl hover:scale-110 transition-transform duration-300 cursor-pointer text-center relative overflow-hidden group"
                    style={{ borderColor: event.color }}
                  >
                    {/* Scan lines */}
                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.08) 75%, rgba(255, 255, 255, 0.08) 76%, transparent 77%, transparent)', backgroundSize: '100% 4px' }} />
                    <div className="relative z-10">
                      <div className="text-5xl md:text-6xl mb-4" style={{ color: event.color }}>
                        {idx === 0 ? '🎵' : idx === 1 ? '🎭' : idx === 2 ? '🎤' : '✨'}
                      </div>
                      <h3 className="font-orbitron font-black text-lg md:text-xl text-[#F4F6FF] mb-2 uppercase tracking-wider">
                        {event.label}
                      </h3>
                      <p className="font-inter text-xs md:text-sm text-[#A7B0C8]">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
