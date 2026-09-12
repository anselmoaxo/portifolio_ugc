import assert from "node:assert/strict";
import nextEnv from "@next/env";
nextEnv.loadEnvConfig(process.cwd());
const indexable = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";
const base = process.argv[2] || "http://127.0.0.1:3000";
const pages = ["/", "/portfolio/", "/cupons/", "/descontos/", "/politica-de-privacidade/"];
for (const path of pages) {
  const response = await fetch(new URL(path, base));
  assert.equal(response.status, 200, path);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  const html = await response.text();
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, path);
  assert.match(html, /<link rel="canonical"/);
  if (["/cupons/", "/descontos/"].includes(path)) assert.match(html, /property="og:image"/);
  if (path === "/") {
    const data = JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    assert.equal(data.name, "Priscila Almeida");
    assert.ok(data.sameAs.length > 0);
  }
  console.log("PASS", path);
}
for (const path of ["/admin/", "/login/", "/recuperar-senha/", "/redefinir-senha/", "/studio/", "/auth/callback/", "/api/draft/", "/api/draft/disable/", "/api/revalidate/"]) {
  const response = await fetch(new URL(path, base), { method: "GET" });
  assert.equal(response.status, 404, path);
  console.log("PASS disabled", path);
}
const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
if (indexable) {
  assert.equal((sitemap.match(/<loc>/g) || []).length, pages.length);
  const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL).origin;
  assert.ok(sitemap.includes(`<loc>${origin}/</loc>`));
} else {
  assert.doesNotMatch(sitemap, /<loc>/);
}
const robots = await (await fetch(new URL("/robots.txt", base))).text();
assert.match(robots, indexable ? /Allow: \/(?:\r?\n|$)/ : /Disallow: \/(?:\r?\n|$)/);
for (const path of ["/og-image.png", "/portfolio/Portfolio-Priscila.pdf"]) assert.equal((await fetch(new URL(path, base))).status, 200, path);
const remote = new URL("/_next/image", base);
remote.search = new URLSearchParams({ url: "https://cdn.sanity.io/images/other/production/example.jpg", w: "640", q: "75" }).toString();
assert.equal((await fetch(remote)).status, 404);
console.log("PASS metadata, assets and remote-image rejection");
