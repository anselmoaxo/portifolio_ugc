#!/usr/bin/env bash
# Helper local: usa o Node.js configurado no ambiente atual.
cd "$(dirname "$0")/.." || exit 1
npm run build
