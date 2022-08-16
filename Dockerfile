FROM node:14-alpine

WORKDIR /user/app

COPY package.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 5000

CMD ["npm","run","start:dev"]

