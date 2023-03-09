FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
# We don't need the standalone Chromium

# If you are building your code for production
# RUN npm ci --only=production
RUN apk update && apk add --no-cache nmap && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk update && \
    apk add --no-cache \
      chromium \
      harfbuzz \
      "freetype>2.8" \
      ttf-freefont \
      nss

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

COPY . .

RUN npm install
EXPOSE 3000

RUN npm run build

CMD [ "node", "dist/server.js" ]