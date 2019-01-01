FROM nginx:alpine

COPY 2018/ /usr/share/nginx/html/2018
COPY 2019/dist/ /usr/share/nginx/html/2019
COPY index.html /usr/share/nginx/html/index.html