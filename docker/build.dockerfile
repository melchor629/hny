FROM node:14 AS builder

WORKDIR /app
COPY package.json yarn.lock lerna.json .npmrc ./
COPY ./packages/hny-scripts/package.json ./packages/hny-scripts/yarn.lock ./packages/hny-scripts/
COPY ./packages/home/package.json ./packages/home/yarn.lock ./packages/home/
COPY ./packages/2018/package.json ./packages/2018/yarn.lock ./packages/2018/
COPY ./packages/2019/package.json ./packages/2019/yarn.lock ./packages/2019/
COPY ./packages/2020/package.json ./packages/2020/yarn.lock ./packages/2020/
COPY ./packages/2021/package.json ./packages/2021/yarn.lock ./packages/2021/
COPY ./packages/2022/package.json ./packages/2022/yarn.lock ./packages/2022/
RUN yarn install

COPY ./packages/ /app/packages/
RUN yarn build

COPY ./scripts/ /app/scripts/
RUN yarn dist


FROM nginx:alpine

COPY docker/nginx/ /etc/nginx/conf.d/
COPY --from=builder /app/dist/ /usr/share/nginx/html
