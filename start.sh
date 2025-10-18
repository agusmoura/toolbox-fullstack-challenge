#!/bin/sh

# Start backend API in background
cd /app/api
echo "Starting backend API on port ${PORT:-3000}..."
NODE_ENV=production node src/index.js &

# Wait a moment for the API to start
sleep 2

# Start nginx in foreground
echo "Starting nginx on port 80..."
nginx -g 'daemon off;'
