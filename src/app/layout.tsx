// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import Navbar from "../components/Navbar/Navbar";
import Footer from "@/components/footer/page";
import LayoutWrapper from "@/components/layoutWrapper/layoutwrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Store",
  description: "Give some Recive some",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Set a default theme here
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <SessionProvider>
          {/* <header className="sticky top-0 z-50"> */}
          {/* <Navbar /> */}
          {/* </header> */}
          <main className="flex flex-grow flex-col bg-[#f5f5dc]">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
