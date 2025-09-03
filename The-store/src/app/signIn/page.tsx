"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/api";
import Link from "next/link";
import PixelButton from "@/components/pixelButton/page";
import { useAuth } from "@/app/context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();

  //using cookies to remember me
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCofirmPassword, setShowConfirmPassword] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const { setUser } = useAuth();

  //for ui feedback
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMsg(""); //using this to clear the old error message

    // Save to cookie before sign-in
    document.cookie = `rememberMe=${rememberMe};  path=/`;

    try {
      // 3. The login function now returns the response data
      const responseData = await login(username, password);


      
      console.log("Login successful, user data:", responseData.user);
      // 4. Update the global user state immediately
      if (responseData.user) {
        setUser(responseData.user);
      }
      // console.log("WORKING", responseData);

      console.log("Login successful, user data:", responseData.user);

      // 5. NOW, with the state updated, redirect
      // router.push(callbackUrl);

      router.push(callbackUrl);
     
      // const data = await CheckStatus.json();

      // if (data.status === "unverified") {
      //   router.push(`/signUp/verify?email=${data.email}`);
      //   setLoading(false);
      //   return;
      // }

      // if (data.status === "not_found") {
      //   setErrorMsg("User not found. Please check your username or email.");
      //   setLoading(false);
      //   return;
      // }

      // const result = await signIn("credentials", {
      //   username,
      //   password,
      //   callbackUrl: callbackUrl,
      // });
      // if (result?.error) {
      //   setErrorMsg("Invalid username or password.");
      // }

      // if (result?.ok) {
      //   router.push("/dashboard");
      //   return;\
      // }

      // if (result?.error?.startsWith("unverified")) {
      //   const email = result.error.split(":")[1];
      //   router.push(`/signUp/verify?email=${email}`);
      // } else if (result?.error?.startsWith("use")) {
      //   setErrorMsg("Please use your Email Id until verified");
      // } else {
      //   // This will now only catch actual password errors from NextAuth.
      //   console.log(result?.error);
      //   setErrorMsg("Invalid username or password.");
      // }
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-beige flex min-h-screen flex-col items-center justify-center px-4 pt-23">
      {/* Card Box */}
      <div className="w-full max-w-md space-y-6 rounded-md bg-white p-8 shadow-md">
        {/* Heading */}
        <h2 className="item-centre pr-6 text-center text-4xl font-bold text-gray-900">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username/Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="text"
              required
              placeholder="Username or Email address..."
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
            <button
              type="button"
              className="absolute top-11 right-3 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-black focus:outline-none"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showCofirmPassword ? <EyeOff /> : <Eye />}
            </button>
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
          <PixelButton
            type="submit"
            className="hover:pointer w-full"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign in"}
          </PixelButton>
        </form>
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
