import { getServerSession } from "next-auth";
import authOptions from "../api/auth/[...nextauth]/option";
import { redirect } from "next/navigation";
import HomePageClient from "../HomePageClient";
import ProductWrapper from "@/components/wrapper/page";
import ProductList from "@/components/getProduct/page";
import Navbar from "@/components/Navbar/Navbar";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/signIn?callbackUrl=/dashboard");
  }

  return (
    <div>
       <header className="sticky top-0 z-50">
               <Navbar />
             </header>
      <HomePageClient />
      <ProductWrapper>
        <ProductList />
      </ProductWrapper>
    </div>
  );
}
