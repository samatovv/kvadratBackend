FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# 🆕 Добавь генерацию Prisma клиента
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
