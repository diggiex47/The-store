"use server";

import { getCart, createCart } from "@/lib/cart";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function IncProductCount(productId: string) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (articleInCart) {
    await prisma.cartItem.update({
      where: { id: articleInCart.id },
      data: { quantity: {increment: 1} },
    });
 } else {
    await prisma.cartItem.create({
        data: {
            cartId: cart.id,
            productId,
            quantity: 1,
        },
 });
}

revalidatePath("/Product/[id]");
}