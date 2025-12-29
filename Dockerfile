# Use official Node LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

# Expose app port
EXPOSE 3000

# Start app
CMD ["pm2-runtime", "server.js"]
