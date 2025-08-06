"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { registerSchema, RegisterSchemaType } from "../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [errorinServer, seterrorinServer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCofirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register,handleSubmit,formState: { errors }} = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    setLoading(true);
    seterrorinServer(""); // optional: clear previous errors
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        router.push(`/signUp/verify?email=${data.email}`);
      } else {
        const errorData = await res.json();
        seterrorinServer(errorData.error || "Registration failed");
      }
    } catch (err) {
      seterrorinServer("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm space-y-4"
      >
        <h1 className="text-center text-2xl font-bold">Sign Up</h1>

        {errorinServer && (
          <p className="text-sm text-red-500">{errorinServer}</p>
        )}

        {/* Email */}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email*
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="mt-1 w-full overflow-x-auto rounded-md border px-3 py-2 pr-14 whitespace-nowrap shadow-sm focus:ring-1 focus:ring-indigo-700 focus:outline-none"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Username Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username*
          </label>
          <input
            {...register("username")}
            type="text"
            placeholder="Username"
            className="mt-1 w-full rounded-md border px-3 py-2 shadow-sm focus:ring-1 focus:ring-indigo-700 focus:outline-none"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative w-full">
          <label className="block text-sm font-medium text-gray-700">
            Password*
          </label>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="mt-1 w-full overflow-x-auto rounded-md border px-3 py-2 pr-14 whitespace-nowrap shadow-sm focus:ring-1 focus:ring-indigo-700 focus:outline-none"
          />
          <button
            type="button"
            className="absolute top-11 right-3 -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="relative w-full">
          <label className="block text-sm font-medium text-gray-700">
            Confirm-Password*
          </label>
          <input
            {...register("confirmPassword")}
            type={showCofirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            className="mt-1 w-full overflow-x-auto rounded-md border px-3 py-2 pr-14 whitespace-nowrap shadow-sm focus:ring-1 focus:ring-indigo-700 focus:outline-none"
          />
          <button
            type="button"
            className="absolute top-11 right-3 -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showCofirmPassword ? <EyeOff /> : <Eye />}
          </button>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="mr-2 animate-spin">⏳</span> Registering...
            </>
          ) : (
            "Register"
          )}
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/signIn" className="text-blue-600 hover:underline">
            Sign In{" "}
          </Link>
        </p>
      </form>
    </div>
  );
}
