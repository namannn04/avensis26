import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Users, Trophy, Radio, Gamepad2 } from 'lucide-react';

export default function EsportsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const controllerRef = useRef<HTMLImageElement>(null);
  const statsRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        controllerRef.current,
        { scale: 0.9, opacity: 0, x: -40 },
        { scale: 1, opacity: 1, x: 0, duration: 0.6 },
        0.2
      );

      statsRefs.current.forEach((stat, i) => {
        if (stat) {
          tl.fromTo(
            stat,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            0.3 + i * 0.1
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Users, label: '128 Teams', color: '#7B2BFF' },
    { icon: Trophy, label: '₹1L+ Prizes', color: '#FFAA2B' },
    { icon: Radio, label: 'Live Stream', color: '#FF2BD6' },
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
            className="font-orbitron font-black text-4xl md:text-5xl text-[#F4F6FF] tracking-tight text-glow-cyan mb-4"
            style={{ opacity: 0 }}
          >
            ESPORTS ZONE
          </h2>
          <p
            ref={descriptionRef}
            className="font-inter text-[#A7B0C8] text-base md:text-lg max-w-2xl"
            style={{ opacity: 0 }}
          >
            Squad up. Clutch plays. Tournament brackets and live streams. The arena awaits champions.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Image */}
          <div className="flex items-center justify-center">
            <img
              ref={controllerRef}
              src="/esports_controller.png"
              alt="Gaming Controller"
              className="w-full max-w-xs md:max-w-sm h-auto object-contain floating"
              style={{ opacity: 0 }}
            />
          </div>

          {/* Right: Stats */}
          <div className="space-y-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) statsRefs.current[i] = el;
                  }}
                  className="cyber-card p-5 md:p-6 border-l-4 hover:scale-105 transition-transform duration-300"
                  style={{
                    opacity: 0,
                    borderLeftColor: stat.color,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${stat.color}15` }}>
                      <Icon size={24} style={{ color: stat.color }} />
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-[#F4F6FF]">
                        {stat.label}
                      </h3>
                      <p className="font-inter text-sm text-[#A7B0C8]">
                        {stat.label === '128 Teams'
                          ? 'Teams competing globally'
                          : stat.label === '₹1L+ Prizes'
                          ? 'Prize pool for winners'
                          : 'Watch live tournaments'}
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
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00F0FF]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
