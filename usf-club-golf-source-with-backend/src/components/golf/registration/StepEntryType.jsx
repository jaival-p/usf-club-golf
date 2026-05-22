import React from 'react';
import { motion } from 'framer-motion';

const ENTRY_OPTIONS = [
  {
    id: 'sponsor',
    badge: 'Most Impactful',
    title: 'Sponsor & Play',
    price: 500,
    description: 'Make a lasting mark. Your investment goes beyond the course.',
    features: [
      'Tournament entry for 1 golfer',
      'Premium sponsor recognition on scorecards',
      'Logo placement on tournament signage',
      'Gold-tier welcome gift package',
      'Preferred tee time placement',
      'Complimentary sponsor certificate',
      'Recognition at awards ceremony',
      'First right of refusal for next year',
    ],
    featured: true,
  },
  {
    id: 'play',
    badge: null,
    title: 'Play Only',
    price: 120,
    description: 'Classic tournament entry. Everything you need for a great round.',
    features: [
      'Tournament entry for 1 golfer',
      'Complimentary breakfast & post-round lunch',
      'Two drink tickets',
      'Welcome gift bag',
      'Access to driving range & putting green',
      'Eligibility for all prizes',
    ],
    featured: false,
  },
];

export default function StepEntryType({ selected, onChange, onNext, onPrev }) {
  const handleNext = () => {
    if (selected) onNext();
  };

  return (
    <div>
      <div className="mb-10">
        <h3 className="font-fraunces text-2xl text-tournament-white">Choose Your Entry</h3>
        <p className="font-inter text-stroke mt-1">
          Select a registration tier. Price is per golfer in your group.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
        {ENTRY_OPTIONS.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => onChange(option.id)}
            whileHover={{ scale: option.featured ? 1.03 : 1.02 }}
            whileTap={{ scale: 0.99 }}
            className={`relative text-left rounded-sm border-2 p-8 transition-all duration-300 cursor-pointer ${
              selected === option.id
                ? 'border-gold gold-glow bg-gold/8'
                : option.featured
                ? 'border-gold/30 bg-card-surface hover:border-gold/60'
                : 'border-gold/10 bg-card-surface hover:border-gold/30'
            } ${option.featured ? 'shadow-lg' : ''}`}
          >
            {/* Badge */}
            {option.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gold text-fairway font-mono-data text-xs font-bold tracking-widest uppercase px-4 py-1 rounded-sm whitespace-nowrap">
                  {option.badge}
                </span>
              </div>
            )}

            {/* Selected indicator */}
            <div className={`absolute top-5 right-5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              selected === option.id ? 'border-gold bg-gold' : 'border-stroke-muted'
            }`}>
              {selected === option.id && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <polyline points="2,5 4,7.5 8,2.5" stroke="#0A2118" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </div>

            {/* Content */}
            <div className="mb-6 pr-8">
              <h4 className="font-fraunces text-tournament-white text-xl mb-1">{option.title}</h4>
              <p className="font-inter text-stroke text-sm">{option.description}</p>
            </div>

            <div className="mb-6">
              <span className="font-fraunces text-gold font-black" style={{fontSize: '3rem', lineHeight: 1}}>
                ${option.price}
              </span>
              <span className="font-mono-data text-stroke text-sm ml-2">/ golfer</span>
            </div>

            <div className="border-t border-gold/10 pt-6">
              <ul className="space-y-2.5">
                {option.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="mt-1 flex-shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <circle cx="6" cy="6" r="5" stroke="#D4AF37" strokeWidth="1"/>
                      <polyline points="3,6 5,8 9,4" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span className="font-inter text-stroke text-sm leading-relaxed">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.button>
        ))}
      </div>

      {!selected && (
        <p className="font-mono-data text-stroke text-sm mt-4">Please select an entry type to continue.</p>
      )}

      <div className="flex items-center justify-between mt-10">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 text-stroke hover:text-tournament-white transition-colors font-inter text-sm uppercase tracking-widest"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selected}
          className={`btn-gold px-10 py-4 rounded-sm text-sm tracking-widest flex items-center gap-3 transition-all ${
            !selected ? 'opacity-40 cursor-not-allowed' : ''
          }`}
        >
          Continue to Payment
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}