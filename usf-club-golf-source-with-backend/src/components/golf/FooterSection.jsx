import React from 'react';

export default function FooterSection() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer id="footer" className="bg-fairway border-t border-gold/10 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="5" r="3" fill="#D4AF37" />
                  <path d="M12 8 L12 22" stroke="#D4AF37" strokeWidth="1.5" />
                  <path d="M8 22 L16 22" stroke="#D4AF37" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <div className="font-fraunces text-tournament-white text-base font-bold">University of South Florida</div>
                <div className="font-mono-data text-gold text-xs tracking-widest">GOLF CLUB</div>
              </div>
            </div>
            <p className="font-inter text-stroke text-base leading-relaxed max-w-sm mb-6">
              The USF Golf Club is a student-run organization dedicated to competitive golf, community service, and developing the next generation of golfers.
            </p>
            <div className="flex items-center gap-4">
              {['instagram', 'twitter', 'facebook'].map((platform) =>
              <a
                key={platform}
                href="#"
                aria-label={`Follow us on ${platform}`}
                className="w-9 h-9 rounded-full border border-gold/20 flex items-center justify-center text-stroke hover:border-gold/60 hover:text-gold transition-all duration-300">
                
                  {platform === 'instagram' &&
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                }
                  {platform === 'twitter' &&
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                }
                  {platform === 'facebook' &&
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                }
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono-data text-gold text-xs tracking-widest uppercase mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
              { label: 'Tournament Info', id: 'tournament-info' },
              { label: 'Register', id: 'registration' },
              { label: 'FAQ', id: 'faq' }].
              map((item) =>
              <li key={item.id}>
                  <button
                  onClick={() => scrollTo(item.id)}
                  className="font-inter text-stroke text-base hover:text-tournament-white transition-colors duration-200">
                  
                    {item.label}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono-data text-gold text-xs tracking-widest uppercase mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="mt-1 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4B6358" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:golf@usf.edu" className="font-inter text-stroke text-sm hover:text-tournament-white transition-colors">golf@usf.edu</a>
              </div>
              




              
              <div className="flex items-start gap-3">
                <svg className="mt-1 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4B6358" strokeWidth="1.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span className="font-inter text-stroke text-sm">
                  Heritage Isles Golf & Country Club<br />
                  10630 Plantation Bay Dr<br />
                  Tampa, FL 33647
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gold/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-mono-data text-stroke text-xs">
            © 2026 University of South Florida Golf Club. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="font-mono-data text-stroke text-xs hover:text-tournament-white transition-colors tracking-widest uppercase">Privacy</a>
            <a href="#" className="font-mono-data text-stroke text-xs hover:text-tournament-white transition-colors tracking-widest uppercase">Terms</a>
            <a href="#" className="font-mono-data text-stroke text-xs hover:text-tournament-white transition-colors tracking-widest uppercase">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>);

}