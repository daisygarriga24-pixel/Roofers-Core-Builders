/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBar from "./components/TrustBar";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Reviews from "./components/Reviews";
import StormDamage from "./components/StormDamage";
import Process from "./components/Process";
import Gallery from "./components/Gallery";
import EstimateForm from "./components/EstimateForm";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import { Phone, FileText, ChevronUp, Star, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [selectedService, setSelectedService] = useState<string>("");
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // Show a helpful promotional alert toast after 4 seconds
    const timer = setTimeout(() => {
      setShowToast(true);
    }, 4000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleScrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
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
    <div className="bg-brand-blue min-h-screen font-sans selection:bg-brand-gold selection:text-brand-blue overflow-x-hidden">
      
      {/* Glass Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        {/* Fullscreen Video Hero with Overlay Card */}
        <Hero />

        {/* Brand Trust Metrics Row */}
        <TrustBar />

        {/* Before and After Image Gallery */}
        <Gallery />

        {/* Detailed Services Grid */}
        <Services onSelectService={setSelectedService} />

        {/* Quality Values & Landscape Protection bento blocks */}
        <WhyChooseUs />

        {/* Verified Google Review Grid */}
        <Reviews />

        {/* High-Alert Storm and wind damage warning panel */}
        <StormDamage onSelectService={setSelectedService} />

        {/* 4-Step Production Timeline */}
        <Process />

        {/* Free Estimate Submission Form & Leads Database */}
        <EstimateForm
          selectedService={selectedService}
          setSelectedService={setSelectedService}
        />

        {/* Coordinates and Live Google Map embed */}
        <ContactSection />
      </main>

      {/* Architectural Natural SEO Footer */}
      <Footer />

      {/* --- DESKTOP FLOATING SIDE ACTION PANEL --- */}
      <div className="hidden lg:flex flex-col space-y-3 fixed bottom-8 right-8 z-40">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-brand-slate/90 hover:bg-red-600 text-white p-3.5 rounded-full border border-red-500/30 hover:border-red-500 transition-all shadow-xl cursor-pointer"
              title="Scroll back to top"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => handleScrollToSection("estimate")}
          whileHover={{ scale: 1.05 }}
          className="bg-red-600 text-white flex items-center space-x-2 px-5 py-3.5 rounded-full font-bold shadow-2xl hover:bg-red-500 cursor-pointer border border-red-500/40"
        >
          <FileText className="w-4 h-4" />
          <span>Get Quote</span>
        </motion.button>
      </div>

      {/* --- MOBILE PERSISTENT STICKY BOTTOM ACTION BAR --- */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-blue/95 backdrop-blur-md border-t border-brand-slate/80 shadow-2xl px-4 py-3 flex gap-3.5 items-center justify-between">
        <a
          href="tel:6456661250"
          className="flex-1 flex items-center justify-center space-x-2 bg-brand-slate text-white py-3.5 rounded-xl font-bold text-sm border border-brand-slate/80 hover:bg-brand-slate/95 transition-all"
        >
          <Phone className="w-4 h-4 text-red-500" />
          <span>Call Now</span>
        </a>
        <button
          onClick={() => handleScrollToSection("estimate")}
          className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white py-3.5 rounded-xl font-extrabold text-sm hover:bg-red-500 shadow-lg transition-all cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Request Estimate</span>
        </button>
      </div>

      {/* --- PROMOTIONAL AUTO ALERTS (TOAST) --- */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, x: 50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: 50, y: 50 }}
            className="fixed bottom-24 lg:bottom-28 right-4 lg:right-8 z-50 bg-brand-blue border-2 border-red-500 p-5 rounded-2xl shadow-2xl max-w-sm backdrop-blur-md"
            id="promo-toast"
          >
            <div className="flex items-start space-x-3.5">
              <div className="w-8 h-8 rounded-full bg-red-500/15 text-red-500 flex items-center justify-center shrink-0">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-black text-xs text-red-500 uppercase tracking-wider">
                    Exclusive Summer Offer
                  </h4>
                  <button
                    onClick={() => setShowToast(false)}
                    className="text-gray-400 hover:text-white text-xs cursor-pointer focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
                <p className="font-sans text-xs text-gray-300 leading-relaxed">
                  Mention this popup to Leonard during your inspection to secure <strong className="text-red-500 font-extrabold">$500 Off</strong> a full roof replacement!
                </p>
                <div className="flex items-center space-x-1.5 pt-1.5 text-[10px] text-emerald-400 font-semibold font-sans">
                  <Check className="w-3 h-3" />
                  <span>Valid for Miami-Dade County Homeowners</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating AI Roofing Assistant Chatbot */}
      <Chatbot />

    </div>
  );
}
