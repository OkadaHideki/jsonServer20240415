From node:20.12.2-alpine


RUN mkdir -p /var/www/html
WORKDIR /var/www/html


COPY package.json /var/www/html

RUN npm install

CMD ["npm", "start"]