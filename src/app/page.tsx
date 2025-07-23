// src/app/page.tsx
import ProductWrapper from "@/components/wrapper/page";
import HomePageClient from "./HomePageClient";
import ProductList from "@/components/getProduct/page";


export default async function Home() {
  return (
    <>
      <HomePageClient />
      <ProductWrapper>
        <ProductList />
      </ProductWrapper>
    </>
  );
}