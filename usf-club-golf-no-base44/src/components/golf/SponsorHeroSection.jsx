import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { heroBackground } from '../../assets/images';

export default function SponsorHeroSection() {
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
        scale: 1 + progress * 0.08
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] overflow-hidden flex items-center" id="hero">
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: `${scrollVals.y}%`, scale: scrollVals.scale }}>
        <img
          src={heroBackground}
          alt="Golf course at golden hour"
          className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-fairway/95 via-fairway/75 to-fairway/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-fairway/80 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: scrollVals.opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="space-y-6">

            <div className="flex items-center gap-3">
              <div className="h-px w-12 bg-gold opacity-60" />
              <span className="font-mono-data text-gold text-xs tracking-[0.25em] uppercase">Club Golf at the University of South Florida presents

              </span>
            </div>

            <h1 className="font-fraunces font-black text-tournament-white leading-none">
              <span className="block text-5xl md:text-6xl lg:text-7xl">The Club Golf at USF</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl text-gold">Charity</span>
              <span className="block text-5xl md:text-6xl lg:text-7xl">Classic</span>
            </h1>

            <div className="h-px w-24 bg-gold/50" />

            <p className="font-inter text-tournament-white text-xl leading-relaxed max-w-xl opacity-90">
              Support the inaugural Club Golf Charity Classic and help grow the future of club golf at USF.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => document.getElementById('sponsorship-packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-gold px-10 py-4 rounded-sm text-sm tracking-widest">
                View Sponsorship Packages
              </button>
              <button
                onClick={() => document.getElementById('sponsor-inquiry')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-4 rounded-sm text-sm tracking-widest border border-gold/30 text-tournament-white font-inter font-semibold uppercase hover:border-gold/70 transition-all duration-300">
                Submit Sponsorship Inquiry
              </button>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="font-fraunces text-2xl text-gold font-bold">Aug 29</div>
                <div className="font-mono-data text-stroke text-xs tracking-widest uppercase">2026</div>
              </div>
              <div className="w-px h-10 bg-gold/20" />
              <div className="text-center">
                <div className="font-fraunces text-2xl text-gold font-bold">75+</div>
                <div className="font-mono-data text-stroke text-xs tracking-widest uppercase">Golfers</div>
              </div>
              <div className="w-px h-10 bg-gold/20" />
              <div className="text-center">
                <div className="font-fraunces text-2xl text-gold font-bold">1st</div>
                <div className="font-mono-data text-stroke text-xs tracking-widest uppercase">Annual Event</div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

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
