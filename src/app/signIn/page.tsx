"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  const [step, setStep] = useState<"username" | "password">("username");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleContinue = () => {
    if (!username || username.length < 3) {
      setErrorMsg("Username is not valid");
      return;
    }
    setErrorMsg("");
    setStep("password");
  };

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      setErrorMsg("Invalid username or password");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-4">
        {step === "username" && (
          <>
            <div className="space-y-1">
              <label className="input validator flex items-center gap-2">
                <input
                  type="text"
                  required
                  placeholder="Username"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength={3}
                  maxLength={30}
                  className="w-full bg-transparent outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
              <p className="text-xs text-gray-400">
                Must be 3–30 characters: letters, numbers, or dashes
              </p>
              <button className="btn w-full" onClick={handleContinue}>
                Continue
              </button>
            </div>

            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-gray-500">
                Don’t have an account?{" "}
                <a href="/signUp" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </p>
              <button
                className="btn btn-primary"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                Sign In with Google
              </button>
            </div>
          </>
        )}

        {step === "password" && (
          <>
            <div className="space-y-1">
              <label className="input validator flex items-center gap-2">
                <input
                  type="password"
                  required
                  placeholder="Password"
                  minLength={8}
                  className="w-full bg-transparent outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              <p className="text-xs text-gray-400">
                Must be at least 8 characters long
              </p>
              <button className="btn w-full" onClick={handleLogin}>
                Login
              </button>
            </div>
          </>
        )}

        {errorMsg && (
          <p className="text-center text-sm text-red-500">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}
