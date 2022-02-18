# Pull Docker Hub base image
FROM node:16-alpine3.14
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./
RUN yarn install
# Copy app to container
COPY . .
# Run the "start" script in package.json
CMD ["yarn", "run", "start"]