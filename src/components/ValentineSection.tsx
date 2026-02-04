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

      // Morphing heart animation
      gsap.to(heartRef.current, {
        scaleY: 1.15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Floating particles around heart
      gsap.to('.heart-particle', {
        opacity: 0.5,
        y: -100,
        rotation: 360,
        duration: 2,
        repeat: -1,
        stagger: 0.15,
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
          { x: -100, opacity: 0, rotation: -20 },
          { x: 0, opacity: 1, rotation: 0, duration: 0.7, stagger: 0.1 },
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
      className="relative w-full min-h-screen py-16 md:py-24 bg-[#05060B] overflow-hidden flex items-center justify-center"
    >
      {/* Romantic flowing background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#FF2BD6]/35 rounded-full blur-3xl morph-blob" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#7B2BFF]/20 rounded-full blur-3xl morph-blob" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 px-4 md:px-8 w-full max-w-7xl mx-auto">
        {/* Skewed romantic title */}
        <div className="text-center mb-16 md:mb-24" style={{ opacity: 0 }} ref={titleRef}>
          <h2 
            className="font-orbitron font-black text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#FF2BD6] via-[#7B2BFF] to-[#FF2BD6] tracking-tighter leading-none mb-4"
            style={{ transform: 'skewY(-8deg)' }}
          >
            LOVE
            <br />
            TECH
          </h2>
          <p className="font-inter text-base md:text-lg text-[#A7B0C8] max-w-xl mx-auto">Where hearts sync with circuits. Feb 12-13.</p>
        </div>

        {/* Heart with floating particles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left: Morphing heart with particles */}
          <div className="relative h-96 md:h-full min-h-96 flex items-center justify-center order-2 lg:order-1">
            {/* Heart glow */}
            <div className="absolute w-96 h-96 bg-gradient-to-br from-[#FF2BD6]/50 to-[#7B2BFF]/30 rounded-full blur-3xl" />
            
            {/* Floating particles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="heart-particle absolute w-2 md:w-3 h-2 md:h-3 rounded-full"
                style={{
                  backgroundColor: ['#FF2BD6', '#7B2BFF', '#00F0FF'][i % 3],
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}

            {/* Main heart */}
            <img
              ref={heartRef}
              src="/valentine_heart.png"
              alt="Circuit Heart"
              className="w-40 md:w-56 h-auto object-contain relative z-10"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 60px rgba(255, 43, 214, 0.7))' }}
            />
          </div>

          {/* Right: Flowing info cards */}
          <div ref={itemsGridRef} className="space-y-4 md:space-y-6 order-1 lg:order-2" style={{ opacity: 0 }}>
            {items.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="valentine-card p-6 md:p-8 rounded-2xl border-2 bg-[#0B0E16]/85 backdrop-blur-xl hover:scale-105 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  style={{ borderColor: `${item.color}80` }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity" style={{ background: `linear-gradient(135deg, ${item.color}, transparent)` }} />
                  
                  <div className="flex items-start gap-4 relative z-10">
                    <div 
                      className="p-3 md:p-4 rounded-xl flex-shrink-0 group-hover:scale-125 transition-transform duration-300"
                      style={{ backgroundColor: `${item.color}20`, border: `2px solid ${item.color}40` }}
                    >
                      <Icon size={32} style={{ color: item.color }} />
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
      </div>
    </section>
  );
}
