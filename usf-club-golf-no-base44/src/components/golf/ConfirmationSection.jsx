import React from 'react';
import { motion } from 'framer-motion';

export default function ConfirmationSection({ onReset }) {
  return (
    <section className="py-28 bg-fairway">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}>
          <div className="w-20 h-20 rounded-full border-2 border-gold mx-auto mb-8 flex items-center justify-center gold-glow">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase mb-4">Inquiry Received</div>
          <h2 className="font-fraunces text-4xl text-tournament-white mb-6">
            Thank You for Your Interest
          </h2>
          <p className="font-inter text-stroke text-lg leading-relaxed mb-8">
            Thank you for your interest in sponsoring the Golf Club at USF Charity Classic. Our sponsorship team will review your submission and follow up with invoice details, logo requirements, and next steps.
          </p>

          <div className="bg-card-surface border border-gold/15 rounded-sm p-6 mb-8 text-left space-y-3">
            <div className="font-mono-data text-gold text-xs tracking-widest uppercase mb-4">What Happens Next</div>
            {[
              'Our team reviews your inquiry within 2–3 business days',
              'You will receive an email with invoice details and package confirmation',
              'Logo submission guidelines and deadlines will be included',
              'A sponsorship representative will be available for any questions',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-gold/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-mono-data text-gold text-xs">{i + 1}</span>
                </div>
                <span className="font-inter text-stroke text-sm leading-relaxed">{step}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:lukerhodes2@usf.edu"
              className="btn-gold px-8 py-3 rounded-sm text-sm tracking-widest inline-flex items-center justify-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
              </svg>
              Contact Our Team
            </a>
            <button
              onClick={onReset}
              className="px-8 py-3 rounded-sm text-sm tracking-widest border border-gold/30 text-gold hover:border-gold/60 transition-all font-inter font-semibold uppercase">
              Submit Another Inquiry
            </button>
          </div>
        </motion.div>
      </div>
      <div className="section-divider mt-28" />
    </section>
  );
}
