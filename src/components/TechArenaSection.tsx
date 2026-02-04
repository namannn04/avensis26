import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Code, Zap, Palette } from 'lucide-react';

export default function TechArenaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const droneRef = useRef<HTMLImageElement>(null);
  const orbitsRef = useRef<HTMLDivElement>(null);

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
        { x: -150, skewX: 30, opacity: 0 },
        { x: 0, skewX: 0, opacity: 1, duration: 1 },
        0
      );

      tl.fromTo(
        droneRef.current,
        { scale: 0.2, opacity: 0, rotation: -360 },
        { scale: 1, opacity: 1, rotation: 0, duration: 1.2 },
        0.2
      );

      // Continuous rotating orbits
      gsap.to('.orbit-1', {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: 'none',
      });
      gsap.to('.orbit-2', {
        rotation: -360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
      gsap.to('.orbit-3', {
        rotation: 360,
        duration: 25,
        repeat: -1,
        ease: 'none',
      });

      tl.fromTo(
        orbitsRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8 },
        0.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen py-16 md:py-32 bg-[#05060B] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7B2BFF]/30 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#00F0FF]/20 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 px-4 md:px-8 w-full">
        {/* Title - Diagonal */}
        <div className="mb-12 md:mb-20" style={{ opacity: 0 }} ref={titleRef}>
          <h2 
            className="font-orbitron font-black text-6xl md:text-8xl text-[#F4F6FF] tracking-tighter leading-none mb-4"
            style={{ transform: 'skewX(-12deg)' }}
          >
            TECH
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B2BFF] via-[#00F0FF] to-[#FF2BD6]">ARENA</span>
          </h2>
          <p className="font-inter text-base md:text-lg text-[#A7B0C8] max-w-lg">Orbit the competition. Code. AI. Design.</p>
        </div>

        {/* Circular orbits - centered */}
        <div 
          ref={orbitsRef} 
          className="relative w-full max-w-4xl mx-auto aspect-square md:aspect-auto md:h-[700px] flex items-center justify-center"
          style={{ opacity: 0, perspective: '1200px' }}
        >
          {/* Center drone */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <img
              ref={droneRef}
              src="/tech_drone.png"
              alt="Tech Drone"
              className="w-32 md:w-48 h-auto object-contain"
              style={{ opacity: 0, filter: 'drop-shadow(0 0 60px rgba(123, 43, 255, 0.7)) drop-shadow(0 0 30px rgba(0, 240, 255, 0.4))' }}
            />
          </div>

          {/* Inner orbit */}
          <div 
            className="orbit-1 absolute rounded-full border-2 border-[#7B2BFF]/30"
            style={{ width: '280px', height: '280px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {[0, 120, 240].map((angle) => (
              <div
                key={`o1-${angle}`}
                className="absolute"
                style={{
                  left: '50%',
                  top: '-40px',
                  transform: `rotate(${angle}deg) translateY(-140px) rotate(-${angle}deg)`,
                }}
              >
                <div className="p-3 md:p-4 rounded-lg bg-[#0B0E16]/90 backdrop-blur-xl border border-[#7B2BFF]/40 text-center w-28 md:w-32 hover:scale-110 transition-transform">
                  <div className="text-xl md:text-2xl mb-1">{'<>'}</div>
                  <p className="font-orbitron text-xs md:text-sm text-[#7B2BFF] font-bold">CODING</p>
                </div>
              </div>
            ))}
          </div>

          {/* Middle orbit */}
          <div 
            className="orbit-2 absolute rounded-full border-2 border-[#00F0FF]/25"
            style={{ width: '420px', height: '420px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {[0, 120, 240].map((angle) => (
              <div
                key={`o2-${angle}`}
                className="absolute"
                style={{
                  left: '50%',
                  top: '-40px',
                  transform: `rotate(${angle}deg) translateY(-210px) rotate(-${angle}deg)`,
                }}
              >
                <div className="p-3 md:p-4 rounded-lg bg-[#0B0E16]/90 backdrop-blur-xl border border-[#00F0FF]/40 text-center w-28 md:w-32 hover:scale-110 transition-transform">
                  <div className="text-xl md:text-2xl mb-1">⚡</div>
                  <p className="font-orbitron text-xs md:text-sm text-[#00F0FF] font-bold">AI/ML</p>
                </div>
              </div>
            ))}
          </div>

          {/* Outer orbit */}
          <div 
            className="orbit-3 absolute rounded-full border-2 border-[#FF2BD6]/20"
            style={{ width: '560px', height: '560px', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {[0, 120, 240].map((angle) => (
              <div
                key={`o3-${angle}`}
                className="absolute"
                style={{
                  left: '50%',
                  top: '-40px',
                  transform: `rotate(${angle}deg) translateY(-280px) rotate(-${angle}deg)`,
                }}
              >
                <div className="p-3 md:p-4 rounded-lg bg-[#0B0E16]/90 backdrop-blur-xl border border-[#FF2BD6]/40 text-center w-28 md:w-32 hover:scale-110 transition-transform">
                  <div className="text-xl md:text-2xl mb-1">🎨</div>
                  <p className="font-orbitron text-xs md:text-sm text-[#FF2BD6] font-bold">DESIGN</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
