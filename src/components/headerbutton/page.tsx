
// components/AuthHeader.tsx
"use client";

import Link from "next/link";
import  PixelButton  from "@/components/pixelButton/page"; // update path as needed

export default function HeaderButton() {
  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between p-4">
        <PixelButton
          variant="secondary"
          size="lg"
          className="top-4 left-4 z-50"
        >
          Open Menu
        </PixelButton>

        <div className="flex items-center space-x-4">
          <Link href="/signIn">
            <PixelButton size="lg" variant="primary">
              Login
            </PixelButton>
          </Link>
          <Link href="/signUp">
            <PixelButton
              className="bg-[#9C1A3C] hover:bg-red-700"
              size="lg"
              variant="secondary"
            >
              Join Now
            </PixelButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
