// src/app/HomePageClient.tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomePageClient() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // --- ANIMATION TIMELINE ---

  // 1. Overlay Opacity
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // 2. Text Opacity
  const heroTextOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.5, 0.7],
    [0, 1, 1, 0]
  );

  // 3. Background Blur
  const backgroundBlur = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    ["blur(0px)", "blur(8px)"]
  );

  // 4. Hero Section's Final Fade-Out
  const heroSectionOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.8],
    [1, 0]
  );

  // 5. Hero Section's Upward Movement
  const heroSectionY = useTransform(
    scrollYProgress,
    [0.5, 0.8],
    ["0%", "-100%"]
  );

  // 6. Hero Image Scale // <-- NEW
  // Starts shrinking at 50% scroll (when the fade/blur begins),
  // down to 80% of its size by the time it has faded out at 80% scroll.
  const heroImageScale = useTransform(scrollYProgress, [0.5, 0.8], [1, 0.8]);

  // 7. Products Section Opacity
  const productsOpacity = useTransform(
    scrollYProgress,
    [0.65, 0.8],
    [0, 1]
  );

  return (
    <div ref={targetRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* --- HERO CONTAINER --- */}
        <motion.div
          style={{
            opacity: heroSectionOpacity,
            y: heroSectionY,
          }}
          className="absolute inset-0"
        >
          {/* Hero Image (base layer) - NOW a motion.div to handle its own scale */}
          <motion.div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1575663620136-5ebbfcc2c597?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              scale: heroImageScale, // <-- NEW
            }}
          />

          {/* Animated Overlay with Blur */}
          <motion.div
            style={{
              opacity: overlayOpacity,
              backdropFilter: backgroundBlur,
            }}
            className="absolute inset-0 bg-black/50"
          />

          {/* Animated Hero Text */}
          <motion.div
            style={{ opacity: heroTextOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <h1 className="text-5xl font-bold text-green-300 text-center">
              WELCOME TO THE STORE
            </h1>
          </motion.div>
        </motion.div>

        {/* --- PRODUCTS CONTAINER --- */}
        <motion.div
          style={{ opacity: productsOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Replace this with your actual product grid component */}
          <div className="mx-auto grid max-w-4xl grid-cols-3 gap-8 p-4">
            <div className="h-48 w-full rounded-lg bg-neutral-700"></div>
            <div className="h-48 w-full rounded-lg bg-neutral-700"></div>
            <div className="h-48 w-full rounded-lg bg-neutral-700"></div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}