FROM node:16-alpine
RUN npm install -g nodemon
COPY package.json .
RUN npm install
WORKDIR /app
COPY . .
EXPOSE 2000
CMD ["npm", "run", "dev"]
