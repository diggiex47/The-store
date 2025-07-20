// src/app/HomePageClient.tsx
"use client";


import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// This component will receive the server-rendered products as a prop
export default function HomePageClient() {
  // A ref to the element that will contain the entire scrollable scene
  const targetRef = useRef<HTMLDivElement | null>(null);

  // useScroll will track the scroll progress within targetRef
  const { scrollYProgress } = useScroll({
    target: targetRef,
    // Start tracking when the top of the container hits the top of the viewport
    // End tracking when the bottom of the container hits the bottom of the viewport
    offset: ["start start", "end end"],
  });

  // --- Define Animations based on Scroll Progress ---

  // Animate the hero image's opacity. It will fade out as we scroll down.
  // It starts at 1 (fully visible) and ends at 0 (fully transparent)
  // The [0, 0.5] part means this animation happens during the first 50% of the scroll.
  const heroImageOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  // Animate the hero image's scale. It will shrink slightly for a nice effect.
  const heroImageScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  // Animate the hero text's opacity. It will fade in and then out.
  // It's invisible at the start, fully visible at 20% scroll, and gone by 50%.
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [0, 1, 0]);
  
  // Animate the hero text's y-position. It will move up slightly as it fades.
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-100%"]);

  // Animate the product section's opacity. It fades in as the hero fades out.
  const productsOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  return (
    // This container needs a defined height for the scroll animations to work.
    // 300vh means the scrollable area is 3 times the viewport height.
    <div ref={targetRef} className="relative h-[300vh]">
      {/* This is the sticky container that holds our animated elements */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Animated Hero Image */}
        <motion.div
          style={{ opacity: heroImageOpacity, scale: heroImageScale }}
          className="absolute inset-0"
        >
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1575663620136-5ebbfcc2c597?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          />
          {/* A dark overlay to make text more readable */}
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        {/* Animated Hero Text */}
        <motion.div
          style={{ opacity: heroTextOpacity, y: heroTextY }}
          className="absolute inset-0 flex items-center justify-center text-neutral-content"
        >
          <h1 className="text-5xl font-bold text-green-300 text-center">
            WELCOME TO THE STORE
          </h1>
        </motion.div>

        {/* Animated Products Section */}
        <motion.div
          style={{ opacity: productsOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* We pass the pre-rendered products from the server component here */}
          <div className="mx-auto p-4"></div>
        </motion.div>

      </div>
    </div>
  );
}