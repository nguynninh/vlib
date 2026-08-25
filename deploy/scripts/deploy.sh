#!/bin/bash
set -euo pipefail

REPO_DIR="/home/vtvlive/vlib"
WEB_DIR="/var/www/docs"

cd "$REPO_DIR"
git fetch origin main
git reset --hard origin/main

cd docs
npm ci
npm run build

rsync -a --delete dist/ "$WEB_DIR/"

echo "deployed $(git rev-parse --short HEAD)"
