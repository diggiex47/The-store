// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "./SessionProvider";
import Navbar from "../components/Navbar/Navbar";



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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
       <SessionProvider> 
         
        <Navbar />
        <main className="m-auto min-w-[300px] max-w-7xl p-4 pt-16">
          {children}
        </main>
        </SessionProvider>
      </body>
    </html>
  );
}