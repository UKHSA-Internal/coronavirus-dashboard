FROM node:14-buster-slim
LABEL maintainer="Pouria Hadjibagheri <Pouria.Hadjibagheri@ukhsa.gov.uk>"


COPY .  /app

WORKDIR /app

RUN rm -rf node_modules
RUN npm run dev
RUN npm install
RUN npm rebuild node-sass


EXPOSE 3000

ENTRYPOINT ["yarn", "run", "start"]