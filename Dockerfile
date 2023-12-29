FROM node:latest
RUN npm install typescript -g

WORKDIR /var/www/app/

COPY . ./

CMD tsc -w