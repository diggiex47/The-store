// src/app/Navbar/Navbar.tsx

import Link from "next/link";
import ThemeToggle from "./ThemeToggle"; // <-- IMPORT
import { searchProducts } from "@/components/SearchProduct/page"; // Import the search function
import UserMenuBtn from "./UserMenuBtn";

import { getCart } from "@/lib/cart";

export default async function Navbar() {
  
  const cart = await getCart();
  return (
    <div className="bg-base-100 fixed top-0 right-0 left-0 z-50 h-16 backdrop-blur-sm">
      <div className="navbar m-auto flex h-full max-w-7xl flex-col sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            The Store
          </Link>
        </div>
        <div className="flex-none gap-1">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full max-w-xs min-w-[150px]"
              ></input>
            </div>
          </form>
          
          {/* PLACE THE TOGGLE HERE */}
        

        </div>
        {/* <ShoppingCartBtn cart={cart} /> */}
        <ThemeToggle />
        <UserMenuBtn />
      </div>
      
    </div>
  );
}
