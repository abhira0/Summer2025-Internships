"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { buildApiUrl } from "@/utils/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(buildApiUrl("/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Login failed");
      router.replace("/jobs");
    } catch (e: any) {
      setError(e?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-sm">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="rounded-md border border-default bg-transparent px-3 py-2 text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="rounded-md border border-default bg-transparent px-3 py-2 text-sm"
        />
        <button type="submit" disabled={loading} className="rounded-md bg-white/10 hover:bg-white/15 px-4 py-2 text-sm">
          {loading ? "Logging in…" : "Login"}
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    </section>
  );
}


