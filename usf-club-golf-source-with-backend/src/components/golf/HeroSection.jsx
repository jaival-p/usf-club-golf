import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const ref = useRef(null);
  const [scrollVals, setScrollVals] = useState({ y: 0, opacity: 1, scale: 1 });

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -top / height));
      setScrollVals({
        y: progress * 30,
        opacity: Math.max(0, 1 - progress / 0.6),
        scale: 1 + progress * 0.08,
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToReg = () => document.getElementById('registration')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden flex items-center" id="hero">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: `${scrollVals.y}%`, scale: scrollVals.scale }}>
        
        <img
          src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1800&q=80"
          alt="Golf course at golden hour"
          className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-r from-fairway/95 via-fairway/70 to-fairway/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-fairway/80 via-transparent to-transparent" />
      </motion.div>

      {/* Gold vertical divider line */}
      <div className="absolute left-1/2 top-0 bottom-0 hidden lg:block z-10">
        <div className="gold-rule-v h-full w-px opacity-20" />
      </div>

      {/* Content */}
      <motion.div
        style={{ opacity: scrollVals.opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left — Date/Location Metadata */}
          <div className="lg:col-span-4 lg:col-start-1 flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}>
              
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-12 bg-gold opacity-60" />
                <span className="font-mono-data text-gold text-xs tracking-[0.25em] uppercase">
                  2026 Season
                </span>
              </div>

              <div className="space-y-4">
                <div className="border-l-2 border-gold pl-4">
                  <div className="font-mono-data text-stroke text-xs tracking-widest uppercase mb-1">Date</div>
                  <div className="font-fraunces text-tournament-white text-xl">Saturday, August 29</div>
                  <div className="font-mono-data text-stroke text-sm">2026</div>
                </div>
                <div className="border-l-2 border-gold/40 pl-4">
                  <div className="font-mono-data text-stroke text-xs tracking-widest uppercase mb-1">Venue</div>
                  <div className="font-fraunces text-tournament-white text-lg leading-tight">Heritage Isles Golf & Country Club</div>
                  <div className="font-mono-data text-stroke text-sm">Tampa, Florida</div>
                </div>
                <div className="border-l-2 border-gold/40 pl-4">
                  <div className="font-mono-data text-stroke text-xs tracking-widest uppercase mb-1">Format</div>
                  <div className="font-fraunces text-tournament-white text-lg">4-Person Scramble</div>
                  <div className="font-mono-data text-stroke text-sm">Tee Off · 8:30 AM</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Center Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Right — Main Headline & CTA */}
          <div className="lg:col-span-7 lg:col-start-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="space-y-6">
              
              <div>
                <p className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase mb-4">
                  University of South Florida Golf Club
                </p>
                <h1 className="font-fraunces font-black text-tournament-white leading-none">
                  <span className="block text-5xl md:text-6xl lg:text-7xl">The Inaugural</span>
                  <span className="block text-5xl md:text-6xl lg:text-7xl text-gold">Charity</span>
                  <span className="block text-5xl md:text-6xl lg:text-7xl">Classic</span>
                </h1>
              </div>

              <div className="h-px w-24 bg-gold/50" />

              <p className="font-inter text-tournament-white text-lg leading-relaxed max-w-lg">Join us for the inaugural USF Golf Club Charity Tournament as we raise funds to grow the club, expand opportunities for members, and build a lasting future for competitive golf at USF.


              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={scrollToReg}
                  className="btn-gold px-10 py-4 rounded-sm text-sm tracking-widest">
                  
                  Join the Tournament
                </button>
                <button
                  onClick={() => document.getElementById('tournament-info')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 py-4 rounded-sm text-sm tracking-widest border border-gold/30 text-tournament-white font-inter font-semibold uppercase hover:border-gold/70 transition-all duration-300">
                  
                  Learn More
                </button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="text-center">
                  <div className="font-fraunces text-2xl text-gold font-bold">70+</div>
                  <div className="font-mono-data text-stroke text-xs tracking-widest uppercase">Golfers</div>
                </div>
                <div className="w-px h-10 bg-gold/20" />
                <div className="text-center">
                  <div className="font-fraunces text-2xl text-gold font-bold">$15K+</div>
                  <div className="font-mono-data text-stroke text-xs tracking-widest uppercase">Goal to Raise</div>
                </div>
                <div className="w-px h-10 bg-gold/20" />
                <div className="text-center">
                  <div className="font-fraunces text-2xl text-gold font-bold">1st</div>
                  <div className="font-mono-data text-stroke text-xs tracking-widest uppercase">Annual Event</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity: scrollVals.opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}>
        
        <span className="font-mono-data text-stroke text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold/40 to-transparent" />
      </motion.div>
    </section>);

}