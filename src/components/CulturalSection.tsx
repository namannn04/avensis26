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
        { y: -80, skewX: 30, opacity: 0 },
        { y: 0, skewX: 0, opacity: 1, duration: 1 },
        0
      );

      tl.fromTo(
        stageRef.current,
        { scale: 0.2, opacity: 0, rotation: -180 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1 },
        0.2
      );

      // Radial explosion of cards
      const cards = eventsGridRef.current?.querySelectorAll('.event-card-cultural');
      if (cards) {
        cards.forEach((card, idx) => {
          const angle = (idx / cards.length) * Math.PI * 2;
          const x = Math.cos(angle) * 200;
          const y = Math.sin(angle) * 200;
          
          tl.fromTo(
            card,
            { x, y, scale: 0, opacity: 0, rotation: 360 },
            { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, duration: 0.8 },
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
      className="relative w-full min-h-screen py-16 md:py-24 bg-[#05060B] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Organic circular background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF2BD6]/30 rounded-full blur-3xl morph-blob" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#7B2BFF]/20 rounded-full blur-3xl morph-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#00FF88]/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 px-4 md:px-8 w-full max-w-6xl mx-auto">
        {/* Skewed title */}
        <div className="mb-20 md:mb-32 text-center" style={{ opacity: 0 }} ref={titleRef}>
          <h2 
            className="font-orbitron font-black text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF2BD6] via-[#7B2BFF] to-[#00FF88] tracking-tighter leading-none mb-4"
            style={{ transform: 'skewY(-10deg)' }}
          >
            CULTURAL
            <br />
            &<br />
            FUN
          </h2>
          <p className="font-inter text-base md:text-lg text-[#A7B0C8]">Radiate. Celebrate. Transform.</p>
        </div>

        {/* Circular radial layout */}
        <div className="relative w-full max-w-xl mx-auto mb-16 md:mb-20 h-96 md:h-[500px]">
          {/* Center stage */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="relative w-40 md:w-56 h-40 md:h-56 flex items-center justify-center">
              <div className="absolute w-full h-full rounded-full border-2 border-[#FF2BD6]/30 animate-pulse" />
              <img
                ref={stageRef}
                src="/cultural_stage.png"
                alt="Cultural Stage"
                className="w-32 md:w-44 h-auto object-contain relative z-10"
                style={{ opacity: 0, filter: 'drop-shadow(0 0 40px rgba(255, 43, 214, 0.5))' }}
              />
            </div>
          </div>

          {/* Radiating event cards */}
          <div ref={eventsGridRef} className="absolute inset-0" style={{ opacity: 0 }}>
            {events.map((event, idx) => {
              const Icon = event.icon;
              const angle = (idx / events.length) * Math.PI * 2;
              const x = Math.cos(angle) * 180;
              const y = Math.sin(angle) * 180;
              
              return (
                <div
                  key={idx}
                  className="event-card-cultural absolute top-1/2 left-1/2 w-40 md:w-48 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <div 
                    className="p-4 md:p-6 rounded-2xl border-2 bg-[#0B0E16]/90 backdrop-blur-xl hover:scale-125 transition-transform duration-300 cursor-pointer text-center"
                    style={{ borderColor: `${event.color}70` }}
                  >
                    <div className="text-3xl md:text-4xl mb-2">
                      <Icon size={32} style={{ color: event.color, margin: '0 auto' }} />
                    </div>
                    <h3 className="font-orbitron font-bold text-sm md:text-base text-[#F4F6FF] mb-1">
                      {event.label}
                    </h3>
                    <p className="font-inter text-xs md:text-sm text-[#A7B0C8]">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom text */}
        <div className="text-center">
          <p className="font-mono text-xs md:text-sm text-[#00FF88] uppercase tracking-widest">
            ★ Experience the pulse ★
          </p>
        </div>
      </div>
    </section>
  );
}
