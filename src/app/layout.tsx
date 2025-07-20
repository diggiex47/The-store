import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

//now importing the session provider from the file which we created in the src/app folder
// and we use currly braces when we are importing a default export or a named export.
import SessionProvider from "./SessionProvider"
import Navbar from "./Navbar/Navbar";


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
    <html lang="en" >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

       {/* wrapeed in the sessionprovider so the user session remains throughout all the compoenet of the site and it works smoothly  */}
       
       <SessionProvider> 
        <Navbar />
        <main className="pt-18 m-auto min-w-[300px] max-w-7xl theme:light">
        {children}
        </main>
        </SessionProvider>

      </body>
    </html>
  );
}
  
