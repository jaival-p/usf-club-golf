import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'frosted-nav py-3' : 'py-5 bg-transparent'}`
      }>
      
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-gold flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="3" fill="#D4AF37" />
              <path d="M12 8 L12 22" stroke="#D4AF37" strokeWidth="1.5" />
              <path d="M8 22 L16 22" stroke="#D4AF37" strokeWidth="1.5" />
            </svg>
          </div>
          <div>
            <span className="font-fraunces text-tournament-white text-sm font-bold tracking-wide">USF</span>
            <span className="text-gold text-sm font-mono-data tracking-widest ml-1">CLUBGOLF</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
          { label: 'Tournament', id: 'tournament-info' },
          { label: 'Register', id: 'registration' },
          { label: 'FAQ', id: 'faq' },
          { label: 'Contact', id: 'footer' }].
          map((item) =>
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="text-sm font-inter text-stroke hover:text-tournament-white transition-colors duration-200 tracking-wide uppercase">
            
              {item.label}
            </button>
          )}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => scrollTo('registration')}
            className="btn-gold px-6 py-2.5 rounded-sm text-xs">
            
            Register Now
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-tournament-white p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu">
          
          <div className={`w-5 h-0.5 bg-current transition-all mb-1 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all mb-1 ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen &&
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="md:hidden frosted-nav border-t border-gold-hairline px-6 py-6 flex flex-col gap-5">
        
          {[
        { label: 'Tournament Info', id: 'tournament-info' },
        { label: 'Register', id: 'registration' },
        { label: 'FAQ', id: 'faq' },
        { label: 'Contact', id: 'footer' }].
        map((item) =>
        <button
          key={item.id}
          onClick={() => scrollTo(item.id)}
          className="text-left text-tournament-white font-inter text-base tracking-wide uppercase">
          
              {item.label}
            </button>
        )}
          <button
          onClick={() => scrollTo('registration')}
          className="btn-gold px-6 py-3 rounded-sm text-sm mt-2 w-full">
          
            Secure Your Spot
          </button>
        </motion.div>
      }
    </header>);

}