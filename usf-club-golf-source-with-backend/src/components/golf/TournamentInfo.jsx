import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const scheduleItems = [
{ time: '6:30 AM', label: 'Registration Opens', detail: 'Course gates open. Complimentary coffee and breakfast served at the clubhouse.' },
{ time: '7:00 AM', label: 'Check-In & Welcome', detail: 'Collect your tournament packet, scorecard, and complimentary welcome gift.' },
{ time: '7:45 AM', label: 'Driving Range Opens', detail: 'Warm up on the range before the tournament begins. Complementary range balls included.' },
{ time: "8:30 AM", label: 'Shotgun Start', detail: 'All groups tee off simultaneously from designated holes. Please arrive 15 minutes early.' },
{ time: '1:00 PM', label: 'Tournament Concludes', detail: 'Estimated conclusion. Times may vary by group pace.' },
{ time: '1:30 PM', label: 'Awards & Lunch', detail: 'Prizes, charity auction, and closing remarks at the clubhouse.' }];


const included = [
'18 holes of championship golf (4-person scramble format)',
'Complimentary breakfast and post-round lunch',
'Two drink tickets per player',
'Premium welcome gift bag',
'Access to driving range & putting green',
'Scorecard and official tournament materials',
'Eligibility for hole-in-one prize, closest-to-pin, and longest drive'];


function AnimatedSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}>
      
      {children}
    </motion.div>);

}

export default function TournamentInfo() {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <section id="tournament-info" className="py-32 bg-fairway">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <AnimatedSection>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 max-w-[60px] bg-gold/40" />
            <span className="font-mono-data text-gold text-xs tracking-[0.3em] uppercase">Tournament Details</span>
          </div>
          <h2 className="font-fraunces text-4xl md:text-5xl text-tournament-white mb-4">
            The Blueprint
          </h2>
          <p className="font-inter text-stroke text-lg max-w-2xl mb-16 leading-relaxed">
            Everything you need to know about the USF Golf Club Annual Charity Classic — from tee time to trophy presentation.
          </p>
        </AnimatedSection>

        {/* 3-Column Layout */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Column 1 — Schedule Timeline */}
          <AnimatedSection delay={0.1}>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <h3 className="font-fraunces text-xl text-tournament-white">Day Schedule</h3>
              </div>

              <div className="relative">
                <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gold/15" />
                <div className="space-y-0">
                  {scheduleItems.map((item, i) =>
                  <div
                    key={i}
                    className="relative pl-8 pb-6 cursor-default"
                    onMouseEnter={() => setHoveredItem(i)}
                    onMouseLeave={() => setHoveredItem(null)}>
                    
                      <div className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    hoveredItem === i ? 'border-gold bg-gold scale-125' : 'border-gold/50 bg-fairway'}`
                    } />
                      <div className="font-mono-data text-gold text-xs tracking-widest mb-0.5">{item.time}</div>
                      <div className="font-fraunces text-tournament-white text-base">{item.label}</div>
                      {hoveredItem === i &&
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="font-inter text-stroke text-sm mt-1 leading-relaxed">
                      
                          {item.detail}
                        </motion.div>
                    }
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Column 2 — The Cause */}
          <AnimatedSection delay={0.2}>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <h3 className="font-fraunces text-xl text-tournament-white">The Cause</h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-2 border-gold pl-5 py-1">
                  <h4 className="font-fraunces text-gold text-lg mb-2">Student Club Fund</h4>
                  <p className="font-inter text-stroke text-base leading-relaxed">Proceeds directly fund the USF Golf Club program, enabling student-athletes to pursue academic and athletic excellence without financial barriers.

                  </p>
                </div>

                




                

                



















                
              </div>
            </div>
          </AnimatedSection>

          {/* Column 3 — The Course */}
          <AnimatedSection delay={0.3}>
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h3 className="font-fraunces text-xl text-tournament-white">The Course</h3>
              </div>

              {/* Course Image */}
              <div className="relative mb-6 overflow-hidden rounded-sm">
                <img
                  src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=600&q=75"
                  alt="Heritage Isle Golf & Country Club"
                  className="w-full h-44 object-cover" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-fairway/80 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <div className="font-fraunces text-tournament-white text-sm font-bold">Heritage Isles Golf & Country Club</div>
                  <div className="font-mono-data text-gold text-xs">Tampa, FL</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                { label: 'Address', value: '10630 Plantation Bay Dr, Tampa, FL 33647' },
                { label: 'Course Type', value: '18-Hole Championship Course' },
                { label: 'Par', value: '72 · 6,976 Yards' },
                { label: 'Check-In', value: '6:30 AM – 7:45 AM' },
                { label: 'Shotgun Start', value: '8:30 AM Sharp' }].
                map((item) =>
                <div key={item.label} className="flex justify-between items-baseline border-b border-gold/8 pb-2.5">
                    <span className="font-mono-data text-stroke text-xs tracking-widest uppercase">{item.label}</span>
                    <span className="font-inter text-tournament-white text-sm text-right max-w-[55%]">{item.value}</span>
                  </div>
                )}
              </div>

              <div className="bg-card-surface border border-gold/10 rounded-sm p-4">
                <div className="font-mono-data text-stroke text-xs tracking-widest uppercase mb-2">What's Included</div>
                <ul className="space-y-1.5">
                  {included.map((item, i) =>
                  <li key={i} className="flex items-start gap-2.5">
                      <svg className="mt-1 flex-shrink-0" width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <circle cx="5" cy="5" r="4" stroke="#D4AF37" strokeWidth="1" />
                        <circle cx="5" cy="5" r="2" fill="#D4AF37" />
                      </svg>
                      <span className="font-inter text-stroke text-sm leading-relaxed">{item}</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="mt-4 p-4 border border-gold/20 rounded-sm bg-gold/5">
                <div className="font-mono-data text-stroke text-xs tracking-widest uppercase mb-2">Contact</div>
                <div className="font-inter text-tournament-white text-sm">lukerhodes2@usf.edu</div>
                <div className="font-inter text-tournament-white text-sm hidden">(813) 974-3172</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <div className="section-divider mt-32" />
    </section>);

}