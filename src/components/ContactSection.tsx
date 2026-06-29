/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Phone, Mail, MapPin, Clock, Calendar, CheckSquare, ShieldCheck } from "lucide-react";

export default function ContactSection() {
  const contactDetails = [
    {
      icon: Phone,
      title: "Direct Calling",
      value: "(645) 666-1250",
      description: "Direct line to our estimator and project managers.",
      href: "tel:6456661250"
    },
    {
      icon: Mail,
      title: "Email Support",
      value: "office@rooferscorebuilders.com",
      description: "For blueprints, invoices, or general questions.",
      href: "mailto:office@rooferscorebuilders.com"
    },
    {
      icon: MapPin,
      title: "Miami HQ Address",
      value: "1259 NW 7th St, Miami, FL 33125",
      description: "Visiting by appointment only.",
      href: "https://maps.app.goo.gl/TzR1D4BXhAHnEjbYA"
    },
    {
      icon: Clock,
      title: "Operating Hours",
      value: "Mon - Sat: 7:00 AM - 6:00 PM",
      description: "Sunday: Emergency repairs & tarping only.",
      href: null
    }
  ];

  return (
    <section id="contact" className="py-24 bg-brand-slate text-white relative scroll-mt-12">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-blue/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left info column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className="font-sans text-xs font-bold text-brand-gold uppercase tracking-[0.2em]">
                Local & Approachable
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight">
                Get Your Free Inspection Scheduled Today
              </h2>
              <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
                Have questions about roof damage, seamless gutter sizing, or shingle lines? Call us or send an email. Our local estimators reside right here in South Florida and are ready to assist.
              </p>
            </div>

            {/* Quick cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" id="contact-details-grid">
              {contactDetails.map((detail, idx) => {
                const Icon = detail.icon;
                const ContentWrapper = detail.href ? "a" : "div";
                return (
                  <motion.div
                    key={idx}
                    className="bg-brand-blue/50 border border-brand-slate/80 p-5 rounded-xl hover:border-brand-gold/30 transition-all duration-200"
                    id={`contact-detail-${idx}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-brand-slate flex items-center justify-center border border-brand-slate/60 text-brand-gold mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-display font-semibold text-sm text-gray-400 mb-1">
                      {detail.title}
                    </h4>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        target={detail.href.startsWith("http") ? "_blank" : undefined}
                        rel={detail.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-sans font-bold text-sm text-white hover:text-brand-gold transition-colors break-words block"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <span className="font-sans font-bold text-sm text-white block">
                        {detail.value}
                      </span>
                    )}
                    <p className="font-sans text-[11px] text-gray-500 mt-1">
                      {detail.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Quality badges */}
            <div className="pt-4 border-t border-brand-blue flex flex-wrap gap-4 items-center justify-between text-xs text-gray-400">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>Miami-Dade Code Approved</span>
              </span>
              <span>•</span>
              <span>License: CCC1331828</span>
            </div>
          </div>

          {/* Right map column */}
          <div className="lg:col-span-7 h-[450px] sm:h-[500px] w-full rounded-2xl overflow-hidden border-2 border-brand-slate shadow-2xl relative" id="contact-map-frame">
            <iframe
              src="https://maps.google.com/maps?q=1259%20NW%207th%20St,%20Miami,%20FL%2033125&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer"
              title="Roofers Core Builders Miami Location Map"
            />
            {/* Soft overlay on map corner */}
            <div className="absolute bottom-4 left-4 bg-brand-blue/95 border border-brand-gold/40 p-4 rounded-xl shadow-xl max-w-xs backdrop-blur-sm pointer-events-none">
              <h4 className="font-display font-bold text-xs text-brand-gold uppercase tracking-wider mb-1">
                Miami Service Hub
              </h4>
              <p className="font-sans text-xs text-white leading-normal">
                Serving Miami-Dade, Broward, and Palm Beach county homeowners.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
