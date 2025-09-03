// src/app/ProductWrapper.tsx
'use client';

import React from "react";
import { motion } from "framer-motion";

interface ProductWrapperProps {
  children: React.ReactNode;
}

export default function ProductWrapper({ children }: ProductWrapperProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-15% 0px 0px 0px", once: true }}
      transition={{ 
        duration: 0.7,
        ease: [0.16, 0.77, 0.47, 0.97]
      }}
      className="relative z-10 pt-7"
    >
      {children}
    </motion.section>
  );
}