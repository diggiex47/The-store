import { getCart } from "@/lib/cart";
import CartEntry from "./cartEntry";



export default async function cart() {

    const cart = await getCart();
    return(
        <div>
        <div className="mb-6 text-6xl font-bold">Your cart</div>
        {cart?.items.map(cartItem => (
            <CartEntry cartItem={cartItem} key={cartItem.product.id} />
        ))}
        </div>
    )
}