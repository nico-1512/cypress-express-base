FROM node:18

RUN mkdir -p /usr/src/app

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json .
RUN npm i

# Copy app boundle
COPY src/ src/
COPY .env .

EXPOSE 4000
CMD [ "npm", "run", "start" ]