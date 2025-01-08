FROM node:22

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE ${APP_PORT}

CMD ["yarn", "start:prod"]