import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SponsorshipCard({ tier, onSelect, isTop }) {
  const [hovered, setHovered] = useState(false);

  const tierStyles = {
    platinum: {
      border: 'border-gold/60',
      bg: 'bg-gradient-to-b from-[#1a3020] to-card-surface',
      glow: '0 0 60px rgba(212,175,55,0.20)',
      badge: 'bg-gold text-fairway',
      badgeLabel: 'Premier',
    },
    gold: {
      border: 'border-gold/30',
      bg: 'bg-card-surface',
      glow: '0 0 40px rgba(212,175,55,0.12)',
      badge: 'bg-[#A8B8C8]/20 text-[#C0D0E0]',
      badgeLabel: null,
    },
    silver: {
      border: 'border-gold/20',
      bg: 'bg-card-surface',
      glow: '0 0 30px rgba(212,175,55,0.08)',
      badge: null,
      badgeLabel: null,
    },
    trophy: {
      border: 'border-gold/15',
      bg: 'bg-card-surface',
      glow: 'none',
      badge: null,
      badgeLabel: null,
    },
    fairway: {
      border: 'border-gold/15',
      bg: 'bg-card-surface',
      glow: 'none',
      badge: null,
      badgeLabel: null,
    },
    rocky: {
      border: 'border-gold/10',
      bg: 'bg-card-surface',
      glow: 'none',
      badge: null,
      badgeLabel: null,
    },
    hole: {
      border: 'border-gold/10',
      bg: 'bg-card-surface',
      glow: 'none',
      badge: null,
      badgeLabel: null,
    },
  };

  const style = tierStyles[tier.key] || tierStyles.rocky;

  return (
    <motion.div
      className={`relative rounded-sm border ${style.border} ${style.bg} overflow-hidden cursor-pointer select-none`}
      style={{ boxShadow: hovered ? style.glow : 'none', transition: 'box-shadow 0.3s ease' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(v => !v)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}>

      {style.badgeLabel && (
        <div className={`absolute top-4 right-4 ${style.badge} font-mono-data text-xs tracking-widest uppercase px-3 py-1 rounded-full`}>
          {style.badgeLabel}
        </div>
      )}

      <div className="p-7">
        {/* Header */}
        <div className="mb-5">
          <div className="font-mono-data text-gold text-xs tracking-[0.25em] uppercase mb-2">{tier.name}</div>
          <div className="font-fraunces text-tournament-white text-3xl font-black mb-1">{tier.price}</div>
          <div className="font-inter text-stroke text-sm">{tier.subtitle}</div>
        </div>

        <div className="h-px bg-gold/15 mb-5" />

        {/* Benefits — always visible on mobile, hover on desktop */}
        <AnimatePresence>
          {hovered ? (
            <motion.ul
              key="benefits"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="space-y-2 mb-6 overflow-hidden">
              {tier.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <svg className="mt-1 flex-shrink-0" width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="4" stroke="#D4AF37" strokeWidth="1" />
                    <circle cx="5" cy="5" r="2" fill="#D4AF37" />
                  </svg>
                  <span className="font-inter text-tournament-white text-sm leading-relaxed">{b}</span>
                </li>
              ))}
            </motion.ul>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6">
              <span className="font-mono-data text-stroke text-xs tracking-widest uppercase">
                Hover to see {tier.benefits.length} benefits included
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => onSelect(tier)}
          className={`w-full py-3 rounded-sm font-mono-data text-xs tracking-widest uppercase transition-all duration-200 ${
            tier.key === 'title'
              ? 'btn-gold'
              : 'border border-gold/30 text-gold hover:border-gold/70 hover:bg-gold/5'
          }`}>
          Select Package
        </button>
      </div>
    </motion.div>
  );
}
