FROM node:20.11.0-alpine3.18
WORKDIR /app
COPY package.json .
RUN npm i 
COPY . ./
EXPOSE ${PORT}
CMD [ "npm", "run", "dev" ]