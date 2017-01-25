FROM node
MAINTAINER Brandon Tom
ENV PORT=3000
COPY . /var/www
WORKDIR /var/www
RUN npm install
EXPOSE $PORT
ENTRYPOINT ["npm", "start"]