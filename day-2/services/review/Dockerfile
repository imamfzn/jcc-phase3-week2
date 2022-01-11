FROM node:14.15-alpine

COPY . ./

RUN apk add curl && \
    npm install -g npm@7 && \
    npm install

EXPOSE 5000

CMD [ "npm", "start" ]
