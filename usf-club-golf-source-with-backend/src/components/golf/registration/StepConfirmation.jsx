import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const ENTRY_PRICES = { sponsor: 500, play: 120 };
const ENTRY_LABELS = { sponsor: 'Sponsor & Play', play: 'Play Only' };

function ConfirmationCard({ formData }) {
  const numAttendees = formData.attendees.length;
  const basePrice = (ENTRY_PRICES[formData.entryType] || 0) * numAttendees;
  const donationAmt = parseFloat(formData.donation) || 0;
  const subtotal = basePrice + donationAmt;
  const fees = parseFloat((subtotal * 0.029 + 0.30).toFixed(2));
  const total = subtotal + fees;

  const confNum = `USF-2026-${Math.floor(10000 + Math.random() * 89999)}`;
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div id="tournament-pass" className="max-w-2xl mx-auto bg-card-surface border border-gold/20 rounded-sm overflow-hidden">
      {/* Header */}
      <div className="relative bg-fairway border-b border-gold/20 p-8">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=60" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-fairway/60" />
        </div>
        <div className="relative">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase mb-1">University of South Florida Golf Club</div>
              <h3 className="font-fraunces text-tournament-white text-2xl">Official Tournament Pass</h3>
            </div>
            <div className="text-right">
              <div className="font-mono-data text-stroke text-xs tracking-widest uppercase">Confirmation</div>
              <div className="font-mono-data text-gold text-sm font-bold">{confNum}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gold/30" />
            <span className="font-mono-data text-stroke text-xs">The Annual Charity Classic · Oct 10, 2026</span>
            <div className="h-px flex-1 bg-gold/30" />
          </div>
        </div>
      </div>

      {/* Attendees */}
      <div className="p-6 border-b border-gold/10">
        <div className="font-mono-data text-stroke text-xs tracking-widest uppercase mb-4">Registered Golfers</div>
        <div className="grid sm:grid-cols-2 gap-3">
          {formData.attendees.map((a, i) => (
            <div key={i} className="flex items-center gap-3 bg-fairway border border-gold/8 rounded-sm px-4 py-3">
              <div className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0">
                <span className="font-mono-data text-gold text-xs font-bold">{i + 1}</span>
              </div>
              <div>
                <div className="font-fraunces text-tournament-white text-sm">{a.fullName}</div>
                <div className="font-mono-data text-stroke text-xs">{a.email}</div>
                {a.handicap && <div className="font-mono-data text-gold text-xs">HCP {a.handicap}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details */}
      <div className="p-6 border-b border-gold/10">
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          {[
            { label: 'Date', value: 'October 10, 2026' },
            { label: 'Check-In', value: '6:30 AM' },
            { label: 'Shotgun Start', value: '8:00 AM' },
          ].map(item => (
            <div key={item.label}>
              <div className="font-mono-data text-stroke text-xs tracking-widest uppercase mb-1">{item.label}</div>
              <div className="font-fraunces text-tournament-white">{item.value}</div>
            </div>
          ))}
          {[
            { label: 'Venue', value: 'Heritage Isles Country Club' },
            { label: 'Format', value: '4-Person Scramble' },
            { label: 'Entry Type', value: ENTRY_LABELS[formData.entryType] },
          ].map(item => (
            <div key={item.label}>
              <div className="font-mono-data text-stroke text-xs tracking-widest uppercase mb-1">{item.label}</div>
              <div className="font-fraunces text-tournament-white text-sm">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Receipt */}
      <div className="p-6 border-b border-gold/10">
        <div className="font-mono-data text-stroke text-xs tracking-widest uppercase mb-4">Payment Summary</div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-inter text-stroke text-sm">{ENTRY_LABELS[formData.entryType]} × {numAttendees}</span>
            <span className="font-mono-data text-tournament-white text-sm">${basePrice.toFixed(2)}</span>
          </div>
          {donationAmt > 0 && (
            <div className="flex justify-between">
              <span className="font-inter text-stroke text-sm">Charitable Donation</span>
              <span className="font-mono-data text-gold text-sm">${donationAmt.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="font-inter text-stroke text-sm">Processing Fee</span>
            <span className="font-mono-data text-stroke text-sm">${fees.toFixed(2)}</span>
          </div>
          <div className="border-t border-gold/15 pt-3 flex justify-between">
            <span className="font-fraunces text-tournament-white">Total Charged</span>
            <span className="font-fraunces text-gold text-xl font-bold">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6">
        <div className="flex justify-between items-center text-xs font-mono-data text-stroke">
          <span>Issued: {today}</span>
          <span>golf@usf.edu · (813) 974-3172</span>
        </div>
      </div>
    </div>
  );
}

export default function StepConfirmation({ formData }) {
  const handleDownload = () => {
    const el = document.getElementById('tournament-pass');
    if (!el) return;
    window.print();
  };

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="w-20 h-20 rounded-full border-2 border-gold mx-auto flex items-center justify-center mb-6 gold-glow">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 className="font-fraunces text-4xl text-tournament-white mb-3">You're Registered!</h2>
        <p className="font-inter text-stroke text-lg max-w-md mx-auto leading-relaxed">
          Welcome to the 2026 USF Golf Club Annual Charity Classic. Check your inbox for your confirmation email.
        </p>

        <div className="flex items-center justify-center gap-3 mt-5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B6358" strokeWidth="1.5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
          </svg>
          <span className="font-mono-data text-stroke text-sm">
            Confirmation sent to {formData.billing.email || formData.attendees[0]?.email}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <ConfirmationCard formData={formData} />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={handleDownload}
            className="btn-gold px-10 py-4 rounded-sm text-sm tracking-widest flex items-center gap-3"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Entry Pass
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-8 py-4 rounded-sm text-sm tracking-widest border border-gold/30 text-stroke font-inter font-semibold uppercase hover:border-gold/60 hover:text-tournament-white transition-all duration-300"
          >
            Register Another Group
          </button>
        </div>

        <p className="font-mono-data text-stroke text-xs mt-6">
          Questions? Contact us at golf@usf.edu or (813) 974-3172
        </p>
      </motion.div>
    </div>
  );
}