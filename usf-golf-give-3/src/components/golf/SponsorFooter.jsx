import React from 'react';
import { instagramIcon, linkedinIcon } from '../../assets/images';

export default function SponsorFooter() {
  const navLinks = [
    { label: 'Overview', href: '#tournament-overview' },
    { label: 'The Cause', href: '#the-cause' },
    { label: 'Packages', href: '#sponsorship-packages' },
    { label: 'Inquire', href: '#sponsor-inquiry' },
  ];

  const scrollTo = (href) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-fairway border-t border-gold/10 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="font-fraunces text-gold text-xl mb-2">Club Golf at USF</div>
            <div className="font-mono-data text-stroke text-xs tracking-widest uppercase mb-4">Charity Classic · 2026</div>
            <p className="font-inter text-stroke text-sm leading-relaxed max-w-xs">
              The inaugural USF Golf Club Charity Classic — bringing together sponsors and the USF community to grow the future of club golf.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-mono-data text-gold text-xs tracking-[0.25em] uppercase mb-5">Navigation</div>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-inter text-stroke text-sm hover:text-tournament-white transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="font-mono-data text-gold text-xs tracking-[0.25em] uppercase mb-5">Contact</div>
            <div className="space-y-3">
              <div>
                <div className="font-mono-data text-stroke text-xs tracking-widest uppercase mb-1">Email</div>
                <a href="mailto:lukerhodes2@usf.edu" className="font-inter text-tournament-white text-sm hover:text-gold transition-colors">
                  lukerhodes2@usf.edu
                </a>
              </div>
              <div>
                <div className="font-mono-data text-stroke text-xs tracking-widest uppercase mb-1">Location</div>
                <div className="font-inter text-stroke text-sm">Tampa, Florida</div>
              </div>
              <div>
                <div className="font-mono-data text-stroke text-xs tracking-widest uppercase mb-2">Follow Us</div>
                <div className="flex gap-3">
                  <a href="https://www.instagram.com/golfclubatusf/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity">
                    <img src={instagramIcon} alt="Instagram" className="w-6 h-6 invert opacity-50 hover:opacity-80 transition-opacity" />
                  </a>
                  <a href="https://www.linkedin.com/company/club-golf-at-usf2/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity">
                    <img src={linkedinIcon} alt="LinkedIn" className="w-6 h-6 invert opacity-50 hover:opacity-80 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono-data text-stroke text-xs tracking-widest">
            © 2026 Club Golf at USF · All Rights Reserved
          </div>
          <div className="font-mono-data text-stroke text-xs tracking-widest">
            University of South Florida · Tampa, FL
          </div>
        </div>
      </div>
    </footer>
  );
}