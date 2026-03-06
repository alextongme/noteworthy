#!/usr/bin/env bash
set -o errexit

export NODE_OPTIONS=--openssl-legacy-provider

npm install
npm run build

# Copy public assets (images, fonts) into dist/ so Express serves them
cp -r public/images dist/images
cp -r public/fonts dist/fonts
