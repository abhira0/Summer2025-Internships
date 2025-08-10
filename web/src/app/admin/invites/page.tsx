"use client";

import { useEffect, useMemo, useState } from "react";
import type { Invite } from "@/types/invite";
import Link from "next/link";
import { buildApiUrl } from "@/utils/api";

export default function AdminInvitesPage() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [creating, setCreating] = useState(false);
  const [me, setMe] = useState<any | null>(null);

  const baseUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.protocol}//${window.location.host}`;
  }, []);

  useEffect(() => {
    const loadMe = async () => {
      try {
        const res = await fetch(buildApiUrl("/auth/me"), { cache: "no-store" });
        const json = await res.json();
        setMe(json);
      } catch {
        setMe(null);
      }
    };
    loadMe();
  }, []);

  const fetchInvites = async () => {
    try {
      setLoading(true);
      const res = await fetch(buildApiUrl("/invites"), { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load invites");
      const data = await res.json();
      setInvites(data.invites ?? []);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load invites");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreating(true);
      setError(null);
      const res = await fetch(buildApiUrl("/invites"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, expiresInDays })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Failed to create invite");
      setEmail("");
      setExpiresInDays(7);
      await fetchInvites();
    } catch (e: any) {
      setError(e?.message ?? "Failed to create invite");
    } finally {
      setCreating(false);
    }
  };

  const now = new Date();

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-xl font-semibold">Invites</h1>
      {me && me.user && me.user.role !== "admin" ? (
        <div className="text-sm">
          <p>You do not have access to this page. <Link href="/login" className="underline">Login</Link> with an admin account.</p>
        </div>
      ) : null}

      <form onSubmit={handleCreate} className="flex flex-wrap items-end gap-3 border border-default rounded-md p-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-md border border-default bg-transparent px-3 py-2 text-sm"
            placeholder="user@example.com"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm">Expires in (days)</label>
          <input
            type="number"
            min={1}
            max={90}
            value={expiresInDays}
            onChange={(e) => setExpiresInDays(Number(e.target.value))}
            className="rounded-md border border-default bg-transparent px-3 py-2 text-sm w-28"
          />
        </div>
        <button
          type="submit"
          disabled={creating}
          className="rounded-md bg-white/10 hover:bg-white/15 px-4 py-2 text-sm"
        >
          {creating ? "Creating…" : "Create Invite"}
        </button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </form>

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : invites.length === 0 ? (
        <p className="text-sm text-muted">No invites yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b border-default">
                <th className="py-2 pr-3">Email</th>
                <th className="py-2 pr-3">Token</th>
                <th className="py-2 pr-3">Link</th>
                <th className="py-2 pr-3">Created</th>
                <th className="py-2 pr-3">Expires</th>
                <th className="py-2 pr-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {invites.map((inv) => {
                const createdAt = new Date(inv.created_at);
                const expiresAt = new Date(inv.expires_at);
                const isExpired = expiresAt < now;
                const isUsed = inv.is_used;
                const link = `${baseUrl}/invite/${inv.token}`;
                return (
                  <tr key={inv.token} className="border-b border-default/60">
                    <td className="py-2 pr-3">{inv.email}</td>
                    <td className="py-2 pr-3 font-mono text-xs truncate max-w-[180px]">{inv.token}</td>
                    <td className="py-2 pr-3">
                      <a href={link} className="underline break-all" target="_blank" rel="noreferrer">Open</a>
                    </td>
                    <td className="py-2 pr-3">{createdAt.toLocaleString()}</td>
                    <td className="py-2 pr-3">{expiresAt.toLocaleString()}</td>
                    <td className="py-2 pr-3">
                      {isUsed ? (
                        <span className="text-green-400">Used</span>
                      ) : isExpired ? (
                        <span className="text-yellow-400">Expired</span>
                      ) : (
                        <span className="text-blue-400">Pending</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}


