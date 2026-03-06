#!/usr/bin/env bash
set -o errexit

export NODE_OPTIONS=--openssl-legacy-provider

npm install
npm run build

# Copy public assets (images, fonts) into dist/ so Express serves them
cp -r public/images dist/images
cp -r public/fonts dist/fonts

# Run database schema + seed (idempotent — safe on every deploy)
if [ -n "$DATABASE_URL" ]; then
    echo "Running database migrations..."
    psql "$DATABASE_URL" -f server/database.sql
fi
