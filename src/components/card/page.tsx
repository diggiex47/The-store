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
    <div>
      <Link
        href={"/Product/" + product.id}
        className="card hover:shadow-x1 bg-green-100 text-black shadow-xl hover:shadow-cyan-300"
      >
        <figure className="h-64 w-full overflow-hidden">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={400}
              className="h-auto object-cover"
            />
          ) : null}
        </figure>

        <div className="card-body p-4">
          <h2 className="card-title">{product.name}</h2>
          {isNew && <div className="badge badge-secondary">New</div>}
          <p>{product.description}</p>
          <PriceTag price={product.price} />
          <button className="btn btn-primary mt-2">Buy now</button>
        </div>
      </Link>
    </div>
  );
}
