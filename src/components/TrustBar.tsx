/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Star, Shield, Clock, Calculator, Umbrella } from "lucide-react";

export default function TrustBar() {
  const stats = [
    {
      icon: Star,
      value: "4.8 Google Rating",
      label: "24 Verified Reviews",
      color: "text-amber-400"
    },
    {
      icon: Clock,
      value: "1-Day Replacement",
      label: "Available for standard homes",
      color: "text-brand-gold"
    },
    {
      icon: Calculator,
      value: "Free Estimates",
      label: "Honest, transparent pricing",
      color: "text-brand-gold"
    },
    {
      icon: Umbrella,
      value: "Storm Damage Experts",
      label: "Florida Weather Resilient",
      color: "text-red-400"
    },
  ];

  return (
    <section className="bg-brand-slate py-8 border-y border-brand-slate/40 relative z-30" id="trust-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 items-center justify-items-center text-center">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center group cursor-default"
                id={`trust-stat-${idx}`}
              >
                <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center border border-brand-slate/60 mb-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:border-brand-gold">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="font-display font-bold text-white text-sm sm:text-base tracking-wide">
                  {stat.value}
                </div>
                <div className="font-sans text-xs text-gray-400 mt-0.5">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
