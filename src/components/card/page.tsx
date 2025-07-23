import React from "react";
import Link from "next/link";
import type { Product } from "../../generated/prisma";
import PriceTag from "../priceTag/page";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <div className="m-1">
    <div className="card  p-2 rounded-b-sm bg-green-100 text-black hover:drop-shadow-lg hover:shadow-cyan-300">
      <Link href={"/Product/" + product.id}>
        <figure className="h-64 w-full overflow-hidden rounded-t-sm">
          {product.imageUrl ? (
            <Image
            src={product.imageUrl}
              // src="https://images.unsplash.com/photo-1751378639381-e482ae167e39?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt={product.name}
              width={400}
              height={400}
              className="h-auto object-cover"
            />
          ) : null}
        </figure>

        <div className="card-body p-2">
          <div className="flex items-center justify-between">
            <h2 className="card-title">{product.name}</h2>
            {isNew && <div className="badge badge-secondary">New</div>}{" "}
          </div>
          <p>{product.description}</p>
          <div className="text-sm">
            <PriceTag price={product.price} />
          </div>
        </div>
      </Link>
    </div>
    </div>
  );
}
