import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PLACEHOLDER_SPONSORS = [
{ name: 'Gold Partner', label: 'Your Company Here' },
{ name: 'Silver Partner', label: 'Your Company Here' },
{ name: 'Bronze Partner', label: 'Your Company Here' },
{ name: 'Community Partner', label: 'Your Company Here' },
{ name: 'Event Sponsor', label: 'Your Company Here' },
{ name: 'Title Sponsor', label: 'Your Company Here' }];


export default function CurrentSponsorsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="sponsors" className="py-28 bg-fairway hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center">
          <div className="flex items-center gap-4 mb-6 justify-center">
            <div className="h-px flex-1 max-w-[60px] bg-gold/40" />
            <span className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase">Our Partners</span>
            <div className="h-px flex-1 max-w-[60px] bg-gold/40" />
          </div>
          <h2 className="font-fraunces text-4xl md:text-5xl text-tournament-white mb-4">
            Current Sponsors
          </h2>
          <p className="font-inter text-stroke text-lg max-w-xl mx-auto leading-relaxed">
            Proud to partner with the following organizations in support of USF student golf. Your logo could be here.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {PLACEHOLDER_SPONSORS.map((s, i) =>
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="border border-gold/10 rounded-sm bg-card-surface hover:border-gold/25 transition-all duration-300 flex flex-col items-center justify-center p-6 aspect-[4/3]">
              <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center mb-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.2" opacity="0.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div className="font-fraunces text-stroke text-xs text-center leading-snug">{s.label}</div>
              <div className="font-mono-data text-stroke/50 text-xs tracking-widest uppercase mt-1 text-center">{s.name}</div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 text-center">
          <button
            onClick={() => document.getElementById('sponsor-inquiry')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-gold px-10 py-3 rounded-sm text-sm tracking-widest">
            Become a Sponsor
          </button>
        </motion.div>
      </div>
      <div className="section-divider mt-28" />
    </section>);

}