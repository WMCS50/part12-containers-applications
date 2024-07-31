FROM node:20 AS build-stage
WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV VITE_BACKEND_URL="http://localhost:8080/"

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html