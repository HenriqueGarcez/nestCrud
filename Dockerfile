FROM node:14

WORKDIR /app

# Copy files we need
COPY src /app/src
COPY package.json /app
COPY nest-cli.json /app
COPY tsconfig.json /app
COPY tsconfig.build.json /app

# Install our package
RUN yarn install

# Run dev server
CMD  ["yarn", "start"]
