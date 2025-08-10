"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buildApiUrl } from "@/utils/api";

export default function ClientNav() {
  const [user, setUser] = useState<any | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        const res = await fetch(buildApiUrl("/auth/me"), { cache: "no-store" });
        const json = await res.json();
        if (mounted) setUser(json.user ?? null);
      } catch {
        // ignore
      }
    };
    run();
    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await fetch(buildApiUrl("/auth/logout"), { method: "POST" });
      setUser(null);
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <Link className="px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors" href="/jobs">Jobs</Link>
      <Link className="px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors opacity-60 pointer-events-none" href="/analytics">Analytics</Link>
      {user?.role === "admin" && (
        <Link className="px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors" href="/admin/invites">Admin</Link>
      )}
      {user ? (
        <>
          <Link className="px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors" href="/profile">Profile</Link>
          <button onClick={handleLogout} disabled={loading} className="px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors">{loading ? "…" : "Logout"}</button>
        </>
      ) : (
        <>
          <Link className="px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors" href="/login">Login</Link>
          <Link className="px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors" href="/register">Register</Link>
        </>
      )}
    </div>
  );
}


