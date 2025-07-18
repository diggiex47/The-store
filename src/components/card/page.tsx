import React from 'react';
import Link  from 'next/link';
import type { Product } from '../../generated/prisma';
import PriceTag from '../priceTag/page';
import Image from 'next/image';


interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product }: ProductCardProps) {

  const isNew =  Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 *24 * 7;

  return (
    <div className="p-2 ">
    <Link href={`/product/${product.id}`} className="card bg-green-100 shadow-xl text-black hover:shadow-x1 hover:shadow-cyan-300">
      <figure className=" h-64 w-full overflow-hidden">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className='h-auto object-cover'
          />) : null}
      </figure>

      <div className= 'card-body p-4'>
        <h2 className="card-title">
          {product.name}
          </h2>
          {isNew && <div className='badge badge-secondary'>New</div>}
          <p>
            {product.description}
          </p>
          <PriceTag price={product.price} />
      </div>
      
    </Link>
    </div>
  )
}