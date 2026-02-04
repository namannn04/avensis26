import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Zap, Clock, Route } from 'lucide-react';

export default function RoboRaceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLImageElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

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
        { x: 200, skewX: 25, opacity: 0 },
        { x: 0, skewX: 0, opacity: 1, duration: 1 },
        0
      );

      tl.fromTo(
        vehicleRef.current,
        { x: -300, scale: 0.3, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 1 },
        0.2
      );

      // Speed lines glitch animation
      gsap.fromTo(
        '.speed-line',
        { x: -600, opacity: 1 },
        {
          x: 600,
          opacity: 0,
          duration: 1.5,
          repeat: -1,
          ease: 'power1.inOut',
          stagger: 0.1,
        }
      );

      tl.fromTo(
        specsRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.4
      );

      // Speed counter glitch
      gsap.to('.speed-counter', {
        x: '2px',
        duration: 0.08,
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-20 md:py-32 bg-[#05060B] overflow-hidden"
    >
      {/* Glitch racing grid */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 170, 43, 0.05) 25%, rgba(255, 170, 43, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 170, 43, 0.05) 75%, rgba(255, 170, 43, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFAA2B]/25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7B2BFF]/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* HUGE glitch title */}
        <div className="mb-20 md:mb-28" style={{ opacity: 0 }} ref={titleRef}>
          <h2 
            className="font-orbitron font-black text-7xl md:text-9xl text-[#F4F6FF] tracking-tighter leading-none mb-4"
            style={{ textShadow: '5px 0px 0px #FFAA2B, -5px 0px 0px #7B2BFF' }}
          >
            ROBO
            <br />
            RACE
          </h2>
          <p className="font-mono text-sm md:text-base text-[#FFAA2B] uppercase tracking-widest mt-6">120 KM/H • 45.2S • 2.5KM TRACK</p>
        </div>

        {/* Speed lines track visualization */}
        <div className="relative mb-20 md:mb-28 h-48 md:h-64 overflow-hidden border-4 border-[#FFAA2B]/50 bg-[#0B0E16]/80 backdrop-blur-xl flex items-center justify-center">
          {/* Glitch speed lines */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="speed-line absolute h-1 w-96"
              style={{
                top: `${(i * 100) / 12}%`,
                backgroundColor: `rgba(255, 170, 43, ${0.1 + (i % 3) * 0.15})`,
              }}
            />
          ))}
          
          {/* Center vehicle HUGE */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="absolute w-96 h-96 border-4 border-[#FFAA2B]/20 rounded-full" style={{ animation: 'pulse 3s infinite' }} />
            <img
              ref={vehicleRef}
              src="/roborace_vehicle.png"
              alt="RoboRace Vehicle"
              className="w-64 md:w-80 h-auto object-contain relative z-10"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 100px rgba(255, 170, 43, 0.8)) drop-shadow(0 0 50px rgba(123, 43, 255, 0.5))' }}
            />
          </div>
        </div>

        {/* HUGE speed spec cards */}
        <div ref={specsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10" style={{ opacity: 0 }}>
          {[
            { icon: Clock, label: 'BEST TIME', value: '45.2s', color: '#FFAA2B' },
            { icon: Zap, label: 'MAX SPEED', value: '120 km/h', color: '#7B2BFF' },
            { icon: Route, label: 'TRACK LENGTH', value: '2.5 km', color: '#00F0FF' },
          ].map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div
                key={idx}
                className="speed-counter p-8 md:p-12 rounded-none border-4 bg-[#0B0E16]/85 backdrop-blur-xl relative overflow-hidden group cursor-pointer"
                style={{ borderColor: spec.color }}
              >
                {/* Scan lines */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.05) 25%, rgba(255, 255, 255, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0.05) 76%, transparent 77%, transparent)', backgroundSize: '100% 4px' }} />
                <div className="relative z-10">
                  <div className="text-6xl md:text-7xl mb-4" style={{ color: spec.color }}>
                    {spec.icon === Clock ? '⏱' : spec.icon === Zap ? '⚡' : '🏁'}
                  </div>
                  <p className="font-mono text-xs md:text-sm text-[#A7B0C8] mb-3 uppercase tracking-wider">{spec.label}</p>
                  <h3 className="font-orbitron font-black text-4xl md:text-5xl" style={{ color: spec.color, textShadow: `2px 2px 0px rgba(0,0,0,0.5)` }}>
                    {spec.value}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
