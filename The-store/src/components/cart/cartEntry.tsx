"use client";

import { cartItemWithProduct } from "@/lib/cartxxxx";
import { formatPrice } from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { JSX } from "react/jsx-runtime";

interface CartEntryProps {
  cartItem: cartItemWithProduct;
  setProductQuantity : (product : string, quantity: number) => Promise<void>;
}

export default function CartEntry({
  cartItem: { product, quantity },
  setProductQuantity
}: CartEntryProps) {
const [isPending, startTransition ] = useTransition();

const quantityOption: JSX.Element[] =[];
  for(let i = 1; i<= 99; i++) {
    quantityOption.push(
     <option value={i} key={i}>
      {i}
     </option>
  )
}

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
            <div className="my-1 flex items-center gap-2">Quantity: 
              <select className="select select-bordered w-full max-w-[80px]"
              defaultValue={quantity}
              onChange={e => {
                    const newQuantity = parseInt(e.currentTarget.value)
                    startTransition(async () => {
                      await setProductQuantity(product.id, newQuantity);
                    })
              }}>
                <option value={0}>0</option>
                 {quantityOption}
              </select>
            </div>
            <div className="flex items-center gap-3">
                Total : {formatPrice(product.price * quantity)}
                {isPending && <span className="loading loading-spinner loading-sm" />}
            </div>
            
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
