# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM node:22-alpine AS builder

WORKDIR /app
COPY ./packages/hny-api/package.json ./
RUN npm i --omit dev


FROM node:22-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY --from=builder /app/node_modules/ ./node_modules/
COPY ./packages/hny-api/api/ ./api/

CMD ["node", "--experimental-strip-types", "./api/index.ts"]
