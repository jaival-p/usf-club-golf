import React from 'react';
import { motion } from 'framer-motion';
import { paradiseLogo, instagramIcon, facebookIcon } from '../../assets/images';

export default function PartnerSection() {
  return (
    <section className="bg-fairway py-10 border-b border-gold/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 justify-center">
          <div className="h-px flex-1 max-w-[80px] bg-gold/40" />
          <span className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase whitespace-nowrap">Official Partners</span>
          <div className="h-px flex-1 max-w-[80px] bg-gold/40" />
        </div>

        {/* Partner Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-5"
        >
          {/* Logo */}
          <div className="w-16 h-16 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={paradiseLogo}
              alt="Paradise Golf Logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="space-y-2">
            <div className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase">Official Golf Partner</div>
            <h3 className="font-fraunces text-tournament-white text-xl font-bold">Paradise Golf</h3>
            <p className="font-inter text-stroke text-sm leading-relaxed max-w-sm mx-auto">
              Proud supporters of the USF Club Golf Charity Classic and the next generation of collegiate golfers.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/paradisegolfcard/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gold/20 rounded-sm hover:border-gold/50 transition-colors group"
            >
              <img
                src={instagramIcon}
                alt="Instagram"
                className="w-4 h-4 invert opacity-50 group-hover:opacity-80 transition-opacity"
              />
              <span className="font-mono-data text-stroke text-xs tracking-widest uppercase group-hover:text-tournament-white transition-colors">@paradisegolfcard</span>
            </a>
            <a
              href="https://www.facebook.com/paradisegolf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-gold/20 rounded-sm hover:border-gold/50 transition-colors group"
            >
              <img
                src={facebookIcon}
                alt="Facebook"
                className="w-4 h-4 opacity-50 group-hover:opacity-80 transition-opacity invert"
              />
              <span className="font-mono-data text-stroke text-xs tracking-widest uppercase group-hover:text-tournament-white transition-colors">@paradisegolf</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}