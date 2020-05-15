FROM node:12-alpine

COPY package*.json ./
RUN npm install
COPY . ./

ENV BOT_TOKEN=your-discord-bot-token

CMD npm start