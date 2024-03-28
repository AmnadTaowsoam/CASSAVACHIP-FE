# Use an official Node.js runtime as a base image
FROM node:18-alpine as BUILD_IMAGE

# Set the working directory inside the container
WORKDIR /app/cassava-app

# Copy package.json and package-lock.json to the container
COPY package*.json .

# Install project dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Finally build our project
RUN npm run build

# Start a new stage for the production image
FROM node:18-alpine as PRODUCTION_IMAGE

# Set the working directory in the production image
WORKDIR /app/cassava-app

# Copy the build directory from the build stage
COPY --from=BUILD_IMAGE /app/cassava-app/dist/ /app/cassava-app/dist/

# Copy package.json for the production dependencies
COPY package.json .

# Install production dependencies only
RUN npm install --only=production

# Install 'serve' to serve static files
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 8001

# Define command to start the app
CMD [ "serve", "-s", "dist", "-l", "8001" ]



