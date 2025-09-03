// src/app/Navbar/Navbar.tsx

import Link from "next/link";
import UserMenuBtn from "./UserMenuBtn";


export default  function Navbar() {
  // const cart = await getCart();
  return (
    <div>
      <nav className="border-b-4 border-black bg-[#FEF7F3] p-4">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left Section: "Learn More" button, hidden on smaller screens */}
          <div className="hidden md:flex">
            <button className="flex items-center gap-2 rounded-full border-2 border-black bg-white px-5 py-2 font-bold transition-all hover:bg-gray-100 focus:ring-2 focus:ring-black focus:ring-offset-2 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3" // Bolder stroke to match the site's aesthetic
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              Learn More
            </button>
          </div>

          <div className="relative flex flex-1   justify-between ">
            {/* Center Section: Logo - Styled to be bolder and have tighter tracking */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 text-4xl font-extrabold tracking-tighter text-black"
            >
              RetroBike DB
            </Link>

            {/* Right Section: We now render your UserMenuBtn component here */}
            <div>
              <Link href="/chat-test" className="relative inline-block">
                Chat-test
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <UserMenuBtn />
          </div>
        </div>
      </nav>
    </div>
    // <div className="bg-base-100 fixed top-0 right-0 left-0 z-50 h-16 backdrop-blur-sm">
    //   <div className="navbar m-auto flex h-full max-w-7xl flex-col sm:flex-row">
    //     <div className="flex-1">
    //       <Link href="/" className="btn btn-ghost text-xl normal-case">
    //         The Store
    //       </Link>
    //     </div>
    //     <div className="flex-none gap-1">
    //       <form action={searchProducts}>
    //         <div className="form-control">
    //           <input
    //             name="searchQuery"
    //             placeholder="Search"
    //             className="input input-bordered w-full max-w-xs min-w-[150px]"
    //           ></input>
    //         </div>
    //       </form>

    //       {/* PLACE THE TOGGLE HERE */}

    //     </div>
    //     {/* <ShoppingCartBtn cart={cart} /> */}
    //     <ThemeToggle />
    //     <UserMenuBtn />
    //   </div>

    // </div>
  );
}
