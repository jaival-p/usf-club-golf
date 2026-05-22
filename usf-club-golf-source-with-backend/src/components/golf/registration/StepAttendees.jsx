import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AttendeeForm({ attendee, index, onChange, onRemove, canRemove }) {
  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    const newErrors = { ...errors };
    if (field === 'fullName' && !value.trim()) newErrors.fullName = 'Full name is required';
    else if (field === 'fullName') delete newErrors.fullName;
    if (field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) newErrors.email = 'Valid email required';
    else if (field === 'email') delete newErrors.email;
    if (field === 'phone' && !/^\+?[\d\s\-()]{7,}$/.test(value)) newErrors.phone = 'Valid phone required';
    else if (field === 'phone') delete newErrors.phone;
    setErrors(newErrors);
  };

  const handleChange = (field, value) => {
    validate(field, value);
    onChange({ ...attendee, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-card-surface border border-gold/10 rounded-sm p-6 hover:border-gold/20 transition-all duration-300"
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full border border-gold flex items-center justify-center">
            <span className="font-mono-data text-gold text-xs font-bold">{index + 1}</span>
          </div>
          <h3 className="font-fraunces text-tournament-white text-lg">
            {index === 0 ? 'Primary Golfer' : `Golfer ${index + 1}`}
          </h3>
          {index === 0 && (
            <span className="font-mono-data text-xs text-fairway bg-gold px-2 py-0.5 rounded-sm">Lead</span>
          )}
        </div>
        {canRemove && (
          <button
            onClick={onRemove}
            aria-label={`Remove golfer ${index + 1}`}
            className="text-stroke hover:text-corsa-red transition-colors p-1"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="font-mono-data text-stroke text-xs tracking-widest uppercase block mb-2">
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            value={attendee.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="First Last"
            className={`w-full bg-fairway border rounded-sm px-4 py-3 font-inter text-tournament-white text-base placeholder-stroke input-gold-focus transition-all ${
              errors.fullName ? 'error-field border-corsa-red' : 'border-gold/15'
            }`}
          />
          {errors.fullName && <p className="font-mono-data text-xs mt-1.5" style={{color:'#E63946'}}>{errors.fullName}</p>}
        </div>

        <div>
          <label className="font-mono-data text-stroke text-xs tracking-widest uppercase block mb-2">
            Email <span className="text-gold">*</span>
          </label>
          <input
            type="email"
            value={attendee.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="you@example.com"
            className={`w-full bg-fairway border rounded-sm px-4 py-3 font-inter text-tournament-white text-base placeholder-stroke input-gold-focus transition-all ${
              errors.email ? 'error-field border-corsa-red' : 'border-gold/15'
            }`}
          />
          {errors.email && <p className="font-mono-data text-xs mt-1.5" style={{color:'#E63946'}}>{errors.email}</p>}
        </div>

        <div>
          <label className="font-mono-data text-stroke text-xs tracking-widest uppercase block mb-2">
            Phone <span className="text-gold">*</span>
          </label>
          <input
            type="tel"
            value={attendee.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="(555) 000-0000"
            className={`w-full bg-fairway border rounded-sm px-4 py-3 font-inter text-tournament-white text-base placeholder-stroke input-gold-focus transition-all ${
              errors.phone ? 'error-field border-corsa-red' : 'border-gold/15'
            }`}
          />
          {errors.phone && <p className="font-mono-data text-xs mt-1.5" style={{color:'#E63946'}}>{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className="font-mono-data text-stroke text-xs tracking-widest uppercase block mb-2">
            Handicap Index <span className="text-stroke font-normal normal-case tracking-normal ml-1">(optional)</span>
          </label>
          <input
            type="text"
            value={attendee.handicap}
            onChange={(e) => handleChange('handicap', e.target.value)}
            placeholder="e.g. 12.4"
            className="w-full sm:w-48 bg-fairway border border-gold/15 rounded-sm px-4 py-3 font-mono-data text-tournament-white text-base placeholder-stroke input-gold-focus transition-all"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function StepAttendees({ attendees, onChange, onNext }) {
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const addAttendee = () => {
    if (attendees.length < 4) {
      onChange([...attendees, { fullName: '', email: '', phone: '', handicap: '' }]);
    }
  };

  const removeAttendee = (idx) => {
    onChange(attendees.filter((_, i) => i !== idx));
  };

  const updateAttendee = (idx, data) => {
    const updated = [...attendees];
    updated[idx] = data;
    onChange(updated);
  };

  const isValid = () => {
    return attendees.every(a =>
      a.fullName.trim() &&
      /^\S+@\S+\.\S+$/.test(a.email) &&
      /^\+?[\d\s\-()]{7,}$/.test(a.phone)
    );
  };

  const handleNext = () => {
    setSubmitAttempted(true);
    if (isValid()) onNext();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-fraunces text-2xl text-tournament-white">Golfer Information</h3>
          <p className="font-inter text-stroke mt-1">
            Register up to 4 golfers. One group per registration.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono-data text-stroke text-sm">{attendees.length} / 4 golfers</span>
          {attendees.length < 4 && (
            <button
              onClick={addAttendee}
              aria-label="Add another golfer"
              className="flex items-center gap-2 border border-gold/30 text-gold rounded-sm px-4 py-2 font-inter text-sm font-semibold hover:border-gold hover:bg-gold/5 transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Golfer
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {attendees.map((attendee, i) => (
            <AttendeeForm
              key={i}
              attendee={attendee}
              index={i}
              onChange={(data) => updateAttendee(i, data)}
              onRemove={() => removeAttendee(i)}
              canRemove={i > 0}
            />
          ))}
        </AnimatePresence>
      </div>

      {submitAttempted && !isValid() && (
        <p className="font-mono-data text-sm mt-4" style={{color:'#E63946'}}>
          Please complete all required fields for every golfer before continuing.
        </p>
      )}

      <div className="flex justify-end mt-8">
        <button
          onClick={handleNext}
          className="btn-gold px-10 py-4 rounded-sm text-sm tracking-widest flex items-center gap-3"
        >
          Continue to Entry Type
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}