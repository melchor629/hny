FROM node AS builder-2019

COPY 2019/ /app/
WORKDIR /app
RUN yarn install && \
    yarn build


FROM nginx:alpine

COPY 2018/ /usr/share/nginx/html/2018
COPY --from=builder-2019 /app/dist/ /usr/share/nginx/html/2019
COPY index.html /usr/share/nginx/html/index.html