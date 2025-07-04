FROM node:18-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

FROM node:18-alpine
WORKDIR /app
COPY --from=base /app /app

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
