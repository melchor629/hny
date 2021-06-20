FROM node:14 AS builder

WORKDIR /app
COPY .npmrc ./
COPY lerna.json ./
COPY package.json ./
COPY ./packages/hny-scripts/package.json ./packages/hny-scripts/package.json
COPY ./packages/home/package.json ./packages/home/package.json
COPY ./packages/2018/package.json ./packages/2018/package.json
COPY ./packages/2019/package.json ./packages/2019/package.json
COPY ./packages/2020/package.json ./packages/2020/package.json
COPY ./packages/2021/package.json ./packages/2021/package.json
RUN yarn install

COPY ./ /app/
RUN yarn build && \
    yarn dist


FROM nginx:alpine

COPY docker/nginx/ /etc/nginx/conf.d/
COPY --from=builder /app/dist/ /usr/share/nginx/html
