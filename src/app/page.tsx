// This remains a Server Component

import HomePageClient from "./HomePageClient";
import ProductList from "@/components/getProduct/page";

export default async function Home() {
  // 1. Fetch data on the server

  // 2. Pass the rendered server component (or its data) to the client component
  return (
    <main>
      <HomePageClient/>
      <ProductList/>
    </main>
  );
}