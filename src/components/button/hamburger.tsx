// Location: src/components/AnimatedMenuButton.tsx

"use client";

import React from "react";

// Define the props the component will accept.
// - isOpen: a boolean to control the open/closed state from a parent component.
// - onClick: a function to call when the button is clicked.
interface AnimatedMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function AnimatedMenuButton({
  isOpen,
  onClick,
}: AnimatedMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      // --- CHANGE: Increased border width for a bolder look ---
      className="relative h-14 w-14 rounded-lg border-4 border-black bg-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      aria-label="Toggle menu"
    >
      {/* This container centers the three bars */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        {/* Each `span` is one of the three bars of the hamburger icon.
          The classes have been updated for a thicker, bolder appearance.
        */}
        <span
          className={`absolute block h-1 w-7 transform bg-black transition duration-300 ease-in-out ${
            isOpen ? "rotate-45" : "-translate-y-2.5"
          }`}
        ></span>
        <span
          className={`absolute block h-1 w-7 transform bg-black transition duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`absolute block h-1 w-7 transform bg-black transition duration-300 ease-in-out ${
            isOpen ? "-rotate-45" : "translate-y-2.5"
          }`}
        ></span>
      </div>
    </button>
  );
}
