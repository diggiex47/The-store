import React from 'react';
import Link  from 'next/link';
import type { Product } from '../../generated/prisma';
import PriceTag from '../priceTag/page';
import Image from 'next/image';


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {

  const isNew =  Date.now() - new Date(product.createdAt).getTime() < 1000 * 60 * 60 *24 * 7;

  return (
    <>
    <Link href={`/product/${product.id}`} className="card w-auto m-auto bg-blue-200 text-black hover:shadow-x2 transition-opacity">
      <figure>
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={300}
            className='h-auto object-cover'
          />) : null}
      </figure>

      <div className= 'card-body'>
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
    </>
  )
}