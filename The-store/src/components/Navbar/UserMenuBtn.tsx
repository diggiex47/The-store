"use client";

//using client component because we have to use the onclick event which can be only done on client side not on the server side
// as we have to check what is the click event and then we have to redirect to the login page if the user is not logged in

import Image from "next/image";
import profilePic from "@/assest/grandmother.png";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import PixelButton from "../pixelButton/page";
// interface UserMenuBtnProps {
//   session: Session | null;
// }

export default function UserMenuBtn() {
  // const { data: session, status } = useSession();
  const router = useRouter();
  // const user = session?.user;

  //for the menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menu.current && !menu.current.contains(event.target as Node))
        setIsMenuOpen(false);
    }
    // Add the event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menu]);

  if (status === "loading") {
    return (
      <div className="h-10 w-32 animate-pulse rounded-full bg-gray-200"></div>
    );
  }

  // if (status === "authenticated" && user) {
  if (status === "authenticated") {
    return (
      <div className="group cusor-pointer relative" ref={menu}>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2"
        >
          {/* <Image
            // src={user?.image || profilePic}
            alt="Profile Picture"
            width={40}
            height={40}
            className="w-10 rounded-full cusor-pointer"
          /> */}
        </button>

        <div
          className={`absolute top-full right-0 mt-2 w-48 rounded-lg border-2 border-black bg-white p-2 shadow-[4px_4px_0px_#000] ${isMenuOpen ? "block" : "hidden"}`}
        >
          {/* <p className="px-2 py-1 text-sm text-gray-500">{user.name}</p> */}
          <p className="px-2 py-1 text-sm text-gray-500">{}</p>

          <Link
            href="/dashboard"
            className="block w-full rounded px-2 py-1 text-left font-bold text-black hover:bg-gray-100"
          >
            Dashboard
          </Link>
          {/* <button
            onClick={() => {
              signOut({ callbackUrl: "/" });
              setIsMenuOpen(false); // Close menu on sign out
            }}
            className="block w-full cursor-pointer rounded px-2 py-1 text-left font-bold text-red-600 hover:bg-gray-100"
          >
            Sign Out
          </button> */}
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4">
      <PixelButton onClick={() => router.push("/signIn")} variant="secondary">
        Login
      </PixelButton>

      <PixelButton onClick={() => router.push("/signUp")} variant="secondary">
        Join Now
      </PixelButton>
    </div>
  );
}
