"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerificationPage() {
  const [opt, setOpt] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const router = useRouter();
  const searchParms = useSearchParams();
  const email = searchParms.get("email");

  //trigger the otp when the page loads
  useEffect(() => {
    const sendOtp = async () => {
      if (!email) return;
      try {
        const res = await fetch("/api/otp/send", {
          method: "POST",
          headers: { "Content-Typee": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (res.ok) {
          setStatus("OTP SENT Successfully");
        } else {
          const data = await res.json();
          setStatus("Failed to send OTP: " + data.message);
        }
      } catch (err) {
        setStatus("Error sending OTP.");
      }
    };

    sendOtp();
  }, [email]);

  // verify the otp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, opt }),
      });

      if (res.ok) {
        router.push("/signIn");
      } else {
        const data = await res.json();
        setError(data.message || "OTP verification failed");
      }
    } catch {
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
          value={opt}
          onChange={(e) => setOpt(e.target.value)}
          placeholder="Enter OTP"
          className="input input-bordered mb-3 w-full"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
}
