# cashier frontend microservice
FROM node:18.14.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "dev"]