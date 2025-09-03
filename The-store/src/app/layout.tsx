// src/app/layout.tsx
import { AuthProvider } from "@/app/context/AuthContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/footer/page";

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
        <AuthProvider>
          {/* <header className="sticky top-0 z-50"> */}
          {/* <Navbar /> */}
          {/* </header> */}
          <main className="flex flex-grow flex-col bg-[#f5f5dc]">
            {children}
          </main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
