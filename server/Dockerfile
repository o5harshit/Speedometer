FROM node:22-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install



COPY . .

EXPOSE 8747

CMD [ "npm", "run" , "dev"]