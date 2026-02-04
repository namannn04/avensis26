import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Music, Drama, Mic } from 'lucide-react';

export default function CulturalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLImageElement>(null);
  const event1Ref = useRef<HTMLDivElement>(null);
  const event2Ref = useRef<HTMLDivElement>(null);
  const event3Ref = useRef<HTMLDivElement>(null);

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
        { y: -100, skewY: -10, opacity: 0 },
        { y: 0, skewY: 0, opacity: 1, duration: 0.9 },
        0
      );

      tl.fromTo(
        stageRef.current,
        { scale: 0.6, opacity: 0, rotation: 30, x: -100 },
        { scale: 1, opacity: 1, rotation: 0, x: 0, duration: 0.95 },
        0.1
      );

      [event1Ref, event2Ref, event3Ref].forEach((ref, i) => {
        tl.fromTo(
          ref.current,
          { y: 120 + i * 45, x: 150 - i * 70, opacity: 0, rotation: -30 + i * 25 },
          { y: 0, x: 0, opacity: 1, rotation: 0, duration: 0.8 },
          0.2 + i * 0.15
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const events = [
    { icon: Music, label: 'Music', description: 'Live performances & concerts', color: '#FF2BD6' },
    { icon: Drama, label: 'Dance', description: 'Dance battles & shows', color: '#7B2BFF' },
    { icon: Mic, label: 'Open Mic', description: 'Comedy & spoken word', color: '#00F0FF' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#05060B] overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#FF2BD6]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7B2BFF]/15 rounded-full blur-3xl" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-orbitron font-black text-5xl sm:text-6xl md:text-7xl text-[#F4F6FF] tracking-tighter mb-12 md:mb-20 leading-none"
          style={{ opacity: 0 }}
        >
          CULTURAL
          <br />
          <span className="text-[#FF2BD6]">& FUN</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: Stage image */}
          <div className="relative h-96 md:h-[500px] flex items-center justify-center order-2 md:order-1">
            <div className="absolute inset-0">
              <div className="absolute w-full h-full bg-gradient-to-tl from-[#FF2BD6]/40 via-[#7B2BFF]/20 to-transparent rounded-full blur-3xl" />
            </div>
            <img
              ref={stageRef}
              src="/cultural_stage.png"
              alt="Cultural Stage"
              className="w-full max-w-md h-auto object-contain relative z-10 drop-shadow-2xl rounded-2xl"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 60px rgba(255, 43, 214, 0.5))' }}
            />
          </div>

          {/* Right: Tilted event cards */}
          <div className="relative h-96 md:h-[500px] order-1 md:order-2">
            {/* Event 1 */}
            <div
              ref={event1Ref}
              className="absolute top-0 right-0 w-72 md:w-80 bg-gradient-to-br from-[#FF2BD6]/35 to-[#7B2BFF]/20 border border-[#FF2BD6]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform -rotate-8 hover:rotate-0 transition-all duration-500 z-30 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#FF2BD6]/20">
                  <Music size={28} className="text-[#FF2BD6]" />
                </div>
                <h3 className="font-orbitron font-bold text-xl text-[#F4F6FF]">MUSIC</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8]">Live performances & concerts</p>
            </div>

            {/* Event 2 */}
            <div
              ref={event2Ref}
              className="absolute top-24 right-16 w-72 md:w-80 bg-gradient-to-br from-[#7B2BFF]/35 to-[#00F0FF]/20 border border-[#7B2BFF]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform rotate-4 hover:rotate-0 transition-all duration-500 z-20 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#7B2BFF]/20">
                  <Drama size={28} className="text-[#7B2BFF]" />
                </div>
                <h3 className="font-orbitron font-bold text-xl text-[#F4F6FF]">DANCE</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8]">Dance battles & shows</p>
            </div>

            {/* Event 3 */}
            <div
              ref={event3Ref}
              className="absolute top-48 right-32 w-72 md:w-80 bg-gradient-to-br from-[#00F0FF]/35 to-[#FF2BD6]/20 border border-[#00F0FF]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform -rotate-2 hover:rotate-0 transition-all duration-500 z-10 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#00F0FF]/20">
                  <Mic size={28} className="text-[#00F0FF]" />
                </div>
                <h3 className="font-orbitron font-bold text-xl text-[#F4F6FF]">OPEN MIC</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8]">Comedy & spoken word</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
