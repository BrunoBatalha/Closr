### STAGE 1: Build ###
FROM node:16-alpine AS build
WORKDIR /app

COPY package.json /app
RUN npm install

COPY . .
RUN npm run build

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY --from=build app/dist/lokin-front-end /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/confi.d/default.d
