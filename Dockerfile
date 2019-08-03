FROM node
MAINTAINER Brandon Tom
ENV PORT=8379
COPY . /var/www
WORKDIR /var/www
RUN npm install
EXPOSE $PORT
ENTRYPOINT ["npm", "start"]