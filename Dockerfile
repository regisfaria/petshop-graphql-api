FROM node

ADD . src/

WORKDIR src/

RUN npm install

EXPOSE 4010

CMD ["npm", "run", "dev"]