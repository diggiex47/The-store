// This remains a Server Component

import HomePageClient from "./HomePageClient";
import ProductList from "@/components/getProduct/page";

export default async function Home() {
  // The layout provides the <main> tag now.
  // This component should only return its specific content.
  // We use a React Fragment (<>) to return multiple components.
  return (
    <>
      <HomePageClient/>
        <ProductList />
    </>
  );
}