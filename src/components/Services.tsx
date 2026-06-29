/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import {
  Hammer,
  Wrench,
  CloudLightning,
  Droplets,
  Wind,
  ClipboardCheck,
  ArrowRight
} from "lucide-react";

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

interface ServiceItem {
  id: string;
  title: string;
  icon: any;
  description: string;
}

const ServiceCard: React.FC<{ service: ServiceItem; onSelect: (name: string) => void; index: number }> = ({ service, onSelect, index }) => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate relative mouse position from -1 to 1
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Convert coords to degrees of rotation for subtle 3D tilt
  const rotateX = isHovered ? -coords.y * 12 : 0;
  const rotateY = isHovered ? coords.x * 12 : 0;
  
  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      animate={{
        rotateX,
        rotateY,
        y: isHovered ? -8 : 0,
      }}
      className={`relative bg-white/75 backdrop-blur-md border border-neutral-200/50 p-8 rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_45px_rgba(239,68,68,0.12)] transition-shadow duration-300 flex flex-col justify-between h-full group select-none`}
    >
      {/* Red soft glow under overlay */}
      <div 
        className="absolute inset-0 rounded-[20px] bg-gradient-to-tr from-red-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" 
      />

      <div style={{ transform: "translateZ(30px)" }}>
        {/* Animated 3D Icon Area */}
        <div className="relative w-14 h-14 mb-8 flex items-center justify-center">
          {/* Subtle dynamic depth shadow */}
          <motion.div 
            className="absolute bottom-1 w-8 h-2 bg-neutral-900/15 rounded-full blur-[3px]"
            animate={{
              scaleX: isHovered ? [1, 0.7, 1] : [1, 0.85, 1],
              opacity: isHovered ? [0.4, 0.15, 0.4] : [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Icon frame with rotating background */}
          <motion.div 
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/10 flex items-center justify-center shadow-inner"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Floating Lucide Icon */}
          <motion.div 
            className="relative text-red-600 z-10"
            animate={{
              y: [0, -6, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon className="w-7 h-7 filter drop-shadow-[0_1px_3px_rgba(220,38,38,0.25)]" />
          </motion.div>
        </div>

        {/* Service Title */}
        <h3 className="font-display font-black text-xl text-neutral-900 tracking-tight mb-3 group-hover:text-red-600 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Short benefit-focused sentence */}
        <p className="font-sans text-sm text-neutral-600 leading-relaxed mb-8">
          {service.description}
        </p>
      </div>

      {/* Premium Red CTA Button with Arrow Slide and Ripple-like effect */}
      <button
        onClick={() => onSelect(service.title)}
        style={{ transform: "translateZ(20px)" }}
        className="w-full relative overflow-hidden bg-red-600 text-white font-sans font-bold text-xs py-3.5 px-6 rounded-xl shadow-[0_4px_12px_rgba(220,38,38,0.25)] hover:shadow-[0_6px_18px_rgba(220,38,38,0.35)] transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer"
      >
        <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-[-2px]">Get Free Estimate</span>
        <span className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1.5">
          <ArrowRight className="w-4 h-4" />
        </span>
        
        {/* Soft ripple hover background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </button>
    </motion.div>
  );
}

export default function Services({ onSelectService }: ServicesProps) {
  const serviceList: ServiceItem[] = [
    {
      id: "replacement",
      title: "Roof Replacement",
      icon: Hammer,
      description: "Upgrade to a high-wind rated asphalt or metal roof backed by an industry-leading lifetime warranty."
    },
    {
      id: "repair",
      title: "Roof Repair",
      icon: Wrench,
      description: "Stop active leaks, fix damaged shingles, and halt internal mold before it compromises your home."
    },
    {
      id: "storm",
      title: "Storm Damage Repair",
      icon: CloudLightning,
      description: "Prompt wind, rain, and hail restoration to secure structural integrity and restore beautiful aesthetics."
    },
    {
      id: "gutters",
      title: "Gutter Installation",
      icon: Droplets,
      description: "Seamless aluminum gutters custom-molded on-site to safely guide storm water away from foundations."
    },
    {
      id: "ventilation",
      title: "Attic Ventilation",
      icon: Wind,
      description: "Optimize attic thermal flow to dramatically lower cooling bills and prevent structural decay."
    },
    {
      id: "inspections",
      title: "Roof Inspections",
      icon: ClipboardCheck,
      description: "Complete multi-point safety assessment with high-definition diagnostic reporting and documentation."
    }
  ];

  const handleServiceClick = (title: string) => {
    onSelectService(title);
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
    <section id="services" className="py-24 bg-[#F8F6F2] relative scroll-mt-12 overflow-hidden">
      {/* Background radial accents for a premium, clean vibe */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-red-500/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-orange-500/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs font-bold text-red-600 uppercase tracking-[0.25em] block mb-3"
          >
            Our Roofing Services
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-neutral-950 tracking-tight leading-tight mb-4"
          >
            Protecting, Restoring, and Enhancing Your Home
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base text-neutral-600 max-w-2xl mx-auto"
          >
            Everything you need to ensure high-end craftsmanship, long-term durability, and reliable storm resilience.
          </motion.p>
        </div>

        {/* Services 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto" id="services-grid">
          {serviceList.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelect={handleServiceClick}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
