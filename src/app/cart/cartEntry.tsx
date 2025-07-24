"use client";

import { cartItemWithProduct } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";

interface CartEntryProps {
  cartItem: cartItemWithProduct;
}

export default function CartEntry({
  cartItem: { product, quantity },
}: CartEntryProps) {
  return (
    <div>
      <div className="item-centre flex flex-wrap gap-3">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <div>
            <Link href={"/product" + product.id} className="font-bold" >
            {product.name}
            </Link>
            <div>Price:{product.price} </div>
            <div className="my-1">Quantity: {quantity}</div>
            <div className="flex items-center gap-3">
                Total : {formatPrice(product.price * quantity)}
            </div>
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
