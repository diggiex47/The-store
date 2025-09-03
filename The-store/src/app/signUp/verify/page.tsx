"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerificationPage() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const router = useRouter();
  const searchParms = useSearchParams();
  const email = searchParms.get("email");
  const [message, setMessage] = useState(""); // For success messages
  // --- NEW STATE FOR THE TIMER ---
  const [countdown, setCountdown] = useState(60); // Start countdown from 60 seconds
  const [isResending, setIsResending] = useState(false);

  const searchParams = useSearchParams();

  // --- NEW EFFECT FOR THE COUNTDOWN TIMER ---
  useEffect(() => {
    // If the countdown is active, set up an interval
    if (countdown > 0) {
      const timerId = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clean up the interval when the component unmounts or countdown finishes
      return () => clearInterval(timerId);
    }
  }, [countdown]);

  // --- NEW FUNCTION TO HANDLE RESENDING THE OTP ---
  const handleResendOtp = async () => {
    setIsResending(true);
    setError("");
    setMessage("");

    try {
      // We call the register endpoint again. It's designed to handle this.
      // We pass dummy values for name/password as they are required by the API
      // but not used when an unverified user already exists.
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name: "resend", password: "resend" }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to resend OTP.");
      }

      setMessage("A new OTP has been sent to your email.");
      setCountdown(60); // Reset the timer
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsResending(false);
    }
  };

  // verify the otp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      if (res.ok) {
        router.push("/signIn");
      } else {
        const data = await res.json();
        setError(data.message || "OTP verification failed");
      }
    } catch {
      console.log("verification failed ", error);
      setError("Something Went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <h2 className="mb-4 text-xl font-bold">Verify Your Email</h2>
      <p className="mb-4">OTP sent to: {email}</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter 6-digit OTP"
          className="input input-bordered mb-3 w-full"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>

        <div className="mt-4 text-center">
          <button
            onClick={handleResendOtp}
            disabled={countdown > 0 || isResending}
            className="btn btn-link" // Using a link-style button
          >
            {isResending
              ? "Sending..."
              : countdown > 0
                ? `Resend OTP in ${countdown}s`
                : "Didn't receive code? Resend"}
          </button>
        </div>
      </form>
    </div>
  );
}
