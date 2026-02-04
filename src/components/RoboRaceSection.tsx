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

      // Parallax speed effect on track
      gsap.fromTo(
        '.track-line',
        { x: -500 },
        {
          x: 500,
          duration: 3,
          repeat: -1,
          ease: 'none',
          stagger: 0.1,
        }
      );

      tl.fromTo(
        specsRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-16 md:py-24 bg-[#05060B] overflow-hidden flex items-center justify-center"
    >
      {/* Diagonal racing atmosphere */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FFAA2B]/25 rounded-full blur-3xl" style={{ transform: 'skewX(-20deg)' }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#7B2BFF]/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 px-4 md:px-8 w-full max-w-7xl mx-auto">
        {/* Skewed title */}
        <div className="mb-16 md:mb-32" style={{ opacity: 0 }} ref={titleRef}>
          <h2 
            className="font-orbitron font-black text-6xl md:text-8xl text-[#F4F6FF] tracking-tighter leading-none mb-4"
            style={{ transform: 'skewX(-18deg)' }}
          >
            ROBO
            <br />
            <span className="text-[#FFAA2B]">RACE</span>
          </h2>
          <p className="font-mono text-xs md:text-sm text-[#FFAA2B] uppercase tracking-widest">120 km/h • 45.2s • 2.5km track</p>
        </div>

        {/* Diagonal track visualization */}
        <div ref={trackRef} className="relative mb-16 md:mb-20 h-40 md:h-56 overflow-hidden rounded-2xl border-2 border-[#FFAA2B]/40 bg-[#0B0E16]/60 backdrop-blur-xl">
          {/* Moving track lines - parallax effect */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="track-line absolute w-[200%] h-1 bg-gradient-to-r from-transparent via-[#FFAA2B]/40 to-transparent"
              style={{
                top: `${(i * 100) / 8}%`,
                transform: 'skewX(-30deg)',
              }}
            />
          ))}
          
          {/* Center vehicle */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <img
              ref={vehicleRef}
              src="/roborace_vehicle.png"
              alt="RoboRace Vehicle"
              className="w-32 md:w-48 h-auto object-contain"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 50px rgba(255, 170, 43, 0.6))' }}
            />
          </div>
        </div>

        {/* Spec cards floating around */}
        <div ref={specsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6" style={{ opacity: 0 }}>
          {[
            { icon: Clock, label: 'BEST TIME', value: '45.2s', color: '#FFAA2B', pos: 'rotate-3' },
            { icon: Zap, label: 'MAX SPEED', value: '120 km/h', color: '#7B2BFF', pos: 'rotate-0' },
            { icon: Route, label: 'TRACK LENGTH', value: '2.5 km', color: '#00F0FF', pos: '-rotate-3' },
          ].map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div
                key={idx}
                className={`p-6 md:p-8 rounded-2xl border-2 bg-[#0B0E16]/80 backdrop-blur-xl hover:scale-110 transition-transform duration-300 ${spec.pos}`}
                style={{ borderColor: `${spec.color}60` }}
              >
                <div className="mb-4">
                  <Icon size={32} style={{ color: spec.color }} />
                </div>
                <p className="font-mono text-xs text-[#A7B0C8] mb-2 uppercase tracking-wider">{spec.label}</p>
                <h3 className="font-orbitron font-black text-3xl md:text-4xl" style={{ color: spec.color }}>
                  {spec.value}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
