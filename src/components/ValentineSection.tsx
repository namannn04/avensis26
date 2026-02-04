import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Heart, Calendar, Gift, Music } from 'lucide-react';

export default function ValentineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heartRef = useRef<HTMLImageElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);
  const item3Ref = useRef<HTMLDivElement>(null);

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
        { y: -120, skewX: 8, opacity: 0 },
        { y: 0, skewX: 0, opacity: 1, duration: 0.9 },
        0
      );

      tl.fromTo(
        heartRef.current,
        { scale: 0.4, opacity: 0, rotation: -50, y: 100 },
        { scale: 1, opacity: 1, rotation: 0, y: 0, duration: 1.1 },
        0.15
      );

      [item1Ref, item2Ref, item3Ref].forEach((ref, i) => {
        tl.fromTo(
          ref.current,
          { y: 150, x: -120 + i * 80, opacity: 0, rotation: 40 - i * 25 },
          { y: 0, x: 0, opacity: 1, rotation: 0, duration: 0.8 },
          0.3 + i * 0.15
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const items = [
    { icon: Calendar, label: 'Feb 12-13', description: 'Two days of love', color: '#FF2BD6' },
    { icon: Gift, label: 'Surprises', description: 'Special rewards & gifts', color: '#7B2BFF' },
    { icon: Music, label: 'Live Music', description: 'Amazing performances', color: '#00F0FF' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#05060B] overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#FF2BD6]/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-[#7B2BFF]/18 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-orbitron font-black text-5xl sm:text-6xl md:text-7xl text-[#F4F6FF] tracking-tighter mb-12 md:mb-20 text-center leading-none"
          style={{ opacity: 0 }}
        >
          VALENTINE
          <br />
          <span className="text-[#FF2BD6]">WEEK</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: Heart image with massive glow */}
          <div className="relative h-96 md:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0">
              <div className="absolute w-96 h-96 bg-gradient-to-br from-[#FF2BD6]/50 via-[#7B2BFF]/30 to-transparent rounded-full blur-3xl" />
            </div>
            <img
              ref={heartRef}
              src="/valentine_heart.png"
              alt="Circuit Heart"
              className="w-full max-w-md h-auto object-contain relative z-10 drop-shadow-2xl floating"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 70px rgba(255, 43, 214, 0.7))' }}
            />
          </div>

          {/* Right: Tilted item cards */}
          <div className="relative h-96 md:h-[500px]">
            {/* Item 1 */}
            <div
              ref={item1Ref}
              className="absolute top-0 right-0 w-72 md:w-80 bg-gradient-to-br from-[#FF2BD6]/35 to-[#7B2BFF]/20 border border-[#FF2BD6]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform -rotate-10 hover:rotate-0 transition-all duration-500 z-30 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#FF2BD6]/20">
                  <Calendar size={28} className="text-[#FF2BD6]" />
                </div>
                <h3 className="font-orbitron font-bold text-xl text-[#F4F6FF]">Feb 12-13</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8]">Two days of celebration</p>
            </div>

            {/* Item 2 */}
            <div
              ref={item2Ref}
              className="absolute top-32 right-16 w-72 md:w-80 bg-gradient-to-br from-[#7B2BFF]/35 to-[#00F0FF]/20 border border-[#7B2BFF]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform rotate-5 hover:rotate-0 transition-all duration-500 z-20 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#7B2BFF]/20">
                  <Gift size={28} className="text-[#7B2BFF]" />
                </div>
                <h3 className="font-orbitron font-bold text-xl text-[#F4F6FF]">Surprises</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8]">Special rewards & gifts</p>
            </div>

            {/* Item 3 */}
            <div
              ref={item3Ref}
              className="absolute top-64 right-32 w-72 md:w-80 bg-gradient-to-br from-[#00F0FF]/35 to-[#FF2BD6]/20 border border-[#00F0FF]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform -rotate-4 hover:rotate-0 transition-all duration-500 z-10 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#00F0FF]/20">
                  <Music size={28} className="text-[#00F0FF]" />
                </div>
                <h3 className="font-orbitron font-bold text-xl text-[#F4F6FF]">Live Music</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8]">Amazing performances</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <div className="text-center mt-16 md:mt-20 relative z-10">
        <p className="font-inter text-[#A7B0C8] text-base md:text-lg italic">
          Where hearts sync with circuits
        </p>
      </div>
    </section>
  );
}
