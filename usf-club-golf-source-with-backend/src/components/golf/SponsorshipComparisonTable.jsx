import React from 'react';

const TIERS = [
  { name: 'Platinum', price: '$2,000' },
  { name: 'Gold', price: '$1,500' },
  { name: 'Silver', price: '$1,000' },
  { name: 'Trophy', price: '$750' },
  { name: 'Fairway', price: '$350' },
  { name: 'Rocky', price: '$275' },
  { name: 'Par', price: '$175' },
];

const BENEFITS = [
  {
    label: 'Official Event Branding',
    values: [true, true, true, true, true, true, true],
  },
  {
    label: 'Social Media Posts',
    values: ['6 Posts', '4 Posts', '4 Posts', '2 Posts', '2 Posts', '2 Posts', false],
  },
  {
    label: 'Custom Sponsor Yard Signs',
    values: ['6 Signs', '4 Signs', '3 Signs', '2 Signs', '1 Sign', false, false],
  },
  {
    label: 'On-Cart Advertising',
    values: [true, true, false, false, false, false, false],
  },
  {
    label: 'Sponsored Foursome(s)',
    values: ['2 Foursomes', '1 Foursome', '1 Foursome', '1 Foursome', false, false, false],
  },
  {
    label: 'Verbal Recognition',
    values: [true, true, true, true, true, false, false],
  },
];

function Cell({ value }) {
  if (value === false) {
    return (
      <td className="px-3 py-3.5 text-center">
        <span className="text-stroke/30 text-lg">—</span>
      </td>
    );
  }
  if (value === true) {
    return (
      <td className="px-3 py-3.5 text-center">
        <svg className="mx-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </td>
    );
  }
  return (
    <td className="px-3 py-3.5 text-center">
      <span className="font-mono-data text-gold text-xs">{value}</span>
    </td>
  );
}

export default function SponsorshipComparisonTable() {
  return (
    <div className="mt-16">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 max-w-[60px] bg-gold/40" />
        <span className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase">Full Comparison</span>
        <div className="h-px flex-1 bg-gold/20" />
      </div>

      <div className="overflow-x-auto rounded-sm border border-gold/15">
        <table className="w-full text-sm border-collapse" style={{ minWidth: '700px' }}>
          <thead>
            <tr className="bg-gradient-to-r from-[#1a3020] to-card-surface border-b border-gold/20">
              <th className="px-4 py-4 text-left font-mono-data text-stroke text-xs tracking-widest uppercase w-48">Benefit</th>
              {TIERS.map((t) => (
                <th key={t.name} className="px-3 py-4 text-center">
                  <div className="font-fraunces text-tournament-white text-sm">{t.name}</div>
                  <div className="font-mono-data text-gold text-xs mt-0.5">{t.price}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {BENEFITS.map((row, i) => (
              <tr
                key={i}
                className={`border-b border-gold/8 transition-colors hover:bg-gold/3 ${
                  i % 2 === 0 ? 'bg-fairway' : 'bg-card-surface/40'
                }`}>
                <td className="px-4 py-3.5 font-inter text-stroke text-sm">{row.label}</td>
                {row.values.map((v, j) => (
                  <Cell key={j} value={v} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-inter text-stroke text-sm mt-4 text-center">
        All packages include official event branding placement. Contact us for custom sponsorship arrangements.
      </p>
    </div>
  );
}
