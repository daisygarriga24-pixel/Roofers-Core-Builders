/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Clipboard, FileText, Hammer, Sparkles, ArrowRight, CornerDownRight } from "lucide-react";

interface StepItem {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: "red" | "yellow";
}

const steps: StepItem[] = [
  {
    step: "01",
    icon: Clipboard,
    title: "Free Inspection",
    description: "Our certified estimator performs a thorough multi-point physical inspection to locate storm/wind hazards, record measurements, and spot hidden leaks.",
    color: "red"
  },
  {
    step: "02",
    icon: FileText,
    title: "Clear Estimate",
    description: "We provide an itemized, upfront digital contract showing exact scopes, shingle color selections, and solid warranties. Absolutely no hidden surprises.",
    color: "yellow"
  },
  {
    step: "03",
    icon: Hammer,
    title: "Professional Installation",
    description: "We shield your landscaping with premium safety netting, remove old shingles, install heavy-duty roof decking/wood as needed, and lay premium high-wind tiles.",
    color: "red"
  },
  {
    step: "04",
    icon: Sparkles,
    title: "Final Cleanup & Warranty",
    description: "Our crews perform a rigorous double-pass cleanup using high-power industrial magnet sweepers to capture stray nails, sign off on quality, and deliver your warranty.",
    color: "yellow"
  }
];

const StepCard: React.FC<{ step: StepItem; index: number }> = ({ step, index }) => {
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

  // 3D rotations based on hover position
  const rotateX = isHovered ? -coords.y * 15 : 0;
  const rotateY = isHovered ? coords.x * 15 : 0;

  const IconComponent = step.icon;
  const isRed = step.color === "red";

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      animate={{
        rotateX,
        rotateY,
        y: isHovered ? -8 : 0,
      }}
      className={`relative p-8 rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all duration-300 h-full flex flex-col justify-between group overflow-hidden select-none
        ${isRed 
          ? "bg-red-50/40 border border-red-100/50 hover:shadow-[0_25px_50px_rgba(220,38,38,0.1)] hover:border-red-500/20" 
          : "bg-amber-50/40 border border-amber-100/50 hover:shadow-[0_25px_50px_rgba(245,158,11,0.15)] hover:border-amber-400/30"
        }
      `}
      id={`process-card-step-${index}`}
    >
      {/* 3D Glassmorphic Glow Backing */}
      <div 
        className={`absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
          ${isRed 
            ? "bg-gradient-to-tr from-red-600/[0.03] to-orange-500/[0.03]" 
            : "bg-gradient-to-tr from-amber-500/[0.04] to-yellow-500/[0.04]"
          }
        `}
      />

      <div style={{ transform: "translateZ(30px)" }}>
        {/* Step Counter Badge inside card */}
        <div className="flex items-center justify-between mb-8">
          <span 
            className={`font-sans text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border 
              ${isRed 
                ? "bg-red-50 text-red-600 border-red-100" 
                : "bg-amber-50 text-amber-600 border-amber-100"
              }
            `}
          >
            Step {step.step}
          </span>
          <CornerDownRight 
            className={`w-4 h-4 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1
              ${isRed ? "text-red-300 group-hover:text-red-500" : "text-amber-300 group-hover:text-amber-500"}
            `} 
          />
        </div>

        {/* Floating 3D Icon Container */}
        <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
          {/* Subtle background reflection rings */}
          <motion.div 
            className={`absolute inset-0 rounded-full border transition-all duration-300 
              ${isRed 
                ? "border-red-500/10 group-hover:border-red-500/30 group-hover:scale-105" 
                : "border-amber-400/20 group-hover:border-amber-400/40 group-hover:scale-105"
              }
            `}
          />

          <motion.div 
            className={`absolute inset-1.5 rounded-[18px] backdrop-blur-sm border border-white shadow-sm
              ${isRed 
                ? "bg-gradient-to-br from-red-500/10 to-orange-500/10" 
                : "bg-gradient-to-br from-amber-400/15 to-yellow-300/10"
              }
            `}
            animate={{
              rotate: isHovered ? -8 : 4,
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ type: "spring", stiffness: 120 }}
          />

          {/* Floating and gently rotating icon */}
          <motion.div
            className="relative z-10"
            animate={{
              y: [0, -6, 0],
              rotate: [0, 4, -4, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <IconComponent 
              className={`w-7 h-7 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]
                ${isRed ? "text-red-600" : "text-amber-500"}
              `} 
            />
          </motion.div>
        </div>

        {/* Title */}
        <h3 
          className={`font-display font-black text-xl tracking-tight mb-3 transition-colors duration-300
            ${isRed ? "group-hover:text-red-600" : "group-hover:text-amber-500"}
            text-neutral-900
          `}
        >
          {step.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm text-neutral-600 leading-relaxed">
          {step.description}
        </p>
      </div>

      {/* Decorative colored line detail on the left border of the card */}
      <div 
        className={`absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-md transition-all duration-300 scale-y-50 group-hover:scale-y-100
          ${isRed ? "bg-red-500" : "bg-amber-400"}
        `} 
      />
    </motion.div>
  );
};

export default function Process() {
  return (
    <section id="process" className="py-24 bg-[#F3EFE7] relative scroll-mt-12 overflow-hidden">
      
      {/* Luxury Background Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-25 z-0">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-red-500/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-amber-400/[0.02] rounded-full blur-3xl" />
        
        {/* Luxury Geometric Diagonal Soft Gold Grid Lines */}
        <svg className="absolute inset-0 w-full h-full stroke-amber-500/10" fill="none">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 60 M 0 0 L 0 0" strokeWidth="0.5" strokeDasharray="2 6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs font-black text-red-600 uppercase tracking-[0.25em] block mb-3.5"
          >
            Our Seamless Workflow
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-tight mb-4"
          >
            Our 4-Step Roofing Process
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed"
          >
            From your very first phone call to the final nail-free sweep, we protect your time, your money, and your home.
          </motion.p>
        </div>

        {/* Process Steps Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto" id="process-steps-grid">
          {steps.map((step, index) => (
            <StepCard
              key={step.step}
              step={step}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
