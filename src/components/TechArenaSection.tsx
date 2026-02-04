import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Code, Zap, Palette } from 'lucide-react';

export default function TechArenaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

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
        { x: -100, skewY: 10, opacity: 0 },
        { x: 0, skewY: 0, opacity: 1, duration: 0.8 },
        0
      );

      tl.fromTo(
        droneRef.current,
        { scale: 0.6, opacity: 0, rotation: -30 },
        { scale: 1, opacity: 1, rotation: 0, duration: 0.9 },
        0.1
      );

      [card1Ref, card2Ref, card3Ref].forEach((ref, i) => {
        tl.fromTo(
          ref.current,
          { y: 100 + i * 40, x: 150 - i * 50, opacity: 0, rotation: -25 + i * 15 },
          { y: 0, x: 0, opacity: 1, rotation: 0, duration: 0.7 },
          0.2 + i * 0.15
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#05060B] overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#7B2BFF]/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-[#00F0FF]/10 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Title - Large and skewed */}
        <h2
          ref={titleRef}
          className="font-orbitron font-black text-5xl sm:text-6xl md:text-7xl text-[#F4F6FF] tracking-tighter mb-8 md:mb-16 leading-none"
          style={{ opacity: 0 }}
        >
          TECH
          <br />
          <span className="text-[#7B2BFF]">ARENA</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Overlapping tilted cards */}
          <div className="relative h-96 md:h-[500px]">
            {/* Card 1 */}
            <div
              ref={card1Ref}
              className="absolute top-0 left-0 w-72 md:w-80 bg-gradient-to-br from-[#7B2BFF]/30 to-[#00F0FF]/20 border border-[#7B2BFF]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform -rotate-6 hover:rotate-0 transition-all duration-500 z-30 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#7B2BFF]/20">
                  <Code size={28} className="text-[#7B2BFF]" />
                </div>
                <h3 className="font-orbitron font-bold text-xl text-[#F4F6FF]">CODING</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8] leading-relaxed">
                Hackathons & competitive coding battles. Win prizes and glory.
              </p>
            </div>

            {/* Card 2 */}
            <div
              ref={card2Ref}
              className="absolute top-24 left-16 w-72 md:w-80 bg-gradient-to-br from-[#00F0FF]/30 to-[#FF2BD6]/20 border border-[#00F0FF]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform rotate-3 hover:rotate-0 transition-all duration-500 z-20 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#00F0FF]/20">
                  <Zap size={28} className="text-[#00F0FF]" />
                </div>
                <h3 className="font-orbitron font-bold text-xl text-[#F4F6FF]">AI/ML</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8] leading-relaxed">
                Machine learning challenges & AI model competitions.
              </p>
            </div>

            {/* Card 3 */}
            <div
              ref={card3Ref}
              className="absolute top-48 left-32 w-72 md:w-80 bg-gradient-to-br from-[#FF2BD6]/30 to-[#FFAA2B]/20 border border-[#FF2BD6]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform -rotate-2 hover:rotate-0 transition-all duration-500 z-10 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#FF2BD6]/20">
                  <Palette size={28} className="text-[#FF2BD6]" />
                </div>
                <h3 className="font-orbitron font-bold text-xl text-[#F4F6FF]">DESIGN</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8] leading-relaxed">
                UI/UX design wars & creative visualization contests.
              </p>
            </div>
          </div>

          {/* Right: Drone image with massive glow */}
          <div className="relative h-96 md:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-96 h-96 bg-gradient-to-r from-[#7B2BFF]/40 via-[#00F0FF]/30 to-[#FF2BD6]/20 rounded-full blur-3xl" />
            </div>
            <img
              ref={droneRef}
              src="/tech_drone.png"
              alt="Tech Drone"
              className="w-full max-w-md h-auto object-contain relative z-10 drop-shadow-2xl"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 50px rgba(123, 43, 255, 0.5))' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
