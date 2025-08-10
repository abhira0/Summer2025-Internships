"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { buildApiUrl } from "@/utils/api";

export default function RegisterPage() {
  const search = useSearchParams();
  const router = useRouter();
  const token = search.get("token") ?? "";
  const prefillEmail = search.get("email") ?? "";
  const [email, setEmail] = useState(prefillEmail);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEmail(prefillEmail);
  }, [prefillEmail]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(buildApiUrl("/auth/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, name, password, token }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Registration failed");
      router.replace("/jobs");
    } catch (e: any) {
      setError(e?.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-sm">
      <h1 className="text-xl font-semibold mb-4">Create your account</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-md border border-default bg-transparent px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="rounded-md border border-default bg-transparent px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          {loading ? "Creating…" : "Create account"}
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>
    </section>
  );
}


