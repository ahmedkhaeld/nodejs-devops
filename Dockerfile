FROM node:20.11.0-alpine3.18
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm i; \
        else npm i --only=production; \
        fi

COPY . ./
EXPOSE ${PORT}
CMD [ "node", "index.js" ]