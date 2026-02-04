import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Users, Trophy, Radio } from 'lucide-react';

export default function EsportsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const controllerRef = useRef<HTMLImageElement>(null);
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const stat3Ref = useRef<HTMLDivElement>(null);

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
        { y: -100, skewY: -12, opacity: 0 },
        { y: 0, skewY: 0, opacity: 1, duration: 0.9 },
        0
      );

      tl.fromTo(
        controllerRef.current,
        { scale: 0.5, opacity: 0, rotation: 45 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1 },
        0.1
      );

      [stat1Ref, stat2Ref, stat3Ref].forEach((ref, i) => {
        tl.fromTo(
          ref.current,
          { y: 120 + i * 50, x: -150 + i * 80, opacity: 0, rotation: 30 - i * 20 },
          { y: 0, x: 0, opacity: 1, rotation: 0, duration: 0.8 },
          0.2 + i * 0.15
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Users, label: '128 Teams', value: 'Competing', color: '#7B2BFF' },
    { icon: Trophy, label: '₹1L+ Prizes', value: 'Prize Pool', color: '#FFAA2B' },
    { icon: Radio, label: 'Live Stream', value: 'Broadcasting', color: '#FF2BD6' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#05060B] overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00F0FF]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-[#FF2BD6]/15 rounded-full blur-3xl" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-orbitron font-black text-5xl sm:text-6xl md:text-7xl text-[#F4F6FF] tracking-tighter mb-12 md:mb-20 leading-none"
          style={{ opacity: 0 }}
        >
          ESPORTS
          <br />
          <span className="text-[#00F0FF]">ZONE</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: Controller with glow */}
          <div className="relative h-96 md:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0">
              <div className="absolute w-full h-full bg-gradient-to-br from-[#00F0FF]/30 via-[#FF2BD6]/20 to-[#7B2BFF]/10 rounded-full blur-3xl" />
            </div>
            <img
              ref={controllerRef}
              src="/esports_controller.png"
              alt="Gaming Controller"
              className="w-full max-w-md h-auto object-contain relative z-10 drop-shadow-2xl"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 60px rgba(0, 240, 255, 0.6))' }}
            />
          </div>

          {/* Right: Tilted overlapping stat cards */}
          <div className="relative h-96 md:h-[500px]">
            {/* Stat 1 */}
            <div
              ref={stat1Ref}
              className="absolute top-0 right-0 w-72 md:w-80 bg-gradient-to-br from-[#7B2BFF]/35 to-[#FF2BD6]/20 border border-[#7B2BFF]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform -rotate-12 hover:rotate-0 transition-all duration-500 z-30 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#7B2BFF]/20">
                  <Users size={28} className="text-[#7B2BFF]" />
                </div>
                <h3 className="font-orbitron font-bold text-2xl text-[#F4F6FF]">128</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8]">Teams competing globally</p>
            </div>

            {/* Stat 2 */}
            <div
              ref={stat2Ref}
              className="absolute top-32 right-16 w-72 md:w-80 bg-gradient-to-br from-[#FFAA2B]/35 to-[#FF2BD6]/20 border border-[#FFAA2B]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform rotate-6 hover:rotate-0 transition-all duration-500 z-20 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#FFAA2B]/20">
                  <Trophy size={28} className="text-[#FFAA2B]" />
                </div>
                <h3 className="font-orbitron font-bold text-2xl text-[#F4F6FF]">₹1L+</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8]">Prize pool for winners</p>
            </div>

            {/* Stat 3 */}
            <div
              ref={stat3Ref}
              className="absolute top-64 right-32 w-72 md:w-80 bg-gradient-to-br from-[#FF2BD6]/35 to-[#00F0FF]/20 border border-[#FF2BD6]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform -rotate-3 hover:rotate-0 transition-all duration-500 z-10 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#FF2BD6]/20">
                  <Radio size={28} className="text-[#FF2BD6]" />
                </div>
                <h3 className="font-orbitron font-bold text-lg text-[#F4F6FF]">Live</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8]">Watch live tournaments</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
