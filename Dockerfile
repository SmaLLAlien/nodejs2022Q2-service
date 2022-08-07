FROM node:lts-alpine

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install

COPY . .

COPY .env.example .env

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]
