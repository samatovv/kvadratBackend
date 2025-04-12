FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# 🟢 Копируем ВСЕ файлы проекта, включая prisma/
COPY . .

# 🛠 Генерируем Prisma Client
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]
