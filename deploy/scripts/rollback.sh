#!/bin/bash
set -euo pipefail

REPO_DIR="/home/vtvlive/vlib"
WEB_DIR="/var/www/docs"

cd "$REPO_DIR"
git reset --hard HEAD~1

cd docs
npm ci
npm run build

rsync -a --delete dist/ "$WEB_DIR/"

echo "rolled back to $(git rev-parse --short HEAD)"
