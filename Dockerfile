FROM node:16-alpine
WORKDIR /var/www
COPY . .
RUN rm package-lock.json && \
    npm i && \
    npm run build
EXPOSE 3000
CMD node server.js
