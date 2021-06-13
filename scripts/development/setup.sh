#!/bin/sh

node ./scripts/create-dev-env && \
./node_modules/.bin/prisma generate && \
./node_modules/.bin/dotenv -e .env.local ./node_modules/.bin/prisma db push && \
./node_modules/.bin/dotenv -e .env.local ./node_modules/.bin/prisma db seed -- --preview-feature