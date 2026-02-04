import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Zap, Timer, MapPin } from 'lucide-react';

export default function RoboRaceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const vehicleRef = useRef<HTMLImageElement>(null);
  const specsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
      });

      tl.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 }
      );

      tl.fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.1
      );

      tl.fromTo(
        vehicleRef.current,
        { scale: 0.9, opacity: 0, x: 40 },
        { scale: 1, opacity: 1, x: 0, duration: 0.6 },
        0.2
      );

      specsRefs.current.forEach((spec, i) => {
        if (spec) {
          tl.fromTo(
            spec,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            0.3 + i * 0.1
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const specs = [
    { icon: Timer, label: 'Best Time', value: '45.2s', color: '#FFAA2B' },
    { icon: Zap, label: 'Max Speed', value: '120 km/h', color: '#7B2BFF' },
    { icon: MapPin, label: 'Track Length', value: '2.5 km', color: '#00F0FF' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 bg-[#05060B] overflow-hidden"
    >
      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2
            ref={titleRef}
            className="font-orbitron font-black text-4xl md:text-5xl text-[#F4F6FF] tracking-tight text-glow-amber mb-4"
            style={{ opacity: 0 }}
          >
            ROBORACE TRACK
          </h2>
          <p
            ref={descriptionRef}
            className="font-inter text-[#A7B0C8] text-base md:text-lg max-w-2xl"
            style={{ opacity: 0 }}
          >
            Autonomous robots race against each other in a thrilling test of speed and engineering excellence.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Image */}
          <div className="flex items-center justify-center">
            <img
              ref={vehicleRef}
              src="/roborace_vehicle.png"
              alt="RoboRace Vehicle"
              className="w-full max-w-xs md:max-w-sm h-auto object-contain floating"
              style={{ opacity: 0 }}
            />
          </div>

          {/* Right: Specifications */}
          <div className="space-y-4">
            {specs.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) specsRefs.current[i] = el;
                  }}
                  className="cyber-card p-5 md:p-6 border-l-4 hover:scale-105 transition-transform duration-300"
                  style={{
                    opacity: 0,
                    borderLeftColor: spec.color,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${spec.color}15` }}>
                      <Icon size={24} style={{ color: spec.color }} />
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-[#F4F6FF]">
                        {spec.label}
                      </h3>
                      <p className="font-mono text-lg md:text-xl font-bold mt-1" style={{ color: spec.color }}>
                        {spec.value}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#FFAA2B]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
