"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { parseJwt } from "@/utils/jwt";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    const payload = token ? parseJwt(token) : null;
    const isExpired = payload && typeof payload.exp === 'number' && Date.now() / 1000 >= payload.exp;
    if (!token || !payload || isExpired) {
      try { localStorage.removeItem("jwt_token"); } catch {}
      router.replace("/login?redirect=/");
    }
  }, [router]);

  return (
    <section className="flex flex-col gap-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">KapLabs Jobs</h1>
      <p className="text-muted max-w-prose">
        Track job postings, save interesting roles, and keep your search organized.
      </p>
      <div className="flex items-center gap-3">
        <Link href="/jobs" className="focus-ring inline-flex items-center rounded-md bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/15">
          Browse Jobs
        </Link>
        <Link href="/internships" className="focus-ring inline-flex items-center rounded-md bg-white/10 px-4 py-2 text-sm font-medium transition-colors hover:bg-white/15">
          Browse Internships
        </Link>
        <button className="focus-ring inline-flex items-center rounded-md border border-default px-4 py-2 text-sm font-medium transition-colors hover:bg-white/5" disabled>
          Analytics (soon)
        </button>
      </div>
    </section>
  );
}



