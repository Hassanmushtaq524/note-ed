# Build stage
FROM node:20 AS build

WORKDIR /app

# Copy only the frontend files
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
