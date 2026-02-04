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
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0
      );

      tl.fromTo(
        stageRef.current,
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8 },
        0.1
      );

      tl.fromTo(
        eventsGridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7 },
        0.2
      );

      const cards = eventsGridRef.current?.querySelectorAll('.event-card-cultural');
      if (cards) {
        gsap.fromTo(
          cards,
          { scale: 0.8, opacity: 0, y: 20 },
          { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          0.3
        );
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
      className="relative w-full py-24 md:py-40 bg-[#05060B] overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#FF2BD6]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#7B2BFF]/15 rounded-full blur-3xl" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16 md:mb-24" style={{ opacity: 0 }} ref={titleRef}>
          <h2 className="font-orbitron font-black text-5xl md:text-7xl text-[#F4F6FF] tracking-tighter mb-4">
            CULTURAL & FUN
          </h2>
          <p className="font-inter text-lg md:text-xl text-[#A7B0C8] max-w-2xl">
            Music, dance, comedy, and pure celebration. Unforgettable cultural moments await.
          </p>
        </div>

        {/* Two-column layout: Stage left, events right */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 md:gap-16 items-start">
          {/* Left: Stage image - takes 2 cols */}
          <div className="relative h-80 md:h-96 lg:col-span-2 flex items-center justify-center order-2 lg:order-1">
            <div className="absolute inset-0">
              <div className="absolute w-96 h-96 bg-gradient-to-br from-[#FF2BD6]/30 via-[#7B2BFF]/20 to-transparent rounded-full blur-3xl" />
            </div>
            <img
              ref={stageRef}
              src="/cultural_stage.png"
              alt="Cultural Stage"
              className="w-full max-w-xs h-auto object-contain relative z-10 rounded-2xl"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 40px rgba(255, 43, 214, 0.3))' }}
            />
          </div>

          {/* Right: Grid of events - 3 cols */}
          <div ref={eventsGridRef} className="lg:col-span-3 order-1 lg:order-2" style={{ opacity: 0 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {events.map((event, idx) => {
                const Icon = event.icon;
                return (
                  <div
                    key={idx}
                    className="event-card-cultural p-6 md:p-8 rounded-2xl border border-[#7B2BFF]/20 bg-[#0B0E16]/50 backdrop-blur-xl hover:border-[#7B2BFF]/50 hover:scale-105 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: `${event.color}15` }}>
                        <Icon size={28} style={{ color: event.color }} />
                      </div>
                      <h3 className="font-orbitron font-bold text-lg md:text-xl text-[#F4F6FF]">
                        {event.label}
                      </h3>
                    </div>
                    <p className="font-inter text-sm md:text-base text-[#A7B0C8]">
                      {event.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
