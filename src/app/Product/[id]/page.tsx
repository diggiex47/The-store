import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/components/priceTag/page";
import { cache } from "react";
import { Metadata } from "next";
import AddToCartButton from "./AddToCartButton";
import { IncProductCount } from "./action";

interface ProductPageProps {
    params: {id : string};
}

const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({where: {id}})
    if(!product) notFound();
    return product;
})

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: product.name + " | The Store",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}


export default async function ProductPage(
    {params: {id}} : ProductPageProps
){
    const product = await prisma.product.findUnique({where: {id}})
    if(!product) notFound();


    return (
        <div className="flex flex-col items-center justify-center gap-4 lg:flex-row">
            <Image 
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={300}
            className="rounded-lg shadow-lg"
            priority
            />

            <div>
                <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
                <PriceTag  price={product.price} className="mt-2"/>
                <p className="my-6">{product.description}</p>
                <AddToCartButton
                    productId={product.id}
                    IncProductCount={IncProductCount}
                />
            </div>
        </div>
    )
}