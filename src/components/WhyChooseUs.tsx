/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  DollarSign,
  Clock,
  Shield,
  Sparkles,
  MessageSquare,
  Award,
  ArrowRight,
  Star,
  CheckCircle,
  Activity,
  Sparkle
} from "lucide-react";

interface FeatureItem {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  description: string;
}

const features: FeatureItem[] = [
  {
    id: "pricing",
    title: "Clear Upfront Pricing",
    icon: DollarSign,
    description: "No hidden fees. Just honest estimates and clear contracts."
  },
  {
    id: "estimates",
    title: "Fast, Fair Estimates",
    icon: Clock,
    description: "Detailed inspections and custom quotes within 24 hours."
  },
  {
    id: "protection",
    title: "Property Protection",
    icon: Shield,
    description: "Tarps and protective coverings help shield lawns, plants, and outdoor spaces."
  },
  {
    id: "cleanup",
    title: "Spotless Cleanup",
    icon: Sparkles,
    description: "Magnetic nail sweeps and careful cleanup after every job."
  },
  {
    id: "communication",
    title: "Active Communication",
    icon: MessageSquare,
    description: "Real-time updates, photos, and clear project support from start to finish."
  },
  {
    id: "warranty",
    title: "Durable Warranty Support",
    icon: Award,
    description: "Licensed, insured roofing backed by reliable warranty options."
  }
];

const FeatureCard: React.FC<{ item: FeatureItem; index: number }> = ({ item, index }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  const rotateX = isHovered ? -coords.y * 14 : 0;
  const rotateY = isHovered ? coords.x * 14 : 0;
  
  const IconComponent = item.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      animate={{
        rotateX,
        rotateY,
        y: isHovered ? -6 : 0,
      }}
      className="relative bg-white/70 backdrop-blur-md border border-white/60 p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_22px_45px_rgba(239,68,68,0.1)] transition-all duration-300 flex flex-col justify-between h-full group"
      id={`promise-card-${item.id}`}
    >
      {/* Red-orange glowing radial gradient underlay on hover */}
      <div 
        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/[0.04] to-orange-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
      />

      <div style={{ transform: "translateZ(30px)" }}>
        {/* Floating 3D Roofing Icon badge */}
        <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
          {/* Accent micro gold dot ring */}
          <div className="absolute inset-0 rounded-full border border-amber-400/20 group-hover:border-amber-400/40 group-hover:scale-105 transition-all duration-300" />
          
          {/* Subtle reflection card background */}
          <motion.div 
            className="absolute inset-1 rounded-2xl bg-gradient-to-tr from-amber-400/5 to-red-500/5 backdrop-blur-sm border border-white/80 shadow-md"
            animate={{
              rotate: isHovered ? 12 : -4,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 100 }}
          />

          {/* Floater icon wrapper with infinite float/rotate animation */}
          <motion.div 
            className="relative z-10 text-red-600"
            animate={{
              y: isHovered ? [0, -8, 0] : [0, -4, 0],
              rotate: [0, 6, -6, 0]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <IconComponent className="w-8 h-8 filter drop-shadow-[0_2px_4px_rgba(220,38,38,0.2)]" />
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="font-display font-black text-lg sm:text-xl text-neutral-900 tracking-tight mb-2.5 group-hover:text-red-600 transition-colors duration-300">
          {item.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm text-neutral-600 leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Subtle interactive golden accent detail bottom right */}
      <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
        <Sparkle className="w-3.5 h-3.5 text-amber-500/65" />
      </div>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const handleScrollToEstimate = () => {
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
    <section id="why-choose-us" className="py-24 bg-[#0F1E36] text-white relative scroll-mt-12 overflow-hidden">
      
      {/* Subtle animated gold lines or roof-shaped accents in the background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        {/* Abstract Gold Roof Accent 1 */}
        <motion.svg 
          className="absolute top-20 left-[10%] w-[300px] h-[150px] text-amber-500/20" 
          viewBox="0 0 300 150" 
          fill="none" 
          stroke="currentColor"
          animate={{
            y: [0, 15, 0],
            rotate: [0, 2, -2, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M10 140 L150 20 L290 140" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M50 140 L150 48 L250 140" strokeWidth="1" strokeDasharray="4 4" />
        </motion.svg>

        {/* Abstract Gold Roof Accent 2 */}
        <motion.svg 
          className="absolute bottom-20 right-[8%] w-[400px] h-[200px] text-amber-500/20" 
          viewBox="0 0 400 200" 
          fill="none" 
          stroke="currentColor"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -3, 3, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M20 180 L200 20 L380 180" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M80 180 L200 60 L320 180" strokeWidth="1" strokeDasharray="6 4" />
        </motion.svg>

        {/* Golden light glowing spots */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-amber-400/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-red-500/[0.05] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs font-black text-amber-400 uppercase tracking-[0.25em] block mb-3.5"
          >
            The Roofers Core Promise
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-4"
          >
            Roofing Done Right. No Stress. No Mess.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            From clear pricing to spotless cleanup, we make roofing simple, transparent, and stress-free from inspection to final walkthrough.
          </motion.p>

          {/* Premium Animated Counters/Badges Row */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10"
          >
            {/* Badge 1 */}
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-2 px-4.5 shadow-sm hover:shadow-md transition-shadow">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              <span className="font-sans text-xs sm:text-sm font-bold text-white/90">4.8 Star Rated Locally</span>
            </div>

            {/* Badge 2 */}
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-2 px-4.5 shadow-sm hover:shadow-md transition-shadow">
              <CheckCircle className="w-4 h-4 text-red-400" />
              <span className="font-sans text-xs sm:text-sm font-bold text-white/90">Fully Licensed & Insured</span>
            </div>

            {/* Badge 3 */}
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-2 px-4.5 shadow-sm hover:shadow-md transition-shadow">
              <Activity className="w-4 h-4 text-amber-400" />
              <span className="font-sans text-xs sm:text-sm font-bold text-white/90">Weatherproof Builds</span>
            </div>
          </motion.div>
        </div>

        {/* Feature Cards Grid (3x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto mb-16" id="promise-grid">
          {features.map((item, index) => (
            <FeatureCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>

        {/* Conversion CTA Button */}
        <div className="text-center">
          <motion.button
            onClick={handleScrollToEstimate}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center justify-center space-x-2.5 bg-red-600 hover:bg-red-700 text-white font-sans font-bold text-sm sm:text-base py-4 px-10 rounded-2xl shadow-[0_6px_20px_rgba(220,38,38,0.25)] hover:shadow-[0_8px_30px_rgba(220,38,38,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer group"
          >
            <span>Get Free Roofing Estimate</span>
            <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1.5" />
          </motion.button>
        </div>

      </div>
    </section>
  );
}
