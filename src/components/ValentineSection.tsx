import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Heart, Calendar, Gift, Music } from 'lucide-react';

export default function ValentineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const heartRef = useRef<HTMLImageElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
        taglineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.1
      );

      tl.fromTo(
        descriptionRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        0.15
      );

      tl.fromTo(
        heartRef.current,
        { scale: 0.9, opacity: 0, y: 40 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6 },
        0.2
      );

      itemRefs.current.forEach((item, i) => {
        if (item) {
          tl.fromTo(
            item,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5 },
            0.3 + i * 0.1
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    { icon: Calendar, label: 'Feb 12-13', description: 'Two days of celebration', color: '#FF2BD6' },
    { icon: Gift, label: 'Surprises', description: 'Special rewards and gifts', color: '#7B2BFF' },
    { icon: Music, label: 'Live Music', description: 'Amazing performances', color: '#00F0FF' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24 bg-[#05060B] overflow-hidden"
    >
      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center">
          <h2
            ref={titleRef}
            className="font-orbitron font-black text-4xl md:text-5xl text-[#F4F6FF] tracking-tight text-glow-magenta mb-2"
            style={{ opacity: 0 }}
          >
            VALENTINE WEEK
          </h2>
          <p
            ref={taglineRef}
            className="font-inter text-[#A7B0C8] text-base md:text-lg mb-4"
            style={{ opacity: 0 }}
          >
            Where hearts sync with circuits
          </p>
          <p
            ref={descriptionRef}
            className="font-inter text-[#A7B0C8] text-sm md:text-base max-w-2xl mx-auto"
            style={{ opacity: 0 }}
          >
            Celebrate love and connection with special events, surprises, and live performances during Valentine week.
          </p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Image */}
          <div className="flex items-center justify-center">
            <img
              ref={heartRef}
              src="/valentine_heart.png"
              alt="Circuit Heart"
              className="w-full max-w-xs md:max-w-sm h-auto object-contain floating"
              style={{ opacity: 0 }}
            />
          </div>

          {/* Right: Items */}
          <div className="space-y-4">
            {items.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) itemRefs.current[i] = el;
                  }}
                  className="cyber-card p-5 md:p-6 border-l-4 hover:scale-105 transition-transform duration-300"
                  style={{
                    opacity: 0,
                    borderLeftColor: item.color,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: `${item.color}15` }}>
                      <Icon size={24} style={{ color: item.color }} />
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-[#F4F6FF] mb-1">
                        {item.label}
                      </h3>
                      <p className="font-inter text-sm text-[#A7B0C8]">
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

      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#FF2BD6]/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
