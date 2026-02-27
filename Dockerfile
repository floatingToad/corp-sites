# Stage 1: Build the React Client
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ .
# Build generates files in /app/client/dist
RUN npm run build

# Stage 2: Production Server
FROM node:20-alpine
WORKDIR /app

# Install backend dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy backend source code
COPY . .

# Copy built frontend assets from the builder stage
# The server.js is configured to serve static files from client/dist
COPY --from=client-builder /app/client/dist ./client/dist

# Expose the API port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
