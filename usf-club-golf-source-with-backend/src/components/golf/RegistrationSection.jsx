import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import StepAttendees from './registration/StepAttendees';
import StepEntryType from './registration/StepEntryType';
import StepPayment from './registration/StepPayment';
import StepConfirmation from './registration/StepConfirmation';

const STEPS = [
  { number: 1, label: 'Attendees' },
  { number: 2, label: 'Entry Type' },
  { number: 3, label: 'Payment' },
  { number: 4, label: 'Confirmation' },
];

export default function RegistrationSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    attendees: [{ fullName: '', email: '', phone: '', handicap: '' }],
    entryType: null,
    billing: { fullName: '', address: '', city: '', state: '', zip: '', email: '' },
    donation: 0,
  });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const goNext = () => setCurrentStep(s => Math.min(s + 1, 4));
  const goPrev = () => setCurrentStep(s => Math.max(s - 1, 1));

  const progressPct = ((currentStep - 1) / 3) * 100;

  return (
    <section id="registration" className="py-32 topo-bg relative">
      <div className="absolute inset-0 bg-fairway/96" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gold/40" />
            <span className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase">Registration</span>
          </div>
          <h2 className="font-fraunces text-4xl md:text-5xl text-tournament-white mb-4">
            Secure Your Spot
          </h2>
          <p className="font-inter text-stroke text-lg max-w-xl mb-12 leading-relaxed">
            Complete your registration in under 3 minutes. Limited spots available for the 2026 Championship Classic.
          </p>
        </motion.div>

        {/* Step Progress Bar */}
        <div className="mb-10">
          {/* Thin gold progress line */}
          <div className="h-px bg-gold/15 relative mb-8 overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 bottom-0 bg-gold"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Step indicators */}
          <div className="flex items-center justify-between max-w-2xl">
            {STEPS.map((step) => (
              <div key={step.number} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  step.number < currentStep
                    ? 'border-gold bg-gold'
                    : step.number === currentStep
                    ? 'border-gold bg-transparent'
                    : 'border-stroke-muted bg-transparent'
                }`}>
                  {step.number < currentStep ? (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <polyline points="2,6 5,9 10,3" stroke="#0A2118" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <span className={`font-mono-data text-xs font-bold ${
                      step.number === currentStep ? 'text-gold' : 'text-stroke'
                    }`}>{step.number}</span>
                  )}
                </div>
                <div className="hidden sm:block">
                  <div className={`font-mono-data text-xs tracking-widest uppercase transition-colors duration-300 ${
                    step.number === currentStep ? 'text-tournament-white' : 'text-stroke'
                  }`}>{step.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {currentStep === 1 && (
              <StepAttendees
                attendees={formData.attendees}
                onChange={(v) => updateFormData('attendees', v)}
                onNext={goNext}
              />
            )}
            {currentStep === 2 && (
              <StepEntryType
                selected={formData.entryType}
                onChange={(v) => updateFormData('entryType', v)}
                onNext={goNext}
                onPrev={goPrev}
              />
            )}
            {currentStep === 3 && (
              <StepPayment
                formData={formData}
                onBillingChange={(v) => updateFormData('billing', v)}
                onDonationChange={(v) => updateFormData('donation', v)}
                onPrev={goPrev}
              />
            )}
            {currentStep === 4 && (
              <StepConfirmation formData={formData} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="section-divider mt-32" />
    </section>
  );
}