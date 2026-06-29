/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MouseEvent } from "react";
import { motion } from "motion/react";
import { Star, Phone, FileText, CheckCircle, Flame, ShieldAlert, Award } from "lucide-react";

export default function Hero() {
  const trustBadges = [
    { text: "4.8 Star Rating", icon: Star, color: "text-amber-400" },
    { text: "24 Customer Reviews", icon: Award, color: "text-brand-gold" },
    { text: "Great Price", icon: CheckCircle, color: "text-emerald-400" },
    { text: "Fast Cleanup", icon: CheckCircle, color: "text-emerald-400" },
    { text: "Warranty Available", icon: CheckCircle, color: "text-emerald-400" },
  ];

  const handleScrollToEstimate = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("estimate");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="relative h-screen min-h-[750px] w-full overflow-hidden flex items-center pt-20">
      {/* Background Video with Double Overlay */}
      <div className="absolute inset-0 w-full h-full object-cover z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-125 saturate-105"
        >
          <source
            src="https://www.image2url.com/r2/default/videos/1782681758580-4eb57681-b967-48a0-8060-0e92770e8fae.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Dark primary overlay - softened to allow the video to shine through */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/85 via-brand-blue/65 to-brand-blue/35 z-10" />
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#172a45_1px,transparent_1px)] [background-size:16px_16px] opacity-15 z-10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Hero Left Content */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-transparent border border-brand-gold/40 px-3.5 py-1.5 rounded-full w-fit"
          >
            <ShieldAlert className="w-4 h-4 text-brand-gold animate-pulse" />
            <span className="font-sans text-xs font-semibold text-brand-gold uppercase tracking-wider">
              Florida's Trusted Storm & Wind Damage Specialists
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight"
            id="hero-heading"
          >
            Florida Roofing Built to <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-yellow-200 to-white">
              Protect Your Home
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-sans text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed"
            id="hero-subheading"
          >
            Roof replacement, storm damage repair, gutters, and honest estimates from a trusted local roofing team.
          </motion.p>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-wrap gap-x-6 gap-y-3 pt-2"
            id="hero-badges"
          >
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div key={idx} className="flex items-center space-x-2 bg-brand-slate/40 backdrop-blur-sm border border-brand-slate/40 px-3 py-1.5 rounded-lg shadow-sm">
                  <Icon className={`w-4 h-4 ${badge.color}`} />
                  <span className="font-sans text-xs font-medium text-gray-200">{badge.text}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
            id="hero-ctas"
          >
            <button
              onClick={handleScrollToEstimate}
              className="group flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-500 text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 shadow-xl shadow-red-600/10 hover:shadow-red-600/25 hover:scale-[1.02] cursor-pointer"
              id="hero-estimate-cta"
            >
              <FileText className="w-5 h-5" />
              <span>Request Free Estimate</span>
            </button>
            <a
              href="tel:6456661250"
              className="flex items-center justify-center space-x-2 bg-transparent hover:bg-white/5 border-2 border-white/30 hover:border-brand-gold text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 cursor-pointer"
              id="hero-call-cta"
            >
              <Phone className="w-5 h-5 text-brand-gold" />
              <span>Call Now</span>
            </a>
          </motion.div>
        </div>

        {/* Hero Right: Floating Card */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="w-full max-w-sm"
          >
            {/* Subtle Float Animation wrapper */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="bg-brand-blue/80 backdrop-blur-md border border-brand-slate/60 p-6 rounded-2xl shadow-2xl relative"
              id="floating-review-card"
            >
              {/* Highlight background glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-gold to-yellow-500 rounded-2xl opacity-10 blur-xl -z-10" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <div className="flex items-center space-x-1 text-xs text-brand-gold font-bold uppercase tracking-wider font-sans bg-brand-gold/10 px-2 py-0.5 rounded">
                  <Star className="w-3 h-3 fill-current" />
                  <span>5.0 Review</span>
                </div>
              </div>

              <blockquote className="font-sans text-sm text-gray-200 italic leading-relaxed mb-4">
                "Professional, prompt, and the cleanup was outstanding. My new roof and gutters look beautiful."
              </blockquote>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-brand-slate flex items-center justify-center border border-brand-gold text-brand-gold font-bold text-sm">
                  JB
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-white">Jaime Burns</h4>
                  <p className="font-sans text-[11px] text-gray-400">Verified Homeowner • Miami, FL</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Wave/Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-blue to-transparent z-10 pointer-events-none" />
    </section>
  );
}
