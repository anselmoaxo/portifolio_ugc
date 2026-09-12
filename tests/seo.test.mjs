import assert from "node:assert/strict";
import test from "node:test";
import { articleJsonLd, seoDescription, seoTitle } from "../src/lib/seo.ts";
import { slugify } from "../src/lib/slugify.ts";

test("SEO helpers bound title and description lengths", () => {
  assert.equal(seoTitle("A".repeat(70), "fallback").length, 58);
  assert.equal(seoDescription("B".repeat(200), "fallback").length, 158);
});

test("slugify removes accents and special characters", () => {
  assert.equal(slugify("Dicas de SEO 2024"), "dicas-de-seo-2024");
  assert.equal(slugify("A" + String.fromCharCode(231, 227) + "o: beleza & bem-estar!"), "acao-beleza-bem-estar");
});

test("article JSON-LD maps the required editorial fields", () => {
  const data = articleJsonLd({ title: "Post", description: "description", url: "https://example.com/post/", image: "https://example.com/post.jpg", author: "Priscila", publishedAt: "2026-01-01" });
  assert.equal(data["@type"], "BlogPosting");
  assert.equal(data.author.name, "Priscila");
  assert.equal(data.datePublished, "2026-01-01");
});
