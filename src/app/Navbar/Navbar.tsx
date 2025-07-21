// src/app/Navbar/Navbar.tsx


import ThemeToggle from "./ThemeToggle"; // <-- IMPORT
import { searchProducts } from "@/components/SearchProduct/page"; // Import the search function



export default function Navbar() {
  return (
    <div className="bg-base-100 fixed top-0 left-0 right-0 z-50 h-16 backdrop-blur-sm">
      <div className="navbar m-auto flex h-full max-w-7xl flex-col sm:flex-row">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl normal-case">The Store</a>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
                <input 
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[150px] max-w-xs"
                ></input> </div>
          </form>
          {/* PLACE THE TOGGLE HERE */}
         
        </div>
         <ThemeToggle /> 
      </div>
    </div>
  );
}