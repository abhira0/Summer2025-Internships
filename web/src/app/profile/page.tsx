"use client";

import { useEffect, useState } from "react";
import type { User } from "@/types/user";
import { buildApiUrl } from "@/utils/api";

export default function ProfilePage() {
  const [user, setUser] = useState<Pick<User, "_id" | "username" | "email" | "name" | "role"> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch(buildApiUrl("/auth/me"), { cache: "no-store" });
        const json = await res.json();
        setUser(json.user ?? null);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <p className="text-sm text-muted">Loading…</p>;
  if (error) return <p className="text-sm text-red-400">{error}</p>;

  if (!user) {
    return <p className="text-sm">You are not logged in.</p>;
  }

  return (
    <section className="max-w-2xl flex flex-col gap-4">
      <h1 className="text-xl font-semibold">Profile</h1>
      <div className="rounded-md border border-default p-4">
        <div className="text-sm"><span className="text-muted">Username:</span> {user.username}</div>
        <div className="text-sm"><span className="text-muted">Email:</span> {user.email}</div>
        <div className="text-sm"><span className="text-muted">Name:</span> {user.name ?? "—"}</div>
        <div className="text-sm"><span className="text-muted">Role:</span> {user.role}</div>
      </div>
    </section>
  );
}


