FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3003

CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm run dev"]

