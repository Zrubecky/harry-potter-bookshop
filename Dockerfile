# DEVELOPMENT STAGE
FROM node:22-alpine AS development

ENV NODE_ENV=development

USER node

EXPOSE ${APP_PORT}

WORKDIR /usr/src/app

COPY --chown=node:node package*.json yarn.lock ./

RUN yarn install

RUN yarn global add @nestjs/cli

COPY --chown=node:node . .

# BUILD STAGE
FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json yarn.lock ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn build

ENV NODE_ENV=production

RUN yarn install --production --frozen-lockfile && yarn cache clean --force

USER node

# PRODUCTION STAGE
FROM node:22-alpine AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main.js"]