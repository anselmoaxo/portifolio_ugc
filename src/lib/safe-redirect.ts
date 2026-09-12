/** Validate after URL normalization, never just a leading slash. */
export function safeRedirectPath(value: unknown, fallback = "/admin"): string {
  if (typeof value !== "string" || !value.startsWith("/") || Array.from(value).some((char) => char === "\\" || char.charCodeAt(0) <= 32 || char.charCodeAt(0) === 127)) return fallback;
  try {
    const base = "https://redirect.invalid";
    const target = new URL(value, base);
    return target.origin === base ? `${target.pathname}${target.search}${target.hash}` : fallback;
  } catch {
    return fallback;
  }
}
