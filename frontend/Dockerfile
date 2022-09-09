FROM node:18.2-alpine3.15

WORKDIR /frontend

COPY package*.json .

RUN yarn install

COPY . .

RUN yarn run build