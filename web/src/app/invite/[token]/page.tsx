"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { buildApiUrl } from "@/utils/api";

type InviteResp = {
  valid: boolean;
  invite?: { email: string; token: string; expires_at: string | Date; is_used: boolean };
  isExpired?: boolean;
  isUsed?: boolean;
};

export default function InviteAcceptPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const { token } = params;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<InviteResp | null>(null);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch(buildApiUrl(`/invites/${token}`), { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error ?? "Invalid or expired invite");
        setData(json);
      } catch (e: any) {
        setError(e?.message ?? "Failed to load invite");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [token]);

  const handleAccept = async () => {
    try {
      setAccepting(true);
      const res = await fetch(buildApiUrl(`/invites/redeem`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token })
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error ?? "Unable to redeem invite");
      // In a full flow this would redirect to sign-up with prefilled email
      router.replace("/jobs");
    } catch (e: any) {
      setError(e?.message ?? "Unable to redeem invite");
    } finally {
      setAccepting(false);
    }
  };

  if (loading) return <p className="text-sm text-muted">Validating invite…</p>;
  if (error) return <p className="text-sm text-red-400">{error}</p>;
  if (!data) return null;

  const { valid, invite, isExpired, isUsed } = data;
  const email = invite?.email ?? "";

  return (
    <section className="flex flex-col gap-4 max-w-lg">
      <h1 className="text-xl font-semibold">Accept Invite</h1>
      {valid ? (
        <>
          <p className="text-sm text-muted">You have been invited to join with email:</p>
          <p className="text-sm font-medium">{email}</p>
          <button
            onClick={handleAccept}
            disabled={accepting}
            className="rounded-md bg-white/10 hover:bg-white/15 px-4 py-2 text-sm w-fit"
          >
            {accepting ? "Accepting…" : "Accept Invite"}
          </button>
        </>
      ) : (
        <div className="text-sm">
          {isUsed ? <p>This invite has already been used.</p> : null}
          {isExpired ? <p>This invite has expired.</p> : null}
          {!isUsed && !isExpired ? <p>Invite is invalid.</p> : null}
        </div>
      )}
    </section>
  );
}


