"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../../components/button/page";
import Link from "next/link";

export default function SignInPage() {
  const router = useRouter();

  //using cookies to remember me
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Save to cookie before sign-in
    document.cookie = `rememberMe=${rememberMe};  path=/`;

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        username,
        password,
        rememberMe, // this gets passed to the server
        redirect: false,
      });

      if (res?.ok) {
        router.push("/");
      } else {
        setErrorMsg("Invalid username or password");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Card Box */}
      <div className="w-full max-w-md space-y-6 rounded-md bg-white p-8 shadow-md">
        {/* Heading */}
        <h2 className="item-centre pr-6 text-center text-4xl font-bold text-gray-900">
          Sign In
        </h2>

        {/* Username/Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="text"
            required
            placeholder="Username or Email address..."
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength={3}
            maxLength={30}
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:ring-1 focus:ring-indigo-700 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            required
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:ring-1 focus:ring-indigo-700 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Remember Me + Forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center space-x-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="cursor-pointer border-gray-300"
            />
            <span>Remember me</span>
          </label>
          <a href="#" className="text-indigo-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Sign In Button */}
        <button
          onClick={handleLogin}
          className="btn mt-2 w-full rounded-md bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-700"
        >
          Sign in
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-sm text-gray-500">Or continue with</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        {/* Social login */}
        <div className="hover flex space-x-4">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="btn flex flex-1 items-center justify-center rounded-md border px-4 py-2 hover:bg-gray-50"
          >
            Google
          </button>
        </div>

        {/* Error message (optional) */}
        {errorMsg && (
          <p className="text-center text-sm text-red-500">{errorMsg}</p>
        )}
      </div>

      {/* Sign-up redirect below the card */}
      <p className="mt-6 text-center text-sm text-gray-600">
        Not a member?{" "}
        <Link href="/signUp" className="text-indigo-600 hover:underline">
          {" "}
          Join Now!!!
        </Link>
      </p>
    </div>
  );
}
