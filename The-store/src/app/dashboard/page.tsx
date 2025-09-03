"use client";

import { useAuth } from "../context/AuthContext";
import { redirect } from "next/navigation";
import HomePageClient from "../HomePageClient";
import ProductWrapper from "@/components/wrapper/page";
import ProductList from "@/components/getProduct/page";
import Navbar from "@/components/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default  function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signIn?callbackUrl=/dashboard");
    }
  }, [user, loading, router]);

  // 5. Show a loading state while checking the session
  if (loading || !user) {
    return <div>Loading dashboard...</div>; // Or a loading spinner
  }

  return (
    <div>
      <header className="sticky top-0 z-50">
        <Navbar />
      </header>
      {/* <HomePageClient /> */}
      {/* <ProductWrapper> */}
        {/* <ProductList /> */}
      {/* </ProductWrapper> */}
    </div>
  );
}
