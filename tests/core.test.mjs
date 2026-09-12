import assert from "node:assert/strict";
import test from "node:test";
import { siteUrl } from "../src/config/site.ts";
import { whatsappUrl } from "../src/config/contact.ts";
import { buildLeadMessage } from "../src/lib/whatsapp.ts";
import { portfolioVideos } from "../src/data/portfolio.ts";
import { partnerBrands } from "../src/data/brands.ts";

test("siteUrl normaliza caminhos relativos", () => {
  assert.equal(siteUrl("portfolio/"), "http://localhost:3000/portfolio/");
});

test("whatsappUrl codifica a mensagem", () => {
  const url = whatsappUrl("Olá & tudo bem?");
  assert.match(url, /^https:\/\/wa\.me\/\d+\?text=/);
  assert.ok(url.includes("%26"));
});

test("mensagem do formulário contém os campos informados", () => {
  const message = buildLeadMessage({ name: "Ana", company: "Marca", contentType: "Vídeo", message: "Campanha", privacy: true });
  assert.match(message, /Ana/);
  assert.match(message, /Marca/);
  assert.match(message, /Campanha/);
});

test("fallback local possui conteúdo essencial", () => {
  assert.ok(portfolioVideos.length > 0);
  assert.ok(partnerBrands.length > 0);
});

