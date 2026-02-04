import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Gamepad2, Trophy, Eye } from 'lucide-react';

export default function EsportsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const controllerRef = useRef<HTMLImageElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);

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
        controllerRef.current,
        { scale: 0.8, opacity: 0, x: -30 },
        { scale: 1, opacity: 1, x: 0, duration: 0.8 },
        0.1
      );

      tl.fromTo(
        statsContainerRef.current,
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
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#00F0FF]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-[#FF2BD6]/15 rounded-full blur-3xl" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-16 md:mb-24" style={{ opacity: 0 }} ref={titleRef}>
          <h2 className="font-orbitron font-black text-5xl md:text-7xl text-[#F4F6FF] tracking-tighter mb-4">
            ESPORTS ZONE
          </h2>
          <p className="font-inter text-lg md:text-xl text-[#A7B0C8] max-w-2xl">
            128 teams. ₹1L+ prizes. Live tournaments where champions are made.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-center">
          {/* Left: Controller */}
          <div className="relative h-80 md:h-96 flex items-center justify-center lg:col-span-1" style={{ opacity: 0 }}>
            <div className="absolute w-80 h-80 bg-[#00F0FF]/20 rounded-full blur-3xl" />
            <img
              ref={controllerRef}
              src="/esports_controller.png"
              alt="Gaming Controller"
              className="w-full max-w-xs h-auto object-contain relative z-10"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 40px rgba(0, 240, 255, 0.4))' }}
            />
          </div>

          {/* Middle: VS divider */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-4">
            <div className="w-1 h-24 bg-gradient-to-b from-[#00F0FF] via-[#7B2BFF] to-[#FF2BD6]" />
            <span className="font-orbitron font-black text-4xl text-[#00F0FF]">VS</span>
            <div className="w-1 h-24 bg-gradient-to-t from-[#00F0FF] via-[#7B2BFF] to-[#FF2BD6]" />
          </div>

          {/* Right: Stats in grid */}
          <div ref={statsContainerRef} className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4 md:gap-6" style={{ opacity: 0 }}>
            {[
              { icon: Gamepad2, label: '128 Teams', desc: 'Competing globally', color: '#7B2BFF' },
              { icon: Trophy, label: '₹1L+ Prize', desc: 'Pool for champions', color: '#FFAA2B' },
              { icon: Eye, label: 'Live Stream', desc: 'Watch tournaments', color: '#FF2BD6' },
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="p-6 md:p-8 rounded-2xl border border-[#7B2BFF]/20 bg-[#0B0E16]/50 backdrop-blur-xl hover:border-[#7B2BFF]/50 transition-all duration-300 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl" style={{ backgroundColor: `${stat.color}15` }}>
                      <Icon size={28} style={{ color: stat.color }} />
                    </div>
                  </div>
                  <h3 className="font-orbitron font-bold text-lg md:text-xl text-[#F4F6FF] mb-2">
                    {stat.label}
                  </h3>
                  <p className="font-inter text-sm text-[#A7B0C8]">
                    {stat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
