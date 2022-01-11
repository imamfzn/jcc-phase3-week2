FROM node:14.15-alpine

WORKDIR /app

COPY . ./

RUN echo "* * * * * node /app/app.js" >> /etc/crontabs/root

CMD ["crond", "-f", "-L", "/dev/stdout"]
