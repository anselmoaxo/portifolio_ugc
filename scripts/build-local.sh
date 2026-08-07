#!/usr/bin/env bash
# Helper local: roda o build usando o node do nvm (o ambiente não tem node no PATH padrão).
export PATH="/home/anselmo/.nvm/versions/node/v22.23.1/bin:$PATH"
cd "$(dirname "$0")/.." || exit 1
npm run build
