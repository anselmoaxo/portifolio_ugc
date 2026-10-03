import assert from "node:assert/strict";
import test from "node:test";
import { safeRedirectPath } from "../src/lib/safe-redirect.ts";
import { resolveSiteOrigin } from "../src/lib/site-origin.ts";
import { securityHeaders } from "../src/lib/security-headers.ts";

test("redirects reject external origins and URL normalization bypasses", () => {
  for (const path of ["//example.com", "/\\example.com", "https://example.com", "/\t/example.com", "/\n/example.com", "javascript:alert(1)", null, ["/admin"]]) {
    assert.equal(safeRedirectPath(path), "/admin", JSON.stringify(path));
  }
  assert.equal(safeRedirectPath("/redefinir-senha?flow=recovery#form"), "/redefinir-senha?flow=recovery#form");
  assert.equal(safeRedirectPath("/portfolio/../cupons/"), "/cupons/");
});

test("indexable builds require a public HTTPS origin", () => {
  for (const url of [undefined, "http://blog.example", "https://localhost", "https://127.0.0.1", "https://192.168.1.2", "https://user:password@blog.example", "https://blog.example/path", "https://blog.example?x=1"]) {
    assert.throws(() => resolveSiteOrigin(url, true));
  }
  assert.equal(resolveSiteOrigin(undefined, false), "http://localhost:3000");
  assert.equal(resolveSiteOrigin("https://blog.example/", true), "https://blog.example");
});

test("production CSP restricts framing, forms, objects and eval; preview is noindex", () => {
  const headers = Object.fromEntries(securityHeaders(false, false).map(({ key, value }) => [key, value]));
  assert.match(headers["Content-Security-Policy"], /frame-ancestors 'self'/);
  assert.match(headers["Content-Security-Policy"], /form-action 'self'/);
  assert.match(headers["Content-Security-Policy"], /object-src 'none'/);
  assert.doesNotMatch(headers["Content-Security-Policy"], /unsafe-eval|supabase|sanity/);
  assert.equal(headers["X-Robots-Tag"], "noindex, nofollow");
  assert.equal(headers["X-Content-Type-Options"], "nosniff");
  assert.ok(!securityHeaders(false, true).some(({ key }) => key === "X-Robots-Tag"));
});
