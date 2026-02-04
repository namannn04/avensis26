import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Heart, Calendar, Gift, Music } from 'lucide-react';

export default function ValentineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heartRef = useRef<HTMLImageElement>(null);
  const itemsGridRef = useRef<HTMLDivElement>(null);

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
        heartRef.current,
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.9 },
        0.1
      );

      // Floating heart animation
      gsap.to(heartRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      tl.fromTo(
        itemsGridRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.2
      );

      const cards = itemsGridRef.current?.querySelectorAll('.valentine-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1 },
          0.3
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    { icon: Calendar, label: 'Feb 12-13', description: 'Two days of pure celebration', color: '#FF2BD6' },
    { icon: Gift, label: 'Surprises', description: 'Special rewards & romantic gifts', color: '#7B2BFF' },
    { icon: Music, label: 'Live Music', description: 'Soulful performances & moments', color: '#00F0FF' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-40 bg-[#05060B] overflow-hidden"
    >
      {/* Background effects - romantic glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#FF2BD6]/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#7B2BFF]/20 rounded-full blur-3xl" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Title - Centered romantic */}
        <div className="text-center mb-16 md:mb-24" style={{ opacity: 0 }} ref={titleRef}>
          <h2 className="font-orbitron font-black text-5xl md:text-7xl text-[#F4F6FF] tracking-tighter mb-4">
            VALENTINE WEEK
          </h2>
          <p className="font-inter text-lg md:text-xl text-[#A7B0C8] max-w-2xl mx-auto">
            Where hearts sync with circuits. Love, tech, and unforgettable moments await.
          </p>
        </div>

        {/* Two-section layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
          {/* Left: Heart image - featured */}
          <div className="relative h-80 md:h-96 flex items-center justify-center">
            <div className="absolute w-full h-full">
              <div className="absolute w-96 h-96 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#FF2BD6]/40 via-[#7B2BFF]/30 to-transparent rounded-full blur-3xl" />
            </div>
            <img
              ref={heartRef}
              src="/valentine_heart.png"
              alt="Circuit Heart"
              className="w-full max-w-xs h-auto object-contain relative z-10"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 50px rgba(255, 43, 214, 0.5))' }}
            />
          </div>

          {/* Right: Items grid */}
          <div ref={itemsGridRef} className="space-y-4 md:space-y-6" style={{ opacity: 0 }}>
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="valentine-card p-6 md:p-8 rounded-2xl border border-[#FF2BD6]/20 bg-[#0B0E16]/50 backdrop-blur-xl hover:border-[#FF2BD6]/40 hover:bg-[#0B0E16]/70 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: `${item.color}15` }}>
                      <Icon size={28} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-orbitron font-bold text-lg md:text-xl text-[#F4F6FF] mb-2">
                        {item.label}
                      </h3>
                      <p className="font-inter text-sm md:text-base text-[#A7B0C8]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="text-center mt-16 md:mt-24 relative z-10">
          <p className="font-inter text-[#A7B0C8]/80 text-base md:text-lg">
            ❤️ Celebrate love in the digital age ❤️
          </p>
        </div>
      </div>
    </section>
  );
}
