import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Zap, Timer, MapPin } from 'lucide-react';

export default function RoboRaceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const vehicleRef = useRef<HTMLImageElement>(null);
  const spec1Ref = useRef<HTMLDivElement>(null);
  const spec2Ref = useRef<HTMLDivElement>(null);
  const spec3Ref = useRef<HTMLDivElement>(null);

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
        { x: 150, skewY: 8, opacity: 0 },
        { x: 0, skewY: 0, opacity: 1, duration: 0.8 },
        0
      );

      tl.fromTo(
        vehicleRef.current,
        { scale: 0.5, opacity: 0, rotation: -40, x: -100 },
        { scale: 1, opacity: 1, rotation: 0, x: 0, duration: 1 },
        0.1
      );

      [spec1Ref, spec2Ref, spec3Ref].forEach((ref, i) => {
        tl.fromTo(
          ref.current,
          { y: 150, x: 80 - i * 60, opacity: 0, rotation: -35 + i * 20 },
          { y: 0, x: 0, opacity: 1, rotation: 0, duration: 0.8 },
          0.25 + i * 0.15
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const specs = [
    { icon: Timer, label: '45.2s', description: 'Best time on track', color: '#FFAA2B' },
    { icon: Zap, label: '120 km/h', description: 'Maximum speed', color: '#7B2BFF' },
    { icon: MapPin, label: '2.5 km', description: 'Track length', color: '#00F0FF' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 bg-[#05060B] overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFAA2B]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#7B2BFF]/15 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Title */}
        <h2
          ref={titleRef}
          className="font-orbitron font-black text-5xl sm:text-6xl md:text-7xl text-[#F4F6FF] tracking-tighter mb-12 md:mb-20 leading-none"
          style={{ opacity: 0 }}
        >
          ROBORACE
          <br />
          <span className="text-[#FFAA2B]">TRACK</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left: Specs with tilted cards */}
          <div className="relative h-96 md:h-[500px]">
            {/* Spec 1 */}
            <div
              ref={spec1Ref}
              className="absolute top-0 left-0 w-72 md:w-80 bg-gradient-to-br from-[#FFAA2B]/35 to-[#FF2BD6]/20 border border-[#FFAA2B]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform rotate-12 hover:rotate-0 transition-all duration-500 z-30 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#FFAA2B]/20">
                  <Timer size={28} className="text-[#FFAA2B]" />
                </div>
                <h3 className="font-orbitron font-bold text-2xl text-[#F4F6FF]">45.2s</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8]">Best lap time on track</p>
            </div>

            {/* Spec 2 */}
            <div
              ref={spec2Ref}
              className="absolute top-24 left-16 w-72 md:w-80 bg-gradient-to-br from-[#7B2BFF]/35 to-[#00F0FF]/20 border border-[#7B2BFF]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform -rotate-6 hover:rotate-0 transition-all duration-500 z-20 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#7B2BFF]/20">
                  <Zap size={28} className="text-[#7B2BFF]" />
                </div>
                <h3 className="font-orbitron font-bold text-2xl text-[#F4F6FF]">120</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8]">Maximum speed (km/h)</p>
            </div>

            {/* Spec 3 */}
            <div
              ref={spec3Ref}
              className="absolute top-48 left-32 w-72 md:w-80 bg-gradient-to-br from-[#00F0FF]/35 to-[#7B2BFF]/20 border border-[#00F0FF]/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 transform rotate-3 hover:rotate-0 transition-all duration-500 z-10 shadow-2xl cursor-pointer"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-2xl bg-[#00F0FF]/20">
                  <MapPin size={28} className="text-[#00F0FF]" />
                </div>
                <h3 className="font-orbitron font-bold text-2xl text-[#F4F6FF]">2.5</h3>
              </div>
              <p className="font-inter text-sm text-[#A7B0C8]">Track length (km)</p>
            </div>
          </div>

          {/* Right: Vehicle with glow */}
          <div className="relative h-96 md:h-[500px] flex items-center justify-center">
            <div className="absolute inset-0">
              <div className="absolute w-96 h-96 bg-gradient-to-br from-[#FFAA2B]/40 via-[#7B2BFF]/30 to-transparent rounded-full blur-3xl" />
            </div>
            <img
              ref={vehicleRef}
              src="/roborace_vehicle.png"
              alt="RoboRace Vehicle"
              className="w-full max-w-md h-auto object-contain relative z-10 drop-shadow-2xl"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 60px rgba(255, 170, 43, 0.5))' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
