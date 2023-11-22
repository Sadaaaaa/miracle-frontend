# FROM node:alpine
# WORKDIR /usr/app/front
# EXPOSE 3000
# COPY ./ ./
# RUN npm install
# CMD ["npm", "start"]


FROM --platform=linux/amd64 node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]