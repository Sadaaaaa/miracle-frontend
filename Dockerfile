# FROM node:alpine
# WORKDIR /usr/app/front
# EXPOSE 3000
# COPY ./ ./
# RUN npm install
# CMD ["npm", "start"]


FROM node:alpine
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY ./ ./
EXPOSE 3000
CMD ["npm", "start"]