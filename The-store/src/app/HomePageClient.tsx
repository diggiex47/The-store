// src/app/HomePageClient.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomePageClient() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Optimized animation curves
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);
  const heroTextOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const heroMovement = useTransform(scrollYProgress, [0.5, 0.9], [0, -25]);

  return (
    <div ref={containerRef} className="relative h-[175vh]">
      {/* Hero container with delayed movement */}
      <motion.div 
        className="sticky top-0 h-screen w-full"
        style={{ y: heroMovement }}
      >
        {/* Hero image */}
        <div className="absolute inset-0">
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1575663620136-5ebbfcc2c597?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          />
          
          {/* Overlay with smoother fade */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-black/50 transition-opacity duration-300"
          />
          
          {/* Text with crisp appearance */}
          <motion.div
            style={{ opacity: heroTextOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <h1 className="text-center text-5xl font-bold text-green-300 drop-shadow-lg">
              WELCOME TO THE STORE
            </h1>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}