export function securityHeaders(development: boolean, cmsEnabled: boolean, indexable: boolean) {
  // Static HTML needs Next's inline hydration scripts. This is a baseline CSP,
  // not a nonce-based strict CSP; nonces would require request-time rendering.
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${development ? " 'unsafe-eval'" : ""}`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    `img-src 'self' data: blob:${cmsEnabled ? " https://cdn.sanity.io" : ""}`,
    "font-src 'self' data:",
    `connect-src 'self'${development ? " ws://localhost:* ws://127.0.0.1:*" : ""}${cmsEnabled ? " https://*.sanity.io wss://*.sanity.io https://*.supabase.co wss://*.supabase.co" : ""}`,
    "frame-src 'self' https://www.instagram.com",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
  return [
    { key: "Content-Security-Policy", value: csp },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ...(indexable ? [{ key: "Strict-Transport-Security", value: "max-age=31536000" }] : []),
    ...(!indexable ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
  ];
}

export function sanityImagePatterns(enabled: boolean, project = "", dataset = "") {
  if (!enabled || !/^[a-z0-9]+$/.test(project) || !/^[a-zA-Z0-9_-]+$/.test(dataset)) return [];
  return [{ protocol: "https" as const, hostname: "cdn.sanity.io", pathname: `/images/${project}/${dataset}/**` }];
}
