# Stage 1: Build stage
FROM node:18.20-alpine as build

# Set working directory
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm ci

# Install web dependencies
RUN cd web && npm ci

# Run ESLint to check for linting errors (optional step)
RUN npx eslint ./src/

# Build the application
RUN npm run web:build

# Stage 2: Production stage
FROM node:18.20-alpine as production

# Set environment variables
ENV NODE_ENV=production

# Set app port
ENV PORT=8888

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY --from=build /app/web/package*.json ./

# Install dev dependencies
RUN npm ci --omit=dev

# Copy built files from the build stage
COPY --from=build /app/web/dist ./dist

# Specify the command to run the application
CMD ["node", "./dist/server.mjs"]
