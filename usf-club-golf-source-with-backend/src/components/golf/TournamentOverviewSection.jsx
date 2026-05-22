import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const details = [
  { label: 'Date', value: 'Saturday, August 29, 2026' },
  { label: 'Venue', value: 'Heritage Isles Golf & Country Club' },
  { label: 'Location', value: 'Tampa, Florida' },
  { label: 'Format', value: '4-Person Scramble' },
  { label: 'Tee Time', value: 'Shotgun Start · 8:30 AM' },
  { label: 'Address', value: '10630 Plantation Bay Dr, Tampa, FL 33647' },
];

export default function TournamentOverviewSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="tournament-overview" className="py-28 bg-fairway">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gold/40" />
            <span className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase">Event Details</span>
          </div>
          <h2 className="font-fraunces text-4xl md:text-5xl text-tournament-white mb-4">
            Tournament Overview
          </h2>
          <p className="font-inter text-stroke text-lg max-w-2xl leading-relaxed">
            The inaugural USF Golf Club Charity Classic brings together business leaders, alumni, and golf enthusiasts for a day of competition and community impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Event details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="space-y-0">
              {details.map((item, i) => (
                <div key={i} className="flex justify-between items-baseline border-b border-gold/8 py-4">
                  <span className="font-mono-data text-stroke text-xs tracking-widest uppercase">{item.label}</span>
                  <span className="font-inter text-tournament-white text-base text-right max-w-[55%]">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Course image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}>
            <div className="relative overflow-hidden rounded-sm mb-6">
              <img
                src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80"
                alt="Heritage Isles Golf & Country Club"
                className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-fairway/80 to-transparent" />
              <div className="absolute bottom-4 left-5">
                <div className="font-fraunces text-tournament-white text-lg font-bold">Heritage Isles Golf & Country Club</div>
                <div className="font-mono-data text-gold text-xs tracking-widest">Tampa, FL · Par 72 · 6,976 Yards</div>
              </div>
            </div>
            <div className="bg-card-surface border border-gold/10 rounded-sm p-5">
              <div className="font-mono-data text-gold text-xs tracking-widest uppercase mb-3">Sponsorship Opportunity</div>
              <p className="font-inter text-stroke text-base leading-relaxed">
                Your brand will be front and center throughout the entire tournament day — from morning registration through the awards ceremony. Sponsorship packages include branding, signage, social media, and much more.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="section-divider mt-28" />
    </section>
  );
}