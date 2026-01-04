# syntax=docker/dockerfile:1

FROM --platform=$BUILDPLATFORM node:24 AS builder

WORKDIR /app
COPY package.json package-lock.json .npmrc ./
COPY ./packages/ /app/packages/
RUN npm ci

RUN npm run build --workspaces --if-present

COPY ./scripts/ /app/scripts/
RUN npm run dist


FROM nginx:alpine-slim

COPY docker/nginx/ /etc/nginx/conf.d/
COPY --from=builder --chown=nginx:nginx /app/dist/ /usr/share/nginx/html
