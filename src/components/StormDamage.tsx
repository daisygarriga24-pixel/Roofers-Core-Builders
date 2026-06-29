/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ShieldAlert, AlertTriangle, CloudLightning, HelpCircle, ArrowRight, Clipboard } from "lucide-react";

interface StormDamageProps {
  onSelectService: (serviceName: string) => void;
}

export default function StormDamage({ onSelectService }: StormDamageProps) {
  
  const signs = [
    "Creased, broken, or completely missing asphalt shingles",
    "Bruises or dark indentation spots indicating hail strikes",
    "Lifted or curled roof shingles exposing raw roofing deck",
    "Exposed metal flashing or compromised valley boots",
    "Water stains or dark damp spots creeping onto attic plywood"
  ];

  const handleCtaClick = () => {
    onSelectService("Storm & Wind Damage Repair");
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
    <section id="storm-damage" className="py-24 bg-brand-blue relative overflow-hidden scroll-mt-12">
      {/* Dynamic Storm Overlay/Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/15 via-transparent to-red-950/5 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-brand-slate/90 to-brand-slate/40 border-2 border-red-900/30 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
          
          {/* Subtle emergency corner label */}
          <div className="absolute -top-3 left-8 bg-red-600 text-white font-sans text-xs font-bold px-3.5 py-1 rounded-full flex items-center space-x-1.5 uppercase tracking-wide">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Urgent: Hurricane & Storm season</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Core copy */}
            <div className="lg:col-span-7 flex flex-col space-y-5">
              <span className="font-sans text-xs font-bold text-red-400 uppercase tracking-[0.2em] flex items-center space-x-1">
                <CloudLightning className="w-4 h-4 animate-bounce" />
                <span>Active Wind & Hurricane Damage</span>
              </span>
              
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight">
                Florida storms can <span className="text-red-400 underline decoration-red-800/60 underline-offset-4">damage your roof fast.</span>
              </h2>
              
              <p className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed">
                High winds, tropical cyclones, and severe thunderstorms can compromise shingles and roof decking without warning. We help Florida homeowners inspect, repair, and replace damaged roofing before minor issues evolve into expensive structural water leaks.
              </p>

              {/* Signs checklist */}
              <div className="pt-2">
                <h3 className="font-display font-semibold text-white text-sm mb-3 uppercase tracking-wider flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-brand-gold" />
                  <span>Signs Your Roof Has Hidden Wind Damage:</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {signs.map((sign, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 animate-pulse" />
                      <span className="font-sans text-xs text-gray-400 leading-normal">{sign}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={handleCtaClick}
                  className="group flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all duration-300 shadow-xl hover:shadow-red-500/25 cursor-pointer"
                  id="schedule-storm-cta"
                >
                  <Clipboard className="w-4 h-4" />
                  <span>Schedule Storm Damage Inspection</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="tel:6456661250"
                  className="flex items-center justify-center space-x-2 bg-brand-blue/60 hover:bg-brand-blue border border-brand-slate hover:border-red-500/50 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all duration-300"
                >
                  <span>Immediate Assistance:</span>
                  <span className="text-brand-gold font-bold">(645) 666-1250</span>
                </a>
              </div>
            </div>

            {/* Visual warning mockup side card */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-full max-w-sm bg-brand-blue/90 border border-red-900/30 p-6 rounded-2xl shadow-xl flex flex-col justify-between"
                id="storm-fact-card"
              >
                <div className="flex items-center space-x-3 border-b border-brand-slate/60 pb-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-950/60 border border-red-500 flex items-center justify-center text-red-500 shrink-0">
                    <CloudLightning className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-white">Florida Insurance Rule</h4>
                    <p className="font-sans text-[11px] text-gray-400">Claims timeline information</p>
                  </div>
                </div>

                <div className="space-y-3 font-sans text-xs text-gray-300 leading-relaxed">
                  <p>
                    Did you know that Florida law typically mandates standard timelines to file wind and storm damage claims? Waiting until your roof actively leaks often voids coverage for internal ceiling damage.
                  </p>
                  <div className="bg-red-950/20 border border-red-900/30 rounded p-2.5 text-red-400 font-semibold text-center">
                    Get an inspection report today — standard inspections are completely free of charge.
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-brand-slate/60 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Authorized Florida Contractor</span>
                  <span className="font-semibold text-brand-gold">License #CCC1331828</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
