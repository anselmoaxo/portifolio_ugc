import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { typeid, TypeID } from "typeid-js";

// The scoped uuid major-version override must preserve both CJS and ESM consumers.
test("typeid uuid override preserves generation and round-trip conversions", () => {
  const require = createRequire(import.meta.url);
  const cjs = require("typeid-js");
  const values = new Set();
  for (let i = 0; i < 100; i++) {
    for (const make of [typeid, cjs.typeid]) {
      const id = make("audit");
      assert.match(id.toUUID(), /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
      assert.equal(TypeID.fromUUID("audit", id.toUUID()).toString(), id.toString());
      assert.equal(TypeID.fromString(id.toString()).toString(), id.toString());
      values.add(id.toString());
    }
  }
  assert.equal(values.size, 200);
});
