import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Code, Gamepad2, Cpu, Music, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { id: 'all', label: 'All', icon: null },
  { id: 'tech', label: 'Tech', icon: Code },
  { id: 'esports', label: 'Esports', icon: Gamepad2 },
  { id: 'robotics', label: 'Robotics', icon: Cpu },
  { id: 'cultural', label: 'Cultural', icon: Music },
  { id: 'valentine', label: 'Valentine', icon: Heart },
];

const events = [
  {
    id: 1,
    title: 'CodeStorm Hackathon',
    description: '24-hour coding marathon. Build, innovate, and compete for the ultimate prize.',
    category: 'tech',
    image: '/event_hackathon.jpg',
    tags: ['Competition', '24 Hours'],
  },
  {
    id: 2,
    title: 'AI Neural Wars',
    description: 'Battle of AI models. Train, optimize, and dominate the leaderboard.',
    category: 'tech',
    image: '/event_ai.jpg',
    tags: ['AI/ML', 'Competition'],
  },
  {
    id: 3,
    title: 'UI/UX Forge',
    description: 'Design competition for the next generation of digital experiences.',
    category: 'tech',
    image: '/event_design.jpg',
    tags: ['Design', 'Workshop'],
  },
  {
    id: 4,
    title: 'BGMI Cyber Cup',
    description: 'Squad up and battle for glory in the ultimate mobile esports tournament.',
    category: 'esports',
    image: '/event_bgmi.jpg',
    tags: ['Esports', '₹50K Prize'],
  },
  {
    id: 5,
    title: 'Valorant Showdown',
    description: 'Precision, strategy, and clutch plays. The arena awaits agents.',
    category: 'esports',
    image: '/event_valorant.jpg',
    tags: ['Esports', '₹75K Prize'],
  },
  {
    id: 6,
    title: 'RoboRace Grand Prix',
    description: 'High-speed autonomous racing. Build the fastest bot and claim victory.',
    category: 'robotics',
    image: '/event_roborace.jpg',
    tags: ['Robotics', 'Racing'],
  },
  {
    id: 7,
    title: 'Mech Warriors',
    description: 'Robot combat arena. Design, build, and destroy the competition.',
    category: 'robotics',
    image: '/event_robotics.jpg',
    tags: ['Robotics', 'Combat'],
  },
  {
    id: 8,
    title: 'Neon Pulse Dance',
    description: 'Cyberpunk-themed dance competition under the laser lights.',
    category: 'cultural',
    image: '/event_dance.jpg',
    tags: ['Dance', 'Show'],
  },
  {
    id: 9,
    title: 'Sound Rebellion',
    description: 'Live music night featuring the best college bands and artists.',
    category: 'cultural',
    image: '/event_music.jpg',
    tags: ['Music', 'Live'],
  },
  {
    id: 10,
    title: 'Cybernetic Hearts',
    description: 'Valentine special: Tech meets romance in this unique celebration.',
    category: 'valentine',
    image: '/event_valentine.jpg',
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
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Filters animation
      if (filtersRef.current) {
        const pills = filtersRef.current.querySelectorAll('button');
        gsap.fromTo(
          pills,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            scrollTrigger: {
              trigger: filtersRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Cards animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.event-card');
        gsap.fromTo(
          cards,
          { y: 40, scale: 0.98, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
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
      className="relative w-full bg-[#05060B] py-20 lg:py-32 circuit-bg"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-10">
          <h2 className="font-orbitron font-black text-[clamp(36px,4vw,64px)] text-[#F4F6FF] tracking-widest text-glow-violet mb-4">
            EVENTS
          </h2>
          <p className="font-inter text-[#A7B0C8] text-lg">
            Pick your battlefield.
          </p>
        </div>

        {/* Category filters */}
        <div ref={filtersRef} className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-mono text-sm tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-[#7B2BFF] text-white border-glow'
                    : 'bg-[#0B0E16] text-[#A7B0C8] border border-white/10 hover:border-[#7B2BFF]/50'
                }`}
              >
                {Icon && <Icon size={14} />}
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Events grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="event-card cyber-card group cursor-pointer"
            >
              {/* Image */}
              <div className="relative aspect-16/10 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#05060B] via-transparent to-transparent" />
                
                {/* Tags */}
                <div className="absolute bottom-3 left-3 flex gap-2">
                  {event.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-[#0B0E16]/90 backdrop-blur-sm rounded text-[10px] font-mono text-[#A7B0C8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-orbitron font-bold text-lg text-[#F4F6FF] mb-2 group-hover:text-[#7B2BFF] transition-colors">
                  {event.title}
                </h3>
                <p className="font-inter text-sm text-[#A7B0C8] leading-relaxed mb-4 line-clamp-2">
                  {event.description}
                </p>
                <button className="flex items-center gap-2 font-mono text-xs text-[#7B2BFF] group-hover:text-[#00F0FF] transition-colors">
                  Details
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}