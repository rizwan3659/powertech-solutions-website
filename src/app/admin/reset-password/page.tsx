"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token || !email) {
      setError("This reset link is invalid. Please request a new one.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      setSuccess(true);
      setTimeout(() => router.push("/admin/login"), 2500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100">
      <div className="max-w-md w-full p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Set New Password</h1>
          <p className="text-zinc-400">Choose a new password for your account</p>
        </div>

        {success ? (
          <div className="text-center">
            <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400">
              Your password has been updated. Redirecting to sign in…
            </div>
            <Link href="/admin/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
              Go to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}
            {!token || !email ? (
              <div className="p-3 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm">
                Missing or invalid reset link. Please{" "}
                <Link href="/admin/forgot-password" className="underline">
                  request a new one
                </Link>
                .
              </div>
            ) : null}

            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">New Password</label>
              <input
                type="password"
                required
                minLength={8}
                className="w-full px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Confirm Password</label>
              <input
                type="password"
                required
                minLength={8}
                className="w-full px-4 py-2 rounded-lg bg-zinc-950 border border-zinc-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Re-enter password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white rounded-lg font-medium transition-colors flex items-center justify-center mt-6"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Update Password"}
            </button>

            <div className="flex items-center justify-center mt-4 text-sm">
              <Link href="/admin/login" className="text-zinc-400 hover:text-white transition-colors">
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-500">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
