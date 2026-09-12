export function resolveSiteOrigin(value: string | undefined, indexable: boolean): string {
  const url = new URL(value?.trim() || "http://localhost:3000");
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without credentials, path, query or fragment.");
  }
  const local = url.hostname === "localhost" || url.hostname.endsWith(".localhost") || url.hostname.endsWith(".local") || url.hostname.endsWith(".invalid") || url.hostname === "[::1]" || /^127\./.test(url.hostname) || /^10\./.test(url.hostname) || /^192\.168\./.test(url.hostname) || /^172\.(1[6-9]|2\d|3[01])\./.test(url.hostname);
  if (indexable && (url.protocol !== "https:" || local)) throw new Error("Indexing requires the real public HTTPS domain in NEXT_PUBLIC_SITE_URL.");
  return url.origin;
}
