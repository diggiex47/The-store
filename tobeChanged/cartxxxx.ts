import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type cartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: { include: { product: true } };
  };
}>;

export type cartItemWithProduct = Prisma.cartItemGetPayload<{
  include: { product: true };
}>;


export type shoppingCart = cartWithProducts & {
  size: number;
  subtotal: number;
};

export async function getCart(): Promise<shoppingCart | null> {
  // FIX: You must 'await' the cookies() function before calling .get()
  const localCartId = (await cookies()).get("localCartId")?.value;

  const cart = localCartId
    ? await prisma.cart.findUnique({
        where: { id: localCartId },
        include: {
          items: { include: { product: true } },
        },
      })
    : null;

  if (!cart) {
    return null;
  }

  return {
    ...cart,
    size: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    subtotal: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
}

export async function createCart(): Promise<shoppingCart> {
  const newCart = await prisma.cart.create({
    data: {},
  });

  // FIX 1: You must 'await' the cookies() function.
  // FIX 2: The .set() method takes (key, value) as arguments, not an object.
  const cookieStore = await cookies();
  cookieStore.set("localCartId", newCart.id);

  // This part of your code is perfect.
  return {
    ...newCart,
    items: [], // Explicitly add empty items to match the type
    size: 0,
    subtotal: 0,
  };
}
