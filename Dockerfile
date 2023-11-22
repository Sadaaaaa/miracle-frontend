# FROM node:alpine
# WORKDIR /usr/app/front
# EXPOSE 3000
# COPY ./ ./
# RUN npm install
# CMD ["npm", "start"]


#FROM --platform=linux/amd64 node:alpine
#WORKDIR /app
#COPY package.json /app
#RUN npm install
#COPY . /app
#EXPOSE 3000
#CMD ["npm", "start"]

# Используем официальный образ Node.js с LTS-версией
FROM node:14-alpine
# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app
# Копируем файлы package.json и package-lock.json для установки зависимостей
COPY package*.json ./
# Устанавливаем зависимости
RUN npm install
# Копируем все файлы проекта внутрь контейнера
COPY . .
# Собираем приложение
RUN npm run build
# Команда для запуска приложения при старте контейнера
CMD ["npm", "start"]