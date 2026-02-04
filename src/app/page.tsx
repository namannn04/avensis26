'use client';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '@/src/components/shared/Navigation';
import HeroSection from '@/src/components/HeroSection';
import TechArenaSection from '@/src/components/TechArenaSection';
import EsportsSection from '@/src/components/EsportsSection';
import RoboRaceSection from '@/src/components/RoboRaceSection';
import CulturalSection from '@/src/components/CulturalSection';
import ValentineSection from '@/src/components/ValentineSection';
import EventsSection from '@/src/components/EventsSection';
import SponsorsSection from '@/src/components/SponsorsSection';
import FooterSection from '@/src/components/shared/FooterSection';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Smooth scroll behavior
    window.scrollBehavior = 'smooth';

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative bg-[#05060B] min-h-screen overflow-x-hidden">
      {/* Scanline effect - subtle */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.02] bg-[linear-gradient(transparent_50%,rgba(123,43,255,0.05)_50%)] bg-size-[100%_4px]" />
      
      <Navigation />
      
      {/* Main content */}
      <main className="relative">
        <HeroSection />
        <TechArenaSection />
        <EsportsSection />
        <RoboRaceSection />
        <CulturalSection />
        <ValentineSection />
        <EventsSection />
        <SponsorsSection />
        <FooterSection />
      </main>
    </div>
  );
}
