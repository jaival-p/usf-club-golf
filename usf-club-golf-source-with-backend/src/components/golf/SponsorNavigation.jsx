import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
{ label: 'Overview', href: 'tournament-overview' },
{ label: 'The Cause', href: 'the-cause' },
{ label: 'Packages', href: 'sponsorship-packages' },
{ label: 'Inquire', href: 'sponsor-inquiry' }];


export default function SponsorNavigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'frosted-nav' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between opacity-100">
        {/* Logo */}
        <button onClick={() => scrollTo('hero')} className="flex items-center gap-3">
          <img src="https://media.base44.com/images/public/6a0ca64f419d5b9f8c59065c/7c828aa19_images.png" alt="USF Club Golf Logo" className="h-8 w-8 object-contain rounded-none" />
          <span className="font-fraunces text-tournament-white text-base">USF Club Golf</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) =>
          <button
            key={link.label}
            onClick={() => scrollTo(link.href)}
            className="font-mono-data text-stroke text-xs tracking-widest uppercase hover:text-tournament-white transition-colors duration-200">
              {link.label}
            </button>
          )}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => scrollTo('sponsor-inquiry')}
            className="hidden md:block btn-gold px-6 py-2.5 rounded-sm text-xs tracking-widest">
            Become a Sponsor
          </button>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-stroke hover:text-tournament-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {mobileOpen ?
              <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> :
              <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen &&
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25 }}
          className="md:hidden frosted-nav border-t border-gold/10 overflow-hidden">
            <div className="px-6 py-4 space-y-3">
              {NAV_LINKS.map((link) =>
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left font-mono-data text-stroke text-sm tracking-widest uppercase py-2 hover:text-tournament-white transition-colors">
                  {link.label}
                </button>
            )}
              <button
              onClick={() => scrollTo('sponsor-inquiry')}
              className="btn-gold w-full py-3 rounded-sm text-xs tracking-widest mt-2">
                Become a Sponsor
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </header>);

}