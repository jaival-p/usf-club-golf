import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const ENTRY_PRICES = { sponsor: 500, play: 120 };
const ENTRY_LABELS = { sponsor: 'Sponsor & Play', play: 'Play Only' };
const FEE_RATE = 0.029;
const FEE_FLAT = 0.30;
const DONATION_OPTIONS = [0, 25, 50, 100, 250];

function InputField({ label, required, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="font-mono-data text-stroke text-xs tracking-widest uppercase block mb-2">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      {children}
      {error && <p className="font-mono-data text-xs mt-1.5" style={{ color: '#E63946' }}>{error}</p>}
    </div>
  );
}

function AnimatedTotal({ value }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="font-fraunces text-gold font-black text-2xl"
    >
      ${value.toFixed(2)}
    </motion.span>
  );
}

export default function StepPayment({ formData, onBillingChange, onDonationChange, onPrev }) {
  const [billing, setBilling] = useState(formData.billing || { fullName: '', email: '', address: '', city: '', state: '', zip: '' });
  const [donation, setDonation] = useState(formData.donation || 0);
  const [customDonation, setCustomDonation] = useState('');
  const [errors, setErrors] = useState({});
  const [loading] = useState(false);

  const numAttendees = formData.attendees.length;
  const basePrice = (ENTRY_PRICES[formData.entryType] || 0) * numAttendees;
  const donationAmt = parseFloat(customDonation) || donation;
  const subtotal = basePrice + donationAmt;
  const fees = parseFloat((subtotal * FEE_RATE + FEE_FLAT).toFixed(2));
  const total = subtotal + fees;

  useEffect(() => { onBillingChange(billing); }, [billing]);
  useEffect(() => { onDonationChange(donationAmt); }, [donationAmt]);

  const updateBilling = (k, v) => setBilling(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!billing.fullName.trim()) e.fullName = 'Required';
    if (!billing.address.trim()) e.address = 'Required';
    if (!billing.city.trim()) e.city = 'Required';
    if (!billing.state.trim()) e.state = 'Required';
    if (!billing.zip.trim()) e.zip = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(billing.email)) e.billingEmail = 'Valid email required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCheckout = () => {
    if (!validate()) return;
    alert('Payment processing is not yet configured. Please contact us directly to complete your registration.');
  };

  const inputClass = (err) => `w-full bg-fairway border rounded-sm px-4 py-3 font-inter text-tournament-white text-base placeholder-stroke input-gold-focus transition-all ${
    err ? 'border-corsa-red' : 'border-gold/15'
  }`;

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      {/* Left — Forms */}
      <div className="lg:col-span-7 space-y-8">
        {/* Billing Info */}
        <div>
          <h3 className="font-fraunces text-xl text-tournament-white mb-5 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full border border-gold flex items-center justify-center">
              <span className="font-mono-data text-gold text-xs">1</span>
            </span>
            Billing Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <InputField label="Full Name" required id="b-name" error={errors.fullName}>
                <input id="b-name" type="text" value={billing.fullName} onChange={e => updateBilling('fullName', e.target.value)} placeholder="As it appears on card" className={inputClass(errors.fullName)} />
              </InputField>
            </div>
            <div className="sm:col-span-2">
              <InputField label="Email for Receipt" required id="b-email" error={errors.billingEmail}>
                <input id="b-email" type="email" value={billing.email} onChange={e => updateBilling('email', e.target.value)} placeholder="you@example.com" className={inputClass(errors.billingEmail)} />
              </InputField>
            </div>
            <div className="sm:col-span-2">
              <InputField label="Street Address" required id="b-addr" error={errors.address}>
                <input id="b-addr" type="text" value={billing.address} onChange={e => updateBilling('address', e.target.value)} placeholder="123 Main St" className={inputClass(errors.address)} />
              </InputField>
            </div>
            <InputField label="City" required id="b-city" error={errors.city}>
              <input id="b-city" type="text" value={billing.city} onChange={e => updateBilling('city', e.target.value)} placeholder="Tampa" className={inputClass(errors.city)} />
            </InputField>
            <div className="grid grid-cols-2 gap-3">
              <InputField label="State" required id="b-state" error={errors.state}>
                <input id="b-state" type="text" value={billing.state} onChange={e => updateBilling('state', e.target.value)} placeholder="FL" maxLength={2} className={inputClass(errors.state)} />
              </InputField>
              <InputField label="ZIP" required id="b-zip" error={errors.zip}>
                <input id="b-zip" type="text" value={billing.zip} onChange={e => updateBilling('zip', e.target.value)} placeholder="33601" maxLength={5} className={inputClass(errors.zip)} />
              </InputField>
            </div>
          </div>
        </div>

        {/* Optional Donation */}
        <div>
          <h3 className="font-fraunces text-xl text-tournament-white mb-2 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full border border-gold flex items-center justify-center">
              <span className="font-mono-data text-gold text-xs">2</span>
            </span>
            Add a Donation
            <span className="font-inter text-stroke text-sm font-normal normal-case tracking-normal">(optional)</span>
          </h3>
          <p className="font-inter text-stroke text-sm mb-4">Help us exceed our fundraising goal for student scholarships.</p>
          <div className="flex flex-wrap gap-2 mb-3">
            {DONATION_OPTIONS.map(amt => (
              <button
                key={amt}
                onClick={() => { setDonation(amt); setCustomDonation(''); }}
                className={`font-mono-data text-sm px-4 py-2 rounded-sm border transition-all duration-200 ${
                  donation === amt && !customDonation
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-gold/20 text-stroke hover:border-gold/40'
                }`}
              >
                {amt === 0 ? 'No donation' : `$${amt}`}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono-data text-stroke text-sm">Custom:</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono-data text-stroke text-sm">$</span>
              <input
                type="number"
                min="0"
                value={customDonation}
                onChange={e => { setCustomDonation(e.target.value); setDonation(0); }}
                placeholder="0.00"
                className="bg-fairway border border-gold/15 rounded-sm pl-7 pr-4 py-2.5 font-mono-data text-tournament-white text-sm w-28 input-gold-focus"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right — Live Receipt */}
      <div className="lg:col-span-5">
        <div className="sticky top-24">
          <div className="bg-card-surface border border-gold/15 rounded-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px flex-1 bg-gold/20" />
              <span className="font-mono-data text-gold text-xs tracking-widest uppercase">Receipt Summary</span>
              <div className="h-px flex-1 bg-gold/20" />
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-fraunces text-tournament-white">{ENTRY_LABELS[formData.entryType] || 'Entry'}</div>
                  <div className="font-mono-data text-stroke text-xs mt-0.5">{numAttendees}× ${ENTRY_PRICES[formData.entryType] || 0} / golfer</div>
                </div>
                <AnimatePresence mode="wait">
                  <AnimatedTotal key={`base-${basePrice}`} value={basePrice} />
                </AnimatePresence>
              </div>

              {donationAmt > 0 && (
                <div className="flex justify-between items-center">
                  <span className="font-inter text-stroke text-sm">Donation</span>
                  <AnimatePresence mode="wait">
                    <AnimatedTotal key={`don-${donationAmt}`} value={donationAmt} />
                  </AnimatePresence>
                </div>
              )}

              <div className="border-t border-gold/10 pt-4 flex justify-between items-center">
                <div>
                  <span className="font-inter text-stroke text-sm">Processing Fee</span>
                  <div className="font-mono-data text-stroke text-xs">2.9% + $0.30</div>
                </div>
                <span className="font-mono-data text-stroke text-sm">${fees.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gold/20 pt-5">
              <div className="flex justify-between items-center">
                <span className="font-fraunces text-tournament-white text-xl">Total</span>
                <AnimatePresence mode="wait">
                  <AnimatedTotal key={`total-${total}`} value={total} />
                </AnimatePresence>
              </div>
              <div className="font-mono-data text-stroke text-xs mt-2">Contact us to complete your registration.</div>
            </div>

            <div className="mt-5 p-3 border border-gold/10 rounded-sm bg-gold/3">
              <div className="flex items-start gap-2">
                <svg className="mt-0.5 flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <p className="font-inter text-stroke text-xs leading-relaxed">
                  Payment details will be coordinated directly with our team after registration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="lg:col-span-12 flex items-center justify-between">
        <button onClick={onPrev} className="flex items-center gap-2 text-stroke hover:text-tournament-white transition-colors font-inter text-sm uppercase tracking-widest">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back
        </button>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="btn-gold px-10 py-4 rounded-sm text-sm tracking-widest flex items-center gap-3 disabled:opacity-60"
        >
          {loading ? 'Redirecting...' : 'Proceed to Payment'}
          {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>}
        </button>
      </div>
    </div>
  );
}