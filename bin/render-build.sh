#!/usr/bin/env bash
set -o errexit

export NODE_OPTIONS=--openssl-legacy-provider

bundle config set --local frozen false
bundle update
npm install
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate
