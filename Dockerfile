FROM node:16-alpine AS builder

WORKDIR /app

# Build frontend
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm ci
COPY frontend/ .
RUN NODE_ENV=production npm run build

# Install backend deps
WORKDIR /app/api
COPY api/package*.json ./
RUN npm ci --only=production
COPY api/ .

# Production image
FROM node:16-alpine

# Install nginx
RUN apk add --no-cache nginx

WORKDIR /app

# Copy backend
COPY --from=builder /app/api ./api

# Copy frontend build
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/http.d/default.conf

# Expose port 80
EXPOSE 80

# Copy startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
