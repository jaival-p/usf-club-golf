import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const pillars = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'Club Growth',
    desc: 'Expanding membership, competitive rosters, and leadership opportunities for club members.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    title: 'Industry Careers',
    desc: 'Connecting students with professional opportunities in golf.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Competitive Team',
    desc: 'Supporting a competitive program that represents USF at collegiate golf events across the country.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'Student Opportunity',
    desc: 'Creating pathways for more students to experience the game of golf, building lifelong skills and networks.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Tournament Funding',
    desc: 'Ensuring the Charity Classic becomes an annual tradition that grows in prestige and impact each year.',
  },
];

export default function TheCauseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="the-cause" className="py-28 bg-fairway">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-14">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gold/40" />
            <span className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase">Why It Matters</span>
          </div>
          <h2 className="font-fraunces text-4xl md:text-5xl text-tournament-white mb-6">
            The Cause
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="font-inter text-tournament-white text-lg leading-relaxed">
              Club Golf at USF exists to give student-athletes the opportunity to compete, grow, and represent the University of South Florida — but like many club sports, it faces real financial challenges.
            </p>
            <p className="font-inter text-stroke text-lg leading-relaxed">
              While our club is partly funded by the university, we still rely on generous donors and sponsors to help cover the costs of travel, tournament registration, and more. The Charity Classic was created to close that gap — and your sponsorship makes it possible.
            </p>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.slice(0, 3).map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card-premium rounded-sm p-6">
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="font-fraunces text-tournament-white text-lg mb-2">{pillar.title}</h3>
              <p className="font-inter text-stroke text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6">
          {pillars.slice(3).map((pillar, i) => (
            <motion.div
              key={i + 3}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: (i + 3) * 0.08 }}
              className="card-premium rounded-sm p-6 w-full sm:w-[calc(33.333%-12px)]">
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="font-fraunces text-tournament-white text-lg mb-2">{pillar.title}</h3>
              <p className="font-inter text-stroke text-sm leading-relaxed">{pillar.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="section-divider mt-28" />
    </section>
  );
}
