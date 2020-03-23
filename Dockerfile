FROM node:10.16.0-alpine
COPY ["package.json", "yarn.lock", "jsconfig.json", "server.js", "/app/"]
COPY ["src", "/app/src/"]
COPY ["public", "/app/public/"]
WORKDIR /app
RUN yarn
RUN ["yarn", "build"]
RUN rm -rf /app/node_modules
RUN rm -rf /app/src
RUN rm -rf /app/public
RUN yarn --production --pure-lockfile
EXPOSE 8080
CMD ["yarn", "server"]
