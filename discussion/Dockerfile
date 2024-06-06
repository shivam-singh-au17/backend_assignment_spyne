FROM node

WORKDIR /app/discussion

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4001

CMD ["npm", "start"]