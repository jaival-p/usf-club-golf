import React, { useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { SPONSORSHIP_TIERS } from './SponsorshipPackagesSection';

const inputClass = (err) =>
  `w-full bg-fairway border rounded-sm px-4 py-3 font-inter text-tournament-white text-base placeholder-stroke input-gold-focus transition-all ${
    err ? 'border-red-500' : 'border-gold/15'
  }`;

export default function SponsorInquiryForm({ selectedPackage, onSuccess }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    website: '',
    package: selectedPackage?.name || '',
    notes: '',
  });
  const logoFileRef = useRef(null);
  const [logoFileName, setLogoFileName] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.companyName.trim()) e.companyName = 'Required';
    if (!form.contactName.trim()) e.contactName = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.package) e.package = 'Please select a package';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      let logoUrl = null;
      if (logoFileRef.current) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file: logoFileRef.current });
        logoUrl = file_url;
      }

      await base44.functions.invoke('sendSponsorshipInquiry', {
        companyName: form.companyName,
        contactName: form.contactName,
        email: form.email,
        phone: form.phone,
        website: form.website,
        package: form.package,
        notes: form.notes,
        logoUrl,
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="sponsor-inquiry" className="py-28 bg-fairway">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gold/40" />
            <span className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase">Get Involved</span>
          </div>
          <h2 className="font-fraunces text-4xl md:text-5xl text-tournament-white mb-4">
            Sponsorship Inquiry
          </h2>
          <p className="font-inter text-stroke text-lg leading-relaxed">
            Complete the form below and our sponsorship team will follow up with invoice details, logo specifications, and next steps.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}>
          {/* No payment notice */}
          <div className="mb-8 p-5 border border-gold/20 rounded-sm bg-gold/5 flex items-start gap-3">
            <svg className="mt-0.5 flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="font-inter text-stroke text-sm leading-relaxed">
              <span className="text-gold font-semibold">No payment is collected through this website.</span> Sponsorship payments will be invoiced separately after confirmation from our team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-mono-data text-stroke text-xs tracking-widest uppercase block mb-2">
                  Company Name <span className="text-gold">*</span>
                </label>
                <input type="text" value={form.companyName} onChange={e => update('companyName', e.target.value)} placeholder="Acme Corporation" className={inputClass(errors.companyName)} />
                {errors.companyName && <p className="text-red-400 font-mono-data text-xs mt-1">{errors.companyName}</p>}
              </div>
              <div>
                <label className="font-mono-data text-stroke text-xs tracking-widest uppercase block mb-2">
                  Contact Name <span className="text-gold">*</span>
                </label>
                <input type="text" value={form.contactName} onChange={e => update('contactName', e.target.value)} placeholder="John Smith" className={inputClass(errors.contactName)} />
                {errors.contactName && <p className="text-red-400 font-mono-data text-xs mt-1">{errors.contactName}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-mono-data text-stroke text-xs tracking-widest uppercase block mb-2">
                  Contact Email <span className="text-gold">*</span>
                </label>
                <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@company.com" className={inputClass(errors.email)} />
                {errors.email && <p className="text-red-400 font-mono-data text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="font-mono-data text-stroke text-xs tracking-widest uppercase block mb-2">Phone Number</label>
                <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="(813) 000-0000" className={inputClass(false)} />
              </div>
            </div>

            <div>
              <label className="font-mono-data text-stroke text-xs tracking-widest uppercase block mb-2">Company Website</label>
              <input type="url" value={form.website} onChange={e => update('website', e.target.value)} placeholder="https://yourcompany.com" className={inputClass(false)} />
            </div>

            <div>
              <label className="font-mono-data text-stroke text-xs tracking-widest uppercase block mb-2">
                Sponsorship Package <span className="text-gold">*</span>
              </label>
              <select
                value={form.package}
                onChange={e => update('package', e.target.value)}
                className={`${inputClass(errors.package)} appearance-none`}>
                <option value="">Select a package…</option>
                {SPONSORSHIP_TIERS.map(t => (
                  <option key={t.key} value={t.name}>{t.name} — {t.price}</option>
                ))}
              </select>
              {errors.package && <p className="text-red-400 font-mono-data text-xs mt-1">{errors.package}</p>}
            </div>

            <div>
              <label className="font-mono-data text-stroke text-xs tracking-widest uppercase block mb-2">Company Logo</label>
              <div className="border border-gold/15 border-dashed rounded-sm px-4 py-4 bg-fairway hover:border-gold/30 transition-colors">
                <input
                  type="file"
                  accept="image/*,.svg,.pdf,.ai,.eps"
                  onChange={e => { logoFileRef.current = e.target.files[0] || null; setLogoFileName(logoFileRef.current?.name || null); }}
                  className="w-full font-inter text-stroke text-sm file:mr-3 file:py-1.5 file:px-4 file:rounded-sm file:border file:border-gold/30 file:bg-transparent file:text-gold file:font-mono-data file:text-xs file:uppercase file:tracking-widest file:cursor-pointer hover:file:border-gold/60 transition-all" />
                {logoFileName && <p className="font-mono-data text-gold text-xs mt-2">{logoFileName}</p>}
              </div>
              <p className="font-inter text-stroke text-xs mt-1">Accepted: PNG, JPG, SVG, PDF, AI, EPS</p>
            </div>

            <div>
              <label className="font-mono-data text-stroke text-xs tracking-widest uppercase block mb-2">Notes or Questions</label>
              <textarea
                value={form.notes}
                onChange={e => update('notes', e.target.value)}
                placeholder="Any special requests, questions, or additional information…"
                rows={4}
                className={`${inputClass(false)} resize-none`} />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || submitted}
                className={`w-full py-4 rounded-sm text-sm tracking-widest flex items-center justify-center gap-2 transition-all duration-500 disabled:opacity-80 ${
                  submitted
                    ? 'bg-green-500 text-white font-bold'
                    : 'btn-gold'
                }`}>
                {submitted ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Inquiry Sent!
                  </>
                ) : loading ? 'Submitting…' : 'Submit Sponsorship Inquiry'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
      <div className="section-divider mt-28" />
    </section>
  );
}