#!/usr/bin/env bash
export PATH="/home/anselmo/.nvm/versions/node/v22.23.1/bin:$PATH"
cd "$(dirname "$0")/.." || exit 1
./node_modules/.bin/eslint src
