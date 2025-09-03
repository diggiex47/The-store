import { getCart } from "@/lib/cartxxxx";
import CartEntry from "./cartEntry";
import { SetProductQuantity } from "./action";
import { formatPrice } from "@/lib/format";



export default async function cart() {

    const cart = await getCart();
    return(
        <div>
        <div className="mb-6 text-6xl font-bold">Your cart</div>
        {cart?.items.map(cartItem => (
            <CartEntry cartItem={cartItem} key={cartItem.product.id} setProductQuantity={SetProductQuantity} />
        ))}

        {!cart?.items.length && <p>Your cart is empty</p>}
        <div className="flex flex-col items-center">
            <p className="mb-3 font-bold text-2xl"> Total: {formatPrice(cart?.subtotal || 0)}</p>
            <button className="btn btn-primary">Checkout</button>
        </div>
        </div>
    )
}