# Pull Docker Hub base image
FROM node:16-alpine3.14
# Install yarn
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./
RUN yarn install
# Copy app to container
COPY . .
# Run the "dev" script in package.json
CMD ["yarn", "run", "dev"]