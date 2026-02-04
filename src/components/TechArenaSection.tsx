import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Code, Zap, Palette } from 'lucide-react';

export default function TechArenaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

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
        leftColRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        0.1
      );

      tl.fromTo(
        rightColRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        0.15
      );

      tl.fromTo(
        droneRef.current,
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8 },
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
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B2BFF]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#00F0FF]/15 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16 md:mb-24" style={{ opacity: 0 }} ref={titleRef}>
          <h2 className="font-orbitron font-black text-5xl md:text-7xl text-[#F4F6FF] tracking-tighter mb-4 leading-tight">
            TECH ARENA
          </h2>
          <p className="font-inter text-lg md:text-xl text-[#A7B0C8] max-w-2xl">
            Master the art of code, AI, and design. Compete, learn, and dominate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left: Vertical stacked cards with space */}
          <div ref={leftColRef} className="space-y-6 md:space-y-8" style={{ opacity: 0 }}>
            {[
              { icon: Code, label: 'CODING', desc: 'Hackathons & competitive coding battles', color: '#7B2BFF' },
              { icon: Zap, label: 'AI/ML', desc: 'Machine learning challenges & AI models', color: '#00F0FF' },
              { icon: Palette, label: 'DESIGN', desc: 'UI/UX design wars & visualizations', color: '#FF2BD6' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="flex items-start gap-6 md:gap-8 p-6 md:p-8 rounded-2xl border border-[#7B2BFF]/20 bg-[#0B0E16]/50 backdrop-blur-xl hover:border-[#7B2BFF]/50 hover:bg-[#0B0E16]/80 transition-all duration-300"
                >
                  <div className="p-4 rounded-xl flex-shrink-0" style={{ backgroundColor: `${item.color}15`, borderColor: item.color }}>
                    <Icon size={32} style={{ color: item.color }} />
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-lg md:text-xl text-[#F4F6FF] mb-2">
                      {item.label}
                    </h3>
                    <p className="font-inter text-base text-[#A7B0C8]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Drone image with glow */}
          <div ref={rightColRef} className="relative h-96 md:h-full min-h-96 flex items-center justify-center" style={{ opacity: 0 }}>
            <div className="absolute w-96 h-96 bg-gradient-to-br from-[#7B2BFF]/30 via-[#00F0FF]/20 to-transparent rounded-full blur-3xl" />
            <img
              ref={droneRef}
              src="/tech_drone.png"
              alt="Tech Drone"
              className="w-full max-w-sm h-auto object-contain relative z-10"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 40px rgba(123, 43, 255, 0.4))' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
