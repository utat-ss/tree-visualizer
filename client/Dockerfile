
## Based on https://nodejs.org/en/docs/guides/nodejs-docker-webapp/ ##

FROM node:16

# Create app dir
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm ci --legacy-peer-deps
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4200
CMD [ "npm", "start" ]
