import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Events', href: '#events' },
  { label: 'Tech Arena', href: '#tech' },
  { label: 'Esports', href: '#esports' },
  { label: 'More', href: '#sponsors' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#05060B]/95 backdrop-blur-lg border-b border-[#7B2BFF]/10'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-4 md:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <a
              href="#"
              className="font-orbitron font-bold text-base md:text-lg tracking-wider text-[#F4F6FF] hover:text-[#7B2BFF] transition-colors"
            >
              AVENSIS'<span className="text-[#7B2BFF]">26</span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-6 md:gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="font-mono text-[10px] md:text-xs tracking-widest text-[#A7B0C8] hover:text-[#7B2BFF] transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7B2BFF] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 text-[#F4F6FF] hover:text-[#7B2BFF] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#05060B] pt-20 sm:hidden">
          <div className="flex flex-col items-center gap-6 p-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="font-orbitron text-xl tracking-wider text-[#F4F6FF] hover:text-[#7B2BFF] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
