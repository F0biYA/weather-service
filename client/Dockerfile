FROM node:17-alpine
COPY package.json .
RUN npm install
WORKDIR /app_client
COPY . .
EXPOSE 3000
CMD ["npm", "start"]