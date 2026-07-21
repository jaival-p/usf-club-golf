import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { coursePhoto } from '../../assets/images';

const details = [
  { label: 'Date', value: 'Saturday, August 29, 2026' },
  { label: 'Venue', value: 'Heritage Isles Golf & Country Club' },
  { label: 'Location', value: 'Tampa, Florida' },
  { label: 'Format', value: '4-Person Scramble' },
  { label: 'Tee Time', value: 'Shotgun Start · 8:30 AM' },
  {
    label: 'Address',
    value: '10630 Plantation Bay Dr, Tampa, FL 33647',
  },
  { label: 'Individual Entry', value: '$89 per player' },
  {
    label: 'Register Here',
    value:
      'https://paradisegolfcard.com/products/august-29-club-golf-at-usf-charity-event-play-day',
    isLink: true,
  },
];

export default function TournamentOverviewSection() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: '-80px',
  });

  return (
    <section id="tournament-overview" className="bg-fairway py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px max-w-[60px] flex-1 bg-gold/40" />

            <span className="font-mono-data text-xs uppercase tracking-[0.3em] text-gold">
              Event Details
            </span>
          </div>

          <h2 className="mb-4 font-fraunces text-4xl text-tournament-white md:text-5xl">
            Tournament Overview
          </h2>

          <p className="max-w-2xl font-inter text-lg leading-relaxed text-stroke">
            The inaugural Club Golf at USF Charity Classic brings together
            business leaders, alumni, and golf enthusiasts for a day of
            competition and community impact.
          </p>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Event details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="space-y-0">
              {details.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-6 border-b border-gold/8 py-4"
                >
                  <span className="font-mono-data text-xs uppercase tracking-widest text-stroke">
                    {item.label}
                  </span>

                  {item.isLink ? (
                    <a
                      href={item.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-[55%] rounded-sm bg-gold px-5 py-2.5 text-right font-inter text-sm font-semibold uppercase tracking-wide text-fairway transition hover:opacity-85"
                    >
                      Register Now
                    </a>
                  ) : (
                    <span className="max-w-[55%] text-right font-inter text-base text-tournament-white">
                      {item.value}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Course image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative mb-6 overflow-hidden rounded-sm">
              <img
                src={coursePhoto}
                alt="Heritage Isles Golf & Country Club"
                className="h-64 w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-fairway/80 to-transparent" />

              <div className="absolute bottom-4 left-5">
                <div className="font-fraunces text-lg font-bold text-tournament-white">
                  Heritage Isles Golf & Country Club
                </div>

                <div className="font-mono-data text-xs tracking-widest text-gold">
                  Tampa, FL · Par 72 · 6,976 Yards
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-gold/10 bg-card-surface p-5">
              <div className="mb-3 font-mono-data text-xs uppercase tracking-widest text-gold">
                Sponsorship Opportunity
              </div>

              <p className="font-inter text-base leading-relaxed text-stroke">
                Your brand will be front and center throughout the entire
                tournament day — from morning registration through the awards
                ceremony. Sponsorship packages include branding, signage,
                social media, and much more.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-divider mt-28" />
    </section>
  );
}
