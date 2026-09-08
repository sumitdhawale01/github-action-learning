FROM node:20-alpine

WORKDIR /usr/src/app

# Install dependencies first (better layer caching)
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy the rest of the app
COPY server.js ./
COPY public ./public

EXPOSE 3000

CMD ["node", "server.js"]
