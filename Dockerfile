ARG NODE_VERSION=14.16.1

FROM node:${NODE_VERSION}-alpine3.10 as builder

WORKDIR /build
COPY --chown=node:node . ${WORKDIR}

RUN yarn install --production=true
RUN yarn add @nestjs/cli
RUN yarn build

FROM node:${NODE_VERSION}-alpine as runner

ARG SERVICE_VERSION
ENV SERVICE_VERSION=$SERVICE_VERSION

RUN apk add --no-cache tini

WORKDIR /app

COPY --from=builder --chown=node:node /build/dist ./
COPY --from=builder --chown=node:node /build/node_modules ./node_modules/
COPY --from=builder --chown=node:node /build/package.json .

USER node

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "./main.js"]
