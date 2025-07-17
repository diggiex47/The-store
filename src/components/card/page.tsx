import React from 'react';
<<<<<<< HEAD
import Image from 'next/image';

const ProductCard: React.FC = () => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <Image
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Card Title</h2>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
=======
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
>>>>>>> 69e21060e5c278c3c26577a4a8794e33e2c66ca9
