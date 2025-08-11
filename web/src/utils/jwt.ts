export function parseJwt(token: string): any | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = typeof window !== "undefined" && typeof atob === "function"
      ? atob(payload)
      : Buffer.from(payload, "base64").toString("utf-8");
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}


