#!/bin/bash
# Run with the dev server up (pnpm dev) after seeding (pnpm payload run src/seed.ts).
set -euo pipefail
base="${BASE_URL:-http://localhost:3000}"

token=$(curl -s "${base}/api/users/login" -H 'content-type: application/json' \
  -d '{"email":"dev@example.com","password":"test"}' | sed -E 's/.*"token":"([^"]+)".*/\1/')

curl -s "${base}/api/exports/download" -H "Authorization: JWT ${token}" \
  -H 'content-type: application/json' \
  -d '{"data":{"collectionSlug":"posts","format":"csv","sort":"createdAt"}}' -o export.csv

echo "Header:"
head -1 export.csv
echo
echo "Row of post 101:"
grep 'post 101' export.csv
