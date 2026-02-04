import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Zap, Clock, Route } from 'lucide-react';

export default function RoboRaceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const vehicleRef = useRef<HTMLImageElement>(null);
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
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0
      );

      tl.fromTo(
        vehicleRef.current,
        { x: -100, scale: 0.8, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.8 },
        0.1
      );

      tl.fromTo(
        specsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        0.2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 bg-[#05060B] overflow-hidden"
    >
      {/* Background effects - Racing atmosphere */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFAA2B]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#7B2BFF]/15 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16 md:mb-24" style={{ opacity: 0 }} ref={titleRef}>
          <h2 className="font-orbitron font-black text-5xl md:text-7xl text-[#F4F6FF] tracking-tighter mb-4">
            ROBORACE TRACK
          </h2>
          <p className="font-inter text-lg md:text-xl text-[#A7B0C8] max-w-2xl">
            Autonomous robots pushing the limits of speed and precision on the ultimate track.
          </p>
        </div>

        {/* Racing layout - horizontal showcase */}
        <div className="relative">
          {/* Motion lines effect */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#FFAA2B]/30 to-transparent hidden md:block" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-6 items-center">
            {/* Vehicle - center focal point */}
            <div className="relative h-80 md:h-96 lg:col-span-2 lg:col-start-2 flex items-center justify-center" style={{ opacity: 0 }}>
              <div className="absolute w-96 h-96 bg-gradient-to-r from-[#FFAA2B]/30 via-[#7B2BFF]/20 to-transparent rounded-full blur-3xl" />
              <img
                ref={vehicleRef}
                src="/roborace_vehicle.png"
                alt="RoboRace Vehicle"
                className="w-full max-w-md h-auto object-contain relative z-10"
                style={{ opacity: 0, filter: 'drop-shadow(0 0 40px rgba(255, 170, 43, 0.4))' }}
              />
            </div>

            {/* Specs - left and right of vehicle */}
            <div ref={specsRef} className="lg:col-span-3 lg:col-start-1" style={{ opacity: 0 }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {[
                  { icon: Clock, label: 'BEST TIME', value: '45.2s', color: '#FFAA2B' },
                  { icon: Zap, label: 'MAX SPEED', value: '120 km/h', color: '#7B2BFF' },
                  { icon: Route, label: 'TRACK', value: '2.5 km', color: '#00F0FF' },
                ].map((spec, idx) => {
                  const Icon = spec.icon;
                  return (
                    <div
                      key={idx}
                      className="p-6 md:p-8 rounded-2xl border border-[#7B2BFF]/20 bg-[#0B0E16]/50 backdrop-blur-xl hover:border-[#7B2BFF]/50 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-3 rounded-lg flex-shrink-0" style={{ backgroundColor: `${spec.color}15` }}>
                          <Icon size={24} style={{ color: spec.color }} />
                        </div>
                        <span className="font-mono text-xs text-[#A7B0C8]">{spec.label}</span>
                      </div>
                      <h3 className="font-orbitron font-bold text-2xl md:text-3xl" style={{ color: spec.color }}>
                        {spec.value}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
