# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the entire application directory to the working directory
COPY . .

# Expose the port your application will run on
EXPOSE 8000

# Set the entry point command to run your server
# CMD ["node", "bin/server.js"]
CMD ["npm", "start"]