/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MouseEvent } from "react";
import { Phone, Mail, MapPin, Shield, Star } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace("#", ""));
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
    <footer className="bg-brand-blue text-gray-400 border-t border-brand-slate pt-16 pb-8 relative z-30" id="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center space-x-2.5">
              {/* SVG Logo Icon */}
              <svg
                className="w-11 h-9 shrink-0"
                viewBox="0 0 230 150"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Chimney of House 1 */}
                <path d="M 52, 75 L 52, 45 L 61, 45 L 61, 62" fill="white" stroke="#0A192F" strokeWidth="2.5" strokeLinejoin="round" />
                
                {/* House 2 (smaller right house) facade */}
                <path d="M 145 110 L 175 72 L 195 110 Z" fill="#D31E24" />
                
                {/* House 2 roofline */}
                <path d="M 132 94 L 175 64 L 208 90" stroke="#0A192F" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 132 94 L 175 64 L 208 90" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                {/* House 1 (larger left house) facade */}
                <path d="M 45 110 L 105 50 L 145 110 Z" fill="#D31E24" />
                
                {/* House 1 roofline */}
                <path d="M 22, 94 L 105, 36 L 155, 75" stroke="#0A192F" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <path d="M 22, 94 L 105, 36 L 155, 75" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

                {/* House 1 window panes */}
                <rect x="94" y="66" width="9" height="9" fill="white" />
                <rect x="105" y="66" width="9" height="9" fill="white" />
                <rect x="94" y="77" width="9" height="9" fill="white" />
                <rect x="105" y="77" width="9" height="9" fill="white" />

                {/* Red swoosh */}
                <path d="M 12 112 C 60 84, 150 84, 220 122 C 160 102, 80 102, 12 112 Z" fill="#D31E24" />
                
                {/* Dark slate swoosh (matching the bg #0A192F) */}
                <path d="M 25 114 C 70 102, 150 102, 190 125 C 140 113, 70 113, 25 114 Z" fill="#0A192F" />
              </svg>
              <div className="flex flex-col">
                <span className="font-display font-black text-white text-sm tracking-wider leading-none uppercase">
                  ROOFERS
                </span>
                <span className="font-sans font-extrabold text-[#F15A24] text-[9px] tracking-[0.05em] uppercase leading-none mt-0.5">
                  CORE BUILDERS
                </span>
              </div>
            </div>
            <p className="font-sans text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm">
              Florida Roofing, Gutters &amp; Storm Damage Repair. Rated 4.8 stars by local South Florida families. We are dedicated to transparent contracts, landscaped safety, and pristine, nail-free cleanups.
            </p>
            <div className="flex items-center space-x-1 text-xs text-brand-gold font-sans bg-brand-slate/40 w-fit px-3 py-1 rounded border border-brand-slate">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>Florida Certified Roofing Contractor: CCC1331828</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 flex flex-col space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-sans">
              <li>
                <a
                  href="#services"
                  onClick={(e) => handleScrollTo(e, "#services")}
                  className="hover:text-brand-gold transition-colors"
                >
                  Roofing Services
                </a>
              </li>
              <li>
                <a
                  href="#storm-damage"
                  onClick={(e) => handleScrollTo(e, "#storm-damage")}
                  className="hover:text-brand-gold transition-colors"
                >
                  Storm &amp; Wind Damage
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  onClick={(e) => handleScrollTo(e, "#reviews")}
                  className="hover:text-brand-gold transition-colors"
                >
                  Verified Reviews
                </a>
              </li>
              <li>
                <a
                  href="#process"
                  onClick={(e) => handleScrollTo(e, "#process")}
                  className="hover:text-brand-gold transition-colors"
                >
                  Our 4-Step Process
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => handleScrollTo(e, "#gallery")}
                  className="hover:text-brand-gold transition-colors"
                >
                  Before &amp; After Gallery
                </a>
              </li>
              <li>
                <a
                  href="#estimate"
                  onClick={(e) => handleScrollTo(e, "#estimate")}
                  className="hover:text-brand-gold transition-colors font-semibold text-brand-gold"
                >
                  Request Free Estimate
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Summary */}
          <div className="md:col-span-4 flex flex-col space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Get In Touch
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm font-sans text-gray-300">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <span>1259 NW 7th St, Miami, FL 33125</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <a href="tel:6456661250" className="hover:text-brand-gold transition-colors font-semibold">
                  (645) 666-1250
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <a href="mailto:office@rooferscorebuilders.com" className="hover:text-brand-gold transition-colors break-all">
                  office@rooferscorebuilders.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Natural SEO block paragraph in footer as requested */}
        <div className="border-t border-brand-slate pt-8 pb-4 text-[11px] text-gray-500 leading-relaxed text-center font-sans max-w-4xl mx-auto">
          <p>
            Looking for a premier <strong className="text-gray-400">Florida roofing company</strong>? Roofers Core Builders specializes in premium <strong className="text-gray-400">roof replacement Florida</strong>, storm-certified <strong className="text-gray-400">roof repair Florida</strong>, and emergency <strong className="text-gray-400">wind damage roof repair</strong>. We provide complete storm hazard assessments, certified <strong className="text-gray-400">storm damage roof repair</strong>, residential <strong className="text-gray-400">gutter installation</strong>, and seamless drainage fittings. Contact our local estimators today for an honest, fully itemized <strong className="text-gray-400">free roofing estimate</strong>. We operate proudly as a licensed, fully insured commercial and residential <strong className="text-gray-400">roofing contractor Florida</strong>.
          </p>
        </div>

        {/* Copyright and signature */}
        <div className="border-t border-brand-slate/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>&copy; {currentYear} Roofers Core Builders. All rights reserved.</span>
          <div className="flex items-center space-x-4">
            <a href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="hover:text-brand-gold transition-all">
              Back to Top
            </a>
            <span>•</span>
            <span className="text-gray-600">Daisy Marketing Portfolio Project</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
