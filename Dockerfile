### STAGE 1: Build ###
FROM node:16-alpine AS build
ARG ENV

WORKDIR /application

COPY package.json package-lock.json ./

COPY . .

RUN npm i

RUN npm run build -- --configuration ${ENV}

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine

COPY ./config/nginx.conf /etc/nginx/nginx.conf

COPY --from=build application/dist/lokin-front-end /usr/share/nginx/html
