"use client";

//using client component because we have to use the onclick event which can be only done on client side not on the server side
// as we have to check what is the click event and then we have to redirect to the login page if the user is not logged in

import { Session } from "next-auth";
import Image from "next/image";
import profilePic from "@/assest/grandmother.png";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
// interface UserMenuBtnProps {
//   session: Session | null;
// }

export default function UserMenuBtn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user;
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        {user ? (
          <Image
            src={user?.image || profilePic}
            alt="Profile Picture"
            width={40}
            height={40}
            className="w-10 rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        )}
      </label>

      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
      >
        <li>
          {user ? (
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              SignOut
            </button>
          ) : (
            <button
              onClick={() => router.push("/signIn")}
            >
              SignIn
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
