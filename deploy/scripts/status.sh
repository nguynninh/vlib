#!/bin/bash
set -euo pipefail

REPO_DIR="/home/vtvlive/vlib"

cd "$REPO_DIR"
echo "commit: $(git rev-parse --short HEAD)"
echo "nginx: $(systemctl is-active nginx)"
