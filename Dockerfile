FROM node:lts-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start"]
