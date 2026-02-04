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
        { y: 100, skewY: -20, opacity: 0 },
        { y: 0, skewY: 0, opacity: 1, duration: 1 },
        0
      );

      tl.fromTo(
        heartRef.current,
        { scale: 0.1, opacity: 0, rotation: -360 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.2 },
        0.2
      );

      // Heart glitch pulse
      gsap.to(heartRef.current, {
        scaleY: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Glitch shake on heart
      gsap.to(heartRef.current, {
        x: '3px',
        duration: 0.06,
        repeat: -1,
        yoyo: true,
        repeatDelay: 1,
      });

      tl.fromTo(
        itemsGridRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        0.3
      );

      const cards = itemsGridRef.current?.querySelectorAll('.valentine-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { x: -80, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, stagger: 0.12 },
          0.4
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
      className="relative w-full min-h-screen py-20 md:py-32 bg-[#05060B] overflow-hidden"
    >
      {/* Glitch romantic grid */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 43, 214, 0.05) 25%, rgba(255, 43, 214, 0.05) 26%, transparent 27%, transparent 74%, rgba(255, 43, 214, 0.05) 75%, rgba(255, 43, 214, 0.05) 76%, transparent 77%, transparent)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF2BD6]/30 rounded-full blur-3xl" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B2BFF]/15 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 px-4 md:px-8 w-full max-w-7xl mx-auto">
        {/* HUGE glitch romantic title */}
        <div className="text-center mb-20 md:mb-28" style={{ opacity: 0 }} ref={titleRef}>
          <h2 
            className="font-orbitron font-black text-7xl md:text-9xl text-[#F4F6FF] tracking-tighter leading-none mb-4"
            style={{ textShadow: '5px 0px 0px #FF2BD6, -5px 0px 0px #7B2BFF' }}
          >
            LOVE
            <br />
            TECH
          </h2>
          <p className="font-mono text-sm md:text-base text-[#FF2BD6] uppercase tracking-widest mt-6">Feb 12-13 • Hearts Sync With Circuits</p>
        </div>

        {/* Heart with glitch effect + cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: HUGE pulsing heart with scan lines */}
          <div className="relative h-96 md:h-full min-h-96 flex items-center justify-center order-2 lg:order-1">
            {/* Heart glow circles */}
            <div className="absolute w-96 h-96 border-4 border-[#FF2BD6]/40 rounded-full" style={{ animation: 'pulse 2s infinite' }} />
            <div className="absolute w-72 h-72 border-2 border-[#7B2BFF]/20 rounded-full" style={{ animation: 'pulse 3s infinite 0.5s' }} />
            
            {/* Heart with scan line corruption */}
            <div className="relative">
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 43, 214, 0.15) 25%, rgba(255, 43, 214, 0.15) 26%, transparent 27%, transparent 74%, rgba(255, 43, 214, 0.15) 75%, rgba(255, 43, 214, 0.15) 76%, transparent 77%, transparent)', backgroundSize: '100% 4px' }} />
              <img
                ref={heartRef}
                src="/valentine_heart.png"
                alt="Circuit Heart"
                className="w-48 md:w-64 h-auto object-contain relative z-10"
                style={{ opacity: 0, filter: 'drop-shadow(0 0 100px rgba(255, 43, 214, 0.8)) drop-shadow(0 0 50px rgba(123, 43, 255, 0.6))' }}
              />
            </div>
          </div>

          {/* Right: HUGE glitch cards */}
          <div ref={itemsGridRef} className="space-y-6 md:space-y-8 order-1 lg:order-2" style={{ opacity: 0 }}>
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="valentine-card p-8 md:p-10 rounded-none border-4 bg-[#0B0E16]/85 backdrop-blur-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  style={{ borderColor: item.color }}
                >
                  {/* Scan lines effect */}
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, 0.08) 25%, rgba(255, 255, 255, 0.08) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, 0.08) 75%, rgba(255, 255, 255, 0.08) 76%, transparent 77%, transparent)', backgroundSize: '100% 4px' }} />

                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity" style={{ background: `linear-gradient(135deg, ${item.color}40, transparent)` }} />
                  
                  <div className="flex items-start gap-6 relative z-10">
                    <div 
                      className="p-4 md:p-5 rounded-none flex-shrink-0 group-hover:scale-125 transition-transform duration-300"
                      style={{ backgroundColor: `${item.color}25`, border: `2px solid ${item.color}` }}
                    >
                      <Icon size={40} style={{ color: item.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-orbitron font-black text-xl md:text-2xl text-[#F4F6FF] mb-2 uppercase tracking-wider">
                        {item.label}
                      </h3>
                      <p className="font-inter text-base md:text-lg text-[#A7B0C8]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
