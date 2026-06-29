/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { animate } from "motion/react";
import { Camera, ChevronsLeftRight } from "lucide-react";

interface BeforeAfterProps {
  before: string;
  after: string;
  title: string;
  description: string;
}

function BeforeAfterSlider({ before, after, title, description }: BeforeAfterProps) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    if (animationRef.current) {
      animationRef.current.stop();
    }
    setIsDragging(true);
    handleMove(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onPointerMove = (e: PointerEvent) => {
      handleMove(e.clientX);
    };

    const onPointerUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);

    return () => {
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, [isDragging]);

  useEffect(() => {
    // Elegant auto-animation on page load
    const tempObj = { val: 90 };
    const controls = animate(tempObj, { val: [90, 15, 50] }, {
      times: [0, 0.45, 1],
      duration: 2.2,
      delay: 0.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: () => {
        setSliderPos(tempObj.val);
      }
    });
    animationRef.current = controls;
    return () => controls.stop();
  }, []);

  return (
    <div className="flex flex-col h-full bg-brand-blue/30 border border-brand-slate/40 hover:border-red-500/30 p-4 sm:p-5 rounded-3xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-red-600/10 group">
      {/* Slider Viewer Container */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className="relative h-72 sm:h-80 md:h-[380px] lg:h-[420px] w-full overflow-hidden rounded-2xl bg-brand-slate cursor-ew-resize select-none touch-none"
      >
        {/* After Image (Background) */}
        <img
          src={after}
          alt={`${title} - After`}
          className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
          referrerPolicy="no-referrer"
        />
        
        {/* Before Image (Overlay with clipPath) */}
        <div 
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={before}
            alt={`${title} - Before`}
            className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Labels / Badges */}
        <div className="absolute top-4 left-4 z-20 bg-black/70 backdrop-blur-md text-white font-sans text-[10px] sm:text-xs uppercase tracking-widest px-3 py-1 rounded-md font-bold select-none border border-white/10 shadow-lg">
          Before
        </div>
        <div className="absolute top-4 right-4 z-20 bg-red-600/90 backdrop-blur-sm text-white font-sans text-[10px] sm:text-xs uppercase tracking-widest px-3 py-1 rounded-md font-black select-none shadow-lg border border-red-500/20">
          After
        </div>

        {/* Sliding Divider Line */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-white z-20 shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          {/* Circular Drag Handle */}
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-brand-blue flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] border-2 border-red-600 cursor-ew-resize select-none z-30 group-hover:scale-110 transition-transform">
            <ChevronsLeftRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
          </div>
        </div>
      </div>

      {/* Copy / Details */}
      <div className="pt-5 pb-1 flex flex-col justify-between">
        <h3 className="font-display font-black text-lg sm:text-xl text-white mb-1.5 group-hover:text-red-500 transition-colors">
          {title}
        </h3>
        <p className="font-sans text-sm text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Gallery() {
  const projects = [
    {
      id: 1,
      title: "Complete Roof Replacement",
      description: "Weathered roof transformed into a premium black architectural shingle system.",
      before: "/src/assets/images/roof_one_before_1782703256513.jpg",
      after: "/src/assets/images/roof_one_after_1782703270009.jpg"
    },
    {
      id: 2,
      title: "New Construction Roofing",
      description: "Finished with a premium black architectural roof built for beauty and long-term durability.",
      before: "/src/assets/images/roof_two_before_1782703280805.jpg",
      after: "/src/assets/images/roof_two_after_1782703292881.jpg"
    }
  ];

  return (
    <section id="gallery" className="py-24 bg-brand-slate text-white relative scroll-mt-12">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-blue/30 via-transparent to-brand-blue/30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-sans text-xs font-bold text-red-500 uppercase tracking-[0.2em] flex items-center justify-center space-x-1.5"
          >
            <Camera className="w-4 h-4" />
            <span>See the Difference</span>
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white mt-3 mb-4 leading-tight"
          >
            Real Before & After Transformations
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base text-gray-300"
          >
            Drag the slider to compare each project and see the quality of our craftsmanship.
          </motion.p>
        </div>

        {/* Two Premium Before & After Slider Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              key={project.id}
            >
              <BeforeAfterSlider
                before={project.before}
                after={project.after}
                title={project.title}
                description={project.description}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
