import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SponsorshipCard from './SponsorshipCard';
import SponsorshipComparisonTable from './SponsorshipComparisonTable';

export const SPONSORSHIP_TIERS = [
  {
    key: 'platinum',
    name: 'Platinum',
    price: '$3,750',
    subtitle: 'Premier tournament partner',
    benefits: [
      'Official Event Branding Placement',
      '6 Dual-Platform Social Media Posts',
      '6 Custom Sponsor Yard Signs',
      'On-Cart Advertising',
      '2 Sponsored Foursome',
      'Verbal Recognition at Shotgun, Lunch, and Awards',
    ],
  },
  {
    key: 'gold',
    name: 'Gold',
    price: '$2,250',
    subtitle: 'High visibility partnership',
    benefits: [
      'Official Event Branding Placement',
      '4 Dual-Platform Social Media Posts',
      '4 Custom Sponsor Yard Signs',
      'On-Cart Advertising',
      '1 Sponsored Foursome',
      'Verbal Recognition at Shotgun, Lunch, and Awards',
    ],
  },
  {
    key: 'silver',
    name: 'Silver',
    price: '$1,500',
    subtitle: 'Featured tournament sponsor',
    benefits: [
      'Official Event Branding Placement',
      '4 Dual-Platform Social Media Posts',
      '3 Custom Sponsor Yard Signs',
      '1 Sponsored Foursome',
      'Verbal Recognition at Shotgun, Lunch, and Awards',
    ],
  },
  {
    key: 'trophy',
    name: 'Trophy',
    price: '$1,100',
    subtitle: 'Supporting event sponsor',
    benefits: [
      'Official Event Branding Placement',
      '2 Dual-Platform Social Media Posts',
      '2 Custom Sponsor Yard Signs',
      '1 Sponsored Foursome',
      'Verbal Recognition at Shotgun, Lunch, and Awards',
    ],
  },
  {
    key: 'fairway',
    name: 'Fairway',
    price: '$750',
    subtitle: 'Awards recognition sponsor',
    benefits: [
      'Official Event Branding Placement',
      '2 Dual-Platform Social Media Posts',
      '1 Custom Sponsor Yard Sign',
      'Verbal Recognition at Shotgun, Lunch, and Awards',
    ],
  },
  {
    key: 'rocky',
    name: 'Rocky',
    price: '$500',
    subtitle: 'Community visibility package',
    benefits: [
      'Official Event Branding Placement',
      '2 Dual-Platform Social Media Posts',
    ],
  },
  {
    key: 'hole',
    name: 'Hole',
    price: '$300',
    subtitle: 'Entry sponsorship package',
    benefits: [
      'Official Event Branding Placement',
    ],
  },
];

export default function SponsorshipPackagesSection({ onSelectPackage }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="sponsorship-packages" className="py-28 bg-fairway">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gold/40" />
            <span className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase">Sponsorship Packages</span>
          </div>
          <h2 className="font-fraunces text-4xl md:text-5xl text-tournament-white mb-4">
            Partner With Us
          </h2>
          <p className="font-inter text-stroke text-lg max-w-2xl leading-relaxed">
            Choose the sponsorship tier that fits your goals. Hover over any card to see what's included, then select your package to begin the inquiry process.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {/* Title sponsor spans full width on first row */}
          <motion.div
            className="sm:col-span-2 lg:col-span-3 xl:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}>
            <SponsorshipCard tier={SPONSORSHIP_TIERS[0]} onSelect={onSelectPackage} isTop />
          </motion.div>

          {SPONSORSHIP_TIERS.slice(1).map((tier, i) => (
            <motion.div
              key={tier.key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}>
              <SponsorshipCard tier={tier} onSelect={onSelectPackage} />
            </motion.div>
          ))}
        </div>

        <SponsorshipComparisonTable />
      </div>
      <div className="section-divider mt-28" />
    </section>
  );
}
