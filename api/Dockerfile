FROM node:18.8.0-slim AS base

# TODO
# - should probably look for node ownership
# - healthcheck

# node environment - defaults to production
ARG NODE_ENV=production
ENV NODE_ENV ${NODE_ENV}
# expose app running on port 3000 and debugger ports
EXPOSE 3000 9229 9230

# install ps
RUN apt update && \
    apt install -y procps


# set directory and install app dependency requirements
WORKDIR /app
COPY package.json package.json
COPY yarn.lock yarn.lock

# install latest yarn
RUN npm install -g yarn@latest

# Development build
FROM base as dev

RUN yarn install
COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]

# Production build
FROM base as prod

RUN yarn install --production
COPY . .

RUN yarn build

CMD ["yarn", "start:prod"]

