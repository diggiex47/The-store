"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerSchema, RegisterSchemaType } from "../schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [errorinServer, seterrorinServer] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/signIn");
    } else {
      const errorData = await res.json();
      seterrorinServer(errorData.message || "Registration failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <h1 className="text-center text-2xl font-bold">Sign Up</h1>

        {errorinServer && <p className="text-sm text-red-500">{errorinServer}</p>}

        {/* Username Field */}
        <div>
          <input
            {...register("username")}
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
          />
          {errors.username && (
            <p className="text-sm text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative w-full">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full pr-12"
          />
          <button
            type="button"
            className="absolute top-2 right-3 flex text-gray-500"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </button>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/signIn" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
