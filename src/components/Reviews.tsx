/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Star, Shield, Quote, MapPin, ExternalLink } from "lucide-react";

export default function Reviews() {
  const reviewsList = [
    {
      author: "Jaime Burns",
      avatar: "JB",
      service: "Roof Replacement & Gutters",
      location: "Miami, FL",
      text: "Had a new roof and gutters installed on both home and detached garage. Crew showed up early, protected landscaping, replaced damaged decking and wood, cleaned up everything, and delivered beautiful workmanship.",
      date: "2 weeks ago"
    },
    {
      author: "Dawn Molina",
      avatar: "DM",
      service: "Wind Damage Repair",
      location: "Coral Gables, FL",
      text: "Had wind damage and received a fair estimate after being unhappy with other roofers. Leonard answered questions, Dale explained the contract, brought shingle samples, kept the customer updated, and the crew finished the roof in one day.",
      date: "1 month ago"
    },
    {
      author: "Amber Mcpherson",
      avatar: "AM",
      service: "Complete Roofing System",
      location: "Fort Lauderdale, FL",
      text: "Chose Roofers Core Builders after comparing many companies because they provided a clear contract with the full price upfront. The staff, estimator Zachary, and crew were professional, friendly, and explained every step.",
      date: "2 months ago"
    }
  ];

  const GoogleLogo = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );

  return (
    <section id="reviews" className="py-24 bg-brand-slate text-white relative scroll-mt-12">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="font-sans text-xs font-bold text-brand-gold uppercase tracking-[0.2em]">
              Customer Satisfaction
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mt-3 leading-tight">
              What Florida Homeowners Are Saying
            </h2>
          </div>

          {/* Quick Rating Summary */}
          <div className="bg-brand-blue/80 border border-brand-slate/80 p-5 rounded-2xl flex items-center space-x-4 shrink-0 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-brand-slate flex items-center justify-center border border-brand-gold">
              <GoogleLogo />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-display font-extrabold text-2xl text-white leading-none">4.8</span>
                <div className="flex text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="font-sans text-xs text-gray-400 mt-1">
                24 Verified Reviews on Google Business
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" id="reviews-grid">
          {reviewsList.map((rev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-brand-blue/50 border border-brand-slate/60 hover:border-brand-gold/40 p-8 rounded-2xl flex flex-col justify-between shadow-xl relative group transition-all duration-300"
              id={`review-card-${index}`}
            >
              {/* Quote Mark Icon */}
              <div className="absolute top-6 right-6 text-brand-gold/10 group-hover:text-brand-gold/25 transition-colors">
                <Quote className="w-10 h-10 transform -scale-x-100" />
              </div>

              <div>
                {/* Stars and verified tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-sans text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-500/15 uppercase tracking-wider">
                    Verified Job
                  </span>
                </div>

                {/* Review Text */}
                <blockquote className="font-sans text-sm sm:text-base text-gray-200 leading-relaxed italic mb-6">
                  "{rev.text}"
                </blockquote>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3 pt-6 border-t border-brand-slate/60">
                <div className="w-10 h-10 rounded-full bg-brand-slate border border-brand-gold flex items-center justify-center font-display font-bold text-sm text-brand-gold shrink-0">
                  {rev.avatar}
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-white group-hover:text-brand-gold transition-colors">
                    {rev.author}
                  </h4>
                  <div className="flex items-center space-x-1.5 text-xs text-gray-400 font-sans mt-0.5">
                    <MapPin className="w-3 h-3 text-brand-gold" />
                    <span>{rev.location}</span>
                  </div>
                  <div className="text-[11px] text-gray-400 font-sans mt-1 bg-brand-slate/40 w-fit px-2 py-0.5 rounded border border-brand-slate">
                    {rev.service}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action to view on google Maps */}
        <div className="flex justify-center">
          <a
            href="https://maps.app.goo.gl/TzR1D4BXhAHnEjbYA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2.5 bg-brand-blue hover:bg-brand-slate border border-brand-slate hover:border-brand-gold/60 text-white font-semibold py-3.5 px-7 rounded-xl text-sm transition-all duration-300 shadow-md hover:scale-[1.01]"
            id="google-maps-reviews-btn"
          >
            <GoogleLogo />
            <span>Verify All 24 Reviews on Google Maps</span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
