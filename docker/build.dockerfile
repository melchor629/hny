FROM node:18 AS builder

WORKDIR /app
COPY package.json package-lock.json .npmrc ./
COPY ./packages/ /app/packages/
RUN npm ci

RUN npm run build --workspaces

COPY ./scripts/ /app/scripts/
RUN npm run dist


FROM nginx:alpine

COPY docker/nginx/ /etc/nginx/conf.d/
COPY --from=builder /app/dist/ /usr/share/nginx/html
