#!/usr/bin/env bash
set -o errexit

bundle config set --local frozen false
bundle install
npm install
bundle exec rake assets:precompile
bundle exec rake assets:clean
bundle exec rake db:migrate
