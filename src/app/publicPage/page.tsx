"use client";
import Link from "next/link";
import PixelButton from "@/components/pixelButton/page";
import router from "next/router";
export default function publicPage() {
  return (
    <div className="bg-being">
      <div className="sticky top-0 z-50">
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
      <div className="flex flex-grow items-center justify-center pt-50 pb-50 text-white">
        <div className="mx-auto w-full max-w-lg rounded-lg border-8 border-black bg-[#f5f5dc] p-8 text-center font-['VT323',_monospace] text-black shadow-2xl">
          <div className="mb-6 inline-block">
            <div className="relative h-24 w-24">
              <div className="absolute inset-0 rounded-full bg-red-500"></div>
              <div className="absolute inset-2 flex items-center justify-center rounded-full bg-white">
                <div className="h-2 w-full -rotate-45 transform bg-red-500"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-1">
                  <div className="h-2 w-2 rounded-full bg-black"></div>
                  <div className="h-1 w-8 rounded-full border-t-4 border-r-0 border-b-4 border-l-0 border-black"></div>
                  <div className="h-2 w-14 rounded-full border-t-4 border-r-0 border-b-4 border-l-0 border-black"></div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="mb-2 text-6xl font-bold">NO SESSION?</h1>
          <p className="mb-8 text-2xl">Please connect to access the store.</p>
        </div>
      </div>
    </div>
  );
}
