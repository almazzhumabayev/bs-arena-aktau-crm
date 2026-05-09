FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY apps/api/package.json apps/api/package.json
RUN npm install --workspace @bs-arena/api

COPY apps/api apps/api
WORKDIR /app/apps/api

RUN npm run prisma:generate

EXPOSE 4000

CMD ["npm", "run", "start:dev"]
