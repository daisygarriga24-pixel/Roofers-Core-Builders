/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, MouseEvent } from "react";
import { Menu, X, Phone, Award } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Storm Damage", href: "#storm-damage" },
    { name: "Reviews", href: "#reviews" },
    { name: "Process", href: "#process" },
    { name: "Gallery", href: "#gallery" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScrollTo = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId.replace("#", ""));
    if (element) {
      const offset = 80; // height of fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-brand-blue/95 backdrop-blur-md shadow-lg border-b border-brand-slate/50 py-3"
          : "bg-gradient-to-b from-brand-blue/80 via-brand-blue/30 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <a
            href="#home"
            onClick={(e) => handleScrollTo(e, "#home")}
            className="flex items-center space-x-3.5 group focus:outline-none"
            id="nav-logo"
          >
            {/* SVG Logo Icon */}
            <svg
              className="w-18 h-14 sm:w-20 sm:h-15 md:w-24 md:h-18 shrink-0 transition-transform duration-300 group-hover:scale-105"
              viewBox="0 0 230 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Chimney of House 1 */}
              <path d="M 52, 75 L 52, 45 L 61, 45 L 61, 62" fill="white" stroke="#0A192F" strokeWidth="2.5" strokeLinejoin="round" />
              
              {/* House 2 (smaller right house) facade */}
              <path d="M 145 110 L 175 72 L 195 110 Z" fill="#D31E24" />
              
              {/* House 2 roofline (black background outline for stroke) */}
              <path d="M 132 94 L 175 64 L 208 90" stroke="#0A192F" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* House 2 roofline (white main stroke) */}
              <path d="M 132 94 L 175 64 L 208 90" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />

              {/* House 1 (larger left house) facade */}
              <path d="M 45 110 L 105 50 L 145 110 Z" fill="#D31E24" />
              
              {/* House 1 roofline (black background outline for stroke) */}
              <path d="M 22, 94 L 105, 36 L 155, 75" stroke="#0A192F" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              {/* House 1 roofline (white main stroke) */}
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
              <span className="font-display font-black text-white text-lg sm:text-xl md:text-2xl tracking-wider leading-none uppercase">
                ROOFERS
              </span>
              <span className="font-sans font-black text-[#F15A24] text-[10px] sm:text-xs md:text-sm tracking-[0.05em] uppercase leading-none mt-1">
                CORE BUILDERS
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7" id="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className="font-sans text-sm font-medium text-gray-200 hover:text-brand-gold transition-colors duration-200 relative py-2 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
              </a>
            ))}
          </nav>

          {/* CTA Phone and Button */}
          <div className="hidden sm:flex items-center space-x-4" id="nav-actions">
            <a
              href="tel:6456661250"
              className="flex items-center space-x-2 text-white hover:text-brand-gold transition-colors font-semibold font-sans text-sm py-2 px-3 rounded-lg border border-white/15 hover:border-brand-gold bg-brand-blue/20"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>(645) 666-1250</span>
            </a>
            <a
              href="#estimate"
              onClick={(e) => handleScrollTo(e, "#estimate")}
              className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-all duration-300 shadow-md hover:shadow-red-600/20 hover:scale-102 font-sans"
              id="nav-cta-estimate"
            >
              Request Free Estimate
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-gold"
              aria-controls="mobile-menu"
              aria-expanded="false"
              id="mobile-menu-toggle"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100 visible translate-y-0"
            : "max-h-0 opacity-0 invisible -translate-y-4"
        } overflow-hidden bg-brand-blue border-b border-brand-slate/80 shadow-2xl`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-200 hover:bg-brand-slate hover:text-brand-gold transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-brand-slate/50 flex flex-col space-y-3 px-3">
            <a
              href="tel:6456661250"
              className="flex items-center justify-center space-x-2 w-full bg-brand-slate text-white py-3 rounded-lg font-semibold text-sm hover:bg-brand-slate/80"
            >
              <Phone className="w-4 h-4 text-brand-gold" />
              <span>Call (645) 666-1250</span>
            </a>
            <a
              href="#estimate"
              onClick={(e) => handleScrollTo(e, "#estimate")}
              className="block w-full text-center bg-red-600 text-white py-3 rounded-lg font-bold text-sm hover:bg-red-500 shadow-lg"
            >
              Request Free Estimate
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
