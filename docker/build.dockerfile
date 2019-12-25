FROM node AS builder

COPY ./ /app/
WORKDIR /app
RUN yarn install && \
    yarn build && \
    yarn dist


FROM nginx:alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html
