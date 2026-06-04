# Use official Node LTS image
FROM node:22-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install 

# Copy app source
COPY . .

# Expose app port
EXPOSE 3000

# Start app
CMD ["node", "server.js"]
