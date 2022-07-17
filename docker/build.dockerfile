FROM node:16 AS builder

WORKDIR /app
COPY package.json package-lock.json .npmrc ./
COPY ./packages/hny-scripts/package.json ./packages/hny-scripts/
COPY ./packages/home/package.json ./packages/home/
COPY ./packages/2018/package.json ./packages/2018/
COPY ./packages/2019/package.json ./packages/2019/
COPY ./packages/2020/package.json ./packages/2020/
COPY ./packages/2021/package.json ./packages/2021/
COPY ./packages/2022/package.json ./packages/2022/
RUN npm ci

COPY ./packages/ /app/packages/
RUN npm run build --workspaces

COPY ./scripts/ /app/scripts/
RUN npm run dist


FROM nginx:alpine

COPY docker/nginx/ /etc/nginx/conf.d/
COPY --from=builder /app/dist/ /usr/share/nginx/html
