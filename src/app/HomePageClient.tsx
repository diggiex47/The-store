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

  // --- RE-TUNED ANIMATION TIMELINE ---

  // Overlay and Text animations remain the same
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const heroTextOpacity = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.5, 0.7],
    [0, 1, 1, 0],
  );
  const backgroundBlur = useTransform(
    scrollYProgress,
    [0.5, 0.7],
    ["blur(0px)", "blur(8px)"],
  );

  // --- TIMELINE CHANGES START HERE ---

  // The hero section now fades out faster, between 60% and 75% scroll.
  const heroSectionOpacity = useTransform(scrollYProgress, [0.6, 0.75], [1, 0]); // CHANGED

  // The hero section also moves up faster to match the new opacity timeline.
  const heroSectionY = useTransform(
    scrollYProgress,
    [0.6, 0.75],
    ["0%", "-50%"],
  ); // CHANGED (moves less for a smoother feel)

  // The image scales down faster as well.
  const heroImageScale = useTransform(scrollYProgress, [0.6, 0.75], [1, 0.8]); // CHANGED

  // The products now start fading in at 65% scroll and are fully visible by 85%.
  // This aggressive overlap ensures there is NO gap.


  return (
    // Reduce the total height to make the animation sequence tighter.
    <div ref={targetRef} className="relative h-[265vh]">
      {" "}
      {/* CHANGED */}
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* HERO CONTAINER */}
        <motion.div
          style={{
            opacity: heroSectionOpacity,
            y: heroSectionY,
          }}
          className="absolute inset-1"
        >
          <motion.div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1575663620136-5ebbfcc2c597?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              scale: heroImageScale,
            }}
          />
          <motion.div
            style={{ opacity: overlayOpacity, backdropFilter: backgroundBlur }}
            className="absolute inset-0 bg-black/50"
          />
          <motion.div
            style={{ opacity: heroTextOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <h1 className="text-center text-5xl font-bold text-green-300">
              WELCOME TO THE STORE
            </h1>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
