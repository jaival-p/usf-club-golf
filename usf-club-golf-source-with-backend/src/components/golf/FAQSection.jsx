import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const FAQS = [
  {
    q: 'What is the format of the tournament?',
    a: 'The tournament uses a 4-person scramble format. All players tee off, the best shot is selected, and all players play from that position. This continues until the hole is completed, making it inclusive for golfers of all skill levels.',
  },
  {
    q: 'Can I register as an individual or do I need a full foursome?',
    a: 'You can register 1–4 golfers per registration. If you register fewer than 4, we\'ll pair you with other golfers or groups to complete your foursome. We recommend registering as a full group for the best experience.',
  },
  {
    q: 'What is the deadline to register?',
    a: 'Registration closes September 26, 2026, or when capacity is reached — whichever comes first. We strongly encourage early registration as spots sell out quickly.',
  },
  {
    q: 'What\'s the difference between Sponsor & Play and Play Only?',
    a: 'The Sponsor & Play package ($500/golfer) includes all standard tournament benefits plus dedicated sponsor recognition on scorecards and signage, a premium gift package, preferred tee placement, and recognition at the awards ceremony. Play Only ($120/golfer) includes full tournament entry, breakfast, lunch, drinks, and a welcome gift bag.',
  },
  {
    q: 'Is there a rain/cancellation policy?',
    a: 'In the event of inclement weather, we will follow USGA lightning safety protocols. If the tournament is cancelled before completing 9 holes, a 50% refund will be issued. If cancelled after 9 holes are completed, no refund is issued. Tournament postponements will be rescheduled within 30 days.',
  },
  {
    q: 'Where do the proceeds go?',
    a: 'All proceeds support two causes: the USF Golf Club Scholarship Fund, which provides financial assistance to student-athletes, and local Tampa Bay youth golf programs that introduce the sport to underserved communities.',
  },
  {
    q: 'Is breakfast and lunch really included?',
    a: 'Yes! All registrations include a complimentary breakfast before the round, two drink tickets, and a post-round lunch at the clubhouse during the awards ceremony.',
  },
  {
    q: 'What should I bring on tournament day?',
    a: 'Bring your clubs, appropriate golf attire (collared shirt required), soft spike shoes, and your confirmation email or QR code. Everything else is provided, including range balls, scorecards, and tournament materials.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="faq" className="py-32 bg-fairway">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gold/40" />
            <span className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase">FAQ</span>
          </div>
          <h2 className="font-fraunces text-4xl md:text-5xl text-tournament-white mb-4">
            Common Questions
          </h2>
          <p className="font-inter text-stroke text-lg leading-relaxed">
            Everything you need to know before you tee off.
          </p>
        </motion.div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`border rounded-sm transition-all duration-300 overflow-hidden ${
                openIndex === i
                  ? 'border-gold/30 bg-card-surface'
                  : 'border-gold/10 bg-card-surface hover:border-gold/20'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                aria-expanded={openIndex === i}
              >
                <span className="font-fraunces text-tournament-white text-lg leading-snug pr-4">{faq.q}</span>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center transition-all duration-300 ${
                  openIndex === i ? 'bg-gold border-gold rotate-45' : ''
                }`}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <line x1="5" y1="1" x2="5" y2="9" stroke={openIndex === i ? '#0A2118' : '#D4AF37'} strokeWidth="1.5" strokeLinecap="round"/>
                    <line x1="1" y1="5" x2="9" y2="5" stroke={openIndex === i ? '#0A2118' : '#D4AF37'} strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5 border-t border-gold/10">
                      <p className="font-inter text-stroke text-base leading-relaxed pt-4">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center p-8 border border-gold/10 rounded-sm bg-card-surface">
          <p className="font-fraunces text-tournament-white text-xl mb-2">Still have questions?</p>
          <p className="font-inter text-stroke mb-5">Our team is happy to help before, during, and after the tournament.</p>
          <a
            href="mailto:lukerhodes2@usf.edu"
            className="btn-gold inline-flex items-center gap-2 px-8 py-3 rounded-sm text-sm tracking-widest"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
            Contact Us
          </a>
        </div>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}