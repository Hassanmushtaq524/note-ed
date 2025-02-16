# Use Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies first (for caching)
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose the frontend port (default Vite/React port)
EXPOSE 3000

# Start the frontend
CMD ["npm", "run", "start"]
