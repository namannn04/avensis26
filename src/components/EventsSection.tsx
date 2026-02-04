import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code, Gamepad2, Cpu, Music, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'all', label: 'All', icon: null },
  { id: 'tech', label: 'Tech', icon: Code },
  { id: 'gaming', label: 'Esports', icon: Gamepad2 },
  { id: 'robotics', label: 'Robotics', icon: Cpu },
  { id: 'funactivity', label: 'Fun & Activity', icon: Heart },
];

const events = [
  {
    id: 1,
    title: 'CodeCubicle',
    description: 'Solve algorithmic problems, optimize your code, and compete for the top spot.',
    category: 'tech',
    image: '/event_hackathon.jpg',
    tags: ['Competition', '24 Hours'],
  },
  {
    id: 2,
    title: 'HackAvensis',
    description: 'Build innovative solutions to real-world problems in a 24 -hour hackathon.',
    category: 'tech',
    image: '/event_ai.jpg',
    tags: ['AI/ML', 'Competition'],
  },
  {
    id: 3,
    title: 'Uxccelerate',
    description: 'Design competition for the next generation of digital experiences.',
    category: 'tech',
    image: '/event_design.jpg',
    tags: ['Design', 'Workshop'],
  },
  {
    id: 4,  
    title: 'CTF',
    description: 'Test your cybersecurity skills, solve challenges, and capture the flag before your rivals.',
    category: 'tech',
    image: '/event_bgmi.jpg',
    tags: ['Esports', '₹50K Prize'],
  },
  {
    id: 5,
    title: 'Chess Tournament',
    description: 'Outsmart your opponents, plan your moves, and claim the checkmate.',
    category: 'gaming',
    image: '/event_valorant.jpg',
    tags: ['Esports', '₹75K Prize'],
  },
  {
    id: 6,
    title: 'Clash Royale',
    description: 'Build your deck, outsmart your opponent, and battle for the crown in real-time strategy duels.',
    category: 'gaming',
    image: '/event_clashroyale.jpg',
    tags: ['Esports', 'Racing'],
  },
  {
    id: 7,
    title: 'BGMI Tournament',
    description: 'Squad up and battle for glory in the ultimate mobile esports tournament.',
    category: 'gaming',
    image: '/event_bgmi.jpg',
    tags: ['Esports', 'Combat'],
  },
  {
    id: 8,
    title: 'Robosoccer',
    description: 'Robotic soccer match where bots battle it out on the field.',
    category: 'robotics',
    image: '/event_robotics.jpg',
    tags: ['Robotics', 'Show'],
  },
  {
    id: 9,
    title: 'Roborace',
    description: 'Autonomous robots race against each other in a thrilling test of speed and engineering.',
    category: 'robotics',
    image: '/event_music.jpg',
    tags: ['Music', 'Live'],
  },
  {
    id: 10,
    title: 'Roboforge',
    description: 'Showcase your engineering skills by building and battling custom robots in a creative robotics challenge.',
    category: 'robotics',
    image: '/robotics.jpg',
    tags: ['Special', 'Feb 14'],
  },
  {
    id: 11,
    title: 'Ace and Chaos',
    description: 'A high-energy card and strategy game event where luck and skill collide for chaotic fun.',
    category: 'funactivity',
    image: '/event_aceandchaos.jpg',
    tags: ['Special', 'Feb 14'],
  },
  {
    id: 12,
    title: 'Murder Mystery',
    description: 'Unravel clues and solve the mystery in this thrilling whodunit experience.',
    category: 'funactivity',
    image: '/event_murdermystery.jpg',
    tags: ['Special', 'Feb 14'],
  },
  {
    id: 13,
    title: 'Hands off Standstill',
    description: 'Test your patience and precision—keep your hands off and see who stands still the longest.',
    category: 'funactivity',
    image: '/event_handsoffstandstill.jpg',
    tags: ['Special', 'Feb 14'],
  },
  {
    id: 14,
    title: 'Cup Challenge',
    description: 'Compete in a fast-paced cup stacking challenge—speed and accuracy win the day.',
    category: 'funactivity',
    image: '/event_cupchallenge.jpg',
    tags: ['Special', 'Feb 14'],
  },
];

export default function EventsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredEvents = activeCategory === 'all' 
    ? events 
    : events.filter(e => e.category === activeCategory);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation with glitch effect
      gsap.fromTo(
        headerRef.current,
        { y: 50, x: -50, opacity: 0, rotation: -5 },
        {
          y: 0,
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: 'back.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Filters animation - staggered wild entrance
      if (filtersRef.current) {
        const pills = filtersRef.current.querySelectorAll('button');
        gsap.fromTo(
          pills,
          { y: -30, opacity: 0, rotation: -20 },
          {
            y: 0,
            opacity: 1,
            rotation: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out',
            scrollTrigger: {
              trigger: filtersRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards animation - radical stagger with bounces
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.event-card');
        gsap.fromTo(
          cards,
          { y: 100, scale: 0.7, opacity: 0, rotation: 10 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            rotation: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'elastic.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [filteredEvents]);

  return (
    <section
      ref={sectionRef}
      id="events"
      className="relative w-full bg-[#05060B] py-16 md:py-24 lg:py-40 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF2BD6]/20 morph-blob blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-80 h-80 bg-[#00F0FF]/15 morph-blob blur-3xl" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        {/* RADICAL Header - Breaking bounds */}
        <div ref={headerRef} className="mb-12 md:mb-20 relative" style={{ opacity: 0 }}>
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-8">
            <h2 className="font-orbitron font-black text-[clamp(48px, 10vw, 120px)] leading-[1] text-transparent bg-clip-text bg-gradient-to-r from-[#FF2BD6] via-[#7B2BFF] to-[#00FF88] tracking-tighter">
              EVENTS
            </h2>
            <div className="flex flex-col gap-2">
              <p className="font-mono text-xs md:text-sm text-[#00FF88] font-bold tracking-widest">
                ▌ PICK YOUR CHAOS
              </p>
              <p className="font-inter text-sm md:text-base text-[#A7B0C8] max-w-sm">
                12+ events where innovation meets madness across every dimension.
              </p>
            </div>
          </div>
        </div>

        {/* Radical category filters - horizontal scroll with styling */}
        <div ref={filtersRef} className="mb-12 md:mb-16 flex flex-wrap gap-3 md:gap-4" style={{ opacity: 0 }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 md:px-7 py-3 md:py-4 rounded-full font-orbitron text-xs md:text-sm font-bold tracking-wider transition-all duration-300 cursor-pointer uppercase relative overflow-hidden group ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#7B2BFF] to-[#FF2BD6] text-white shadow-lg shadow-[#7B2BFF]/50'
                    : 'bg-[#0B0E16] text-[#A7B0C8] border border-[#7B2BFF]/30 hover:border-[#00FF88] hover:text-[#00FF88]'
                }`}
              >
                {Icon && <Icon size={16} className="relative z-10" />}
                <span className="relative z-10">{cat.label}</span>
                {activeCategory === cat.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#FF2BD6] to-[#7B2BFF] opacity-0 group-hover:opacity-20 transition-opacity" />
                )}
              </button>
            );
          })}
        </div>

        {/* CRAZY ASYMMETRIC GRID LAYOUT */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-max"
          style={{ opacity: 0 }}
        >
          {filteredEvents.map((event, idx) => {
            // Radical grid positioning for asymmetric layout
            const isLarge = idx === 0 || idx === 3 || idx === 7;
            const isWide = idx === 1 || idx === 6;
            
            return (
              <div
                key={event.id}
                className={`event-card group cursor-pointer relative overflow-hidden rounded-3xl transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  isLarge ? 'lg:col-span-2 lg:row-span-2' : isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
                style={{
                  background: `linear-gradient(135deg, rgba(123, 43, 255, 0.15) 0%, rgba(255, 43, 214, 0.1) 50%, rgba(0, 240, 255, 0.1) 100%)`,
                  border: `1px solid rgba(123, 43, 255, 0.3)`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Image background */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 brightness-50 group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05060B] via-[#05060B]/50 to-transparent" />
                </div>

                {/* Content overlay */}
                <div className={`relative h-full flex flex-col ${isLarge ? 'justify-between p-6 md:p-10' : 'justify-end p-5 md:p-7'}`}>
                  {/* Tags for larger cards */}
                  {isLarge && (
                    <div className="flex flex-wrap gap-2 mb-auto">
                      {event.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#00FF88]/20 backdrop-blur-sm rounded-full text-xs font-mono text-[#00FF88] border border-[#00FF88]/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title and description */}
                  <div>
                    <h3 className={`font-orbitron font-black text-[#F4F6FF] mb-2 group-hover:text-[#00FF88] transition-colors ${isLarge ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'}`}>
                      {event.title}
                    </h3>
                    
                    {(isLarge || isWide) && (
                      <p className="font-inter text-sm md:text-base text-[#A7B0C8] leading-relaxed line-clamp-3">
                        {event.description}
                      </p>
                    )}

                    {/* Compact tags for smaller cards */}
                    {!isLarge && !isWide && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {event.tags.slice(0, 1).map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-[#7B2BFF]/20 backdrop-blur-sm rounded text-[9px] font-mono text-[#7B2BFF]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA Arrow */}
                  <div className="mt-4 inline-flex items-center gap-2 text-[#00FF88] font-mono text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>EXPLORE</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-3xl" 
                  style={{
                    background: `radial-gradient(circle at center, rgba(123, 43, 255, 0.3) 0%, transparent 70%)`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
