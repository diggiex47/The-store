// Location: src/components/LayoutWrapper.tsx

"use client"; // This component needs to run in the browser to check the session.

import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar/Navbar"; // Adjust path to your Navbar if needed
import Footer from "@/components/footer/page";   // Adjust path to your Footer if needed

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  // The useSession hook gets the user's login status.
  const { status } = useSession();

  // If the user is logged in, show the full layout.
  if (status === "authenticated") {
    return (
      <>
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </>
    );
  }

  // If the user is "unauthenticated" or the session is still "loading",
  // just show the page content without the navbar and footer.
  return (
    <main className="flex-grow flex flex-col">
      {children}
    </main>
  );
}
