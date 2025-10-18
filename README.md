# Fullstack CSV Viewer Application

A fullstack application with Node.js/Express backend API and React frontend. The backend fetches CSV files from an external API, validates and parses them, and serves the processed data as JSON to the frontend.

## Features

- Fetches and validates CSV files from external API
- Strict CSV validation (4 fields, number/hex format checking)
- React frontend with Redux state management
- Responsive UI with Bootstrap 5
- Docker support for easy deployment
- Single-container deployment with nginx

## Tech Stack

### Backend (api/)
- Node.js 14.x
- Express.js
- Native HTTP client (no axios)
- Mocha + Chai for testing

### Frontend (frontend/)
- React 19
- Redux Toolkit
- React-Bootstrap
- Webpack 5
- Jest + React Testing Library
- ESLint

## Quick Start

### Prerequisites
- Node.js 14.x or higher
- npm 6.x or higher
- Docker (optional, for containerized deployment)

### Local Development

#### Option 1: Quick Start Script (Recommended)
```bash
# From project root
./START_FULLSTACK.sh
```
This script will:
- Install dependencies if needed
- Start backend on port 3000
- Start frontend on port 3001
- Handle graceful shutdown with Ctrl+C

#### Option 2: Manual Start

**Backend:**
```bash
cd api
npm install
npm start          # Production mode (port 3000)
# or
npm run dev        # Development mode with auto-reload
```

**Frontend:**
```bash
cd frontend
npm install
npm start          # Development mode (port 3001)
# or
npm run dev
```

**Testing:**
```bash
# Backend tests
cd api
npm test

# Frontend tests
cd frontend
npm test                # Run once
npm run test:watch      # Watch mode
npm run test:coverage   # Coverage report
npm run lint            # Lint code
```

## Docker Deployment

### Build and Run

```bash
# Build the Docker image
docker build -t fullstack-app .

# Run the container
docker run -d -p 80:80 \
  --name fullstack-app \
  -e NODE_ENV=production \
  -e EXTERNAL_API_URL=https://echo-serv.tbxnet.com/vl/challenge/3 \
  -e API_KEY="Bearer aSuperSecretKey" \
  fullstack-app

# Test the application
curl http://localhost/health           # Health check
curl http://localhost/files/data       # API endpoint
# Open browser: http://localhost
```

### Environment Variables

Required environment variables for Docker:

- `NODE_ENV` - Environment mode (production/development)
- `PORT` - Backend API port (default: 3000)
- `EXTERNAL_API_URL` - External CSV API URL
- `API_KEY` - Bearer token for external API authentication
- `REACT_APP_API_URL` - (Optional) Frontend API URL (defaults to relative paths in production)
- `REACT_APP_API_TIMEOUT` - (Optional) API timeout in milliseconds (default: 10000)

Example `.env` file (copy from `.env.production`):
```bash
NODE_ENV=production
PORT=3000
EXTERNAL_API_URL=https://echo-serv.tbxnet.com/vl/challenge/3
API_KEY=Bearer aSuperSecretKey
REACT_APP_API_URL=
REACT_APP_API_TIMEOUT=10000
```

### Docker Commands

```bash
# View logs
docker logs fullstack-app
docker logs -f fullstack-app  # Follow logs

# Stop container
docker stop fullstack-app

# Remove container
docker rm fullstack-app

# Remove image
docker rmi fullstack-app

# Rebuild without cache
docker build --no-cache -t fullstack-app .
```

## Coolify Deployment

### Configuration

1. **Service Type:** Docker Image
2. **Build Pack:** Dockerfile
3. **Dockerfile Location:** `./Dockerfile`
4. **Port:** 80
5. **Health Check:** `/health`

### Environment Variables in Coolify

Set these in the Coolify dashboard:

```
NODE_ENV=production
EXTERNAL_API_URL=https://echo-serv.tbxnet.com/vl/challenge/3
API_KEY=Bearer aSuperSecretKey
```

### Resource Limits (Recommended)

- Memory: 1GB
- CPU: 1 core

## Architecture

### Docker Container Structure

The Docker container uses a multi-stage build:

1. **Builder Stage:** Builds frontend and installs backend dependencies
2. **Production Stage:**
   - Runs nginx to serve frontend static files
   - Proxies `/files/*` requests to backend API
   - Backend API runs on port 3000
   - Nginx serves on port 80

### Data Flow

1. Frontend makes request to `/files/data`
2. Nginx proxies request to backend `localhost:3000/files/data`
3. Backend fetches CSV files from external API
4. Backend validates and parses CSV data
5. Backend returns JSON to frontend
6. Frontend displays data in table

### CSV Validation Rules

- Exactly 4 fields required: file, text, number, hex
- All fields must be non-empty
- Number field must be valid integer
- Hex field must be exactly 32 characters and valid hexadecimal
- Invalid lines are filtered out silently

## API Endpoints

### GET /files/data
Fetches and parses all CSV files from external API.

**Query Parameters:**
- `fileName` (optional) - Filter by specific filename

**Response:**
```json
[
  {
    "file": "test1.csv",
    "text": "sample text",
    "number": 12345,
    "hex": "a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6"
  }
]
```

### GET /files/list
Returns list of available CSV files.

**Response:**
```json
{
  "files": ["test1.csv", "test2.csv", "test3.csv"]
}
```

### GET /health
Health check endpoint (returns 200 OK).

## Project Structure

```
/
├── Dockerfile              # Docker configuration
├── nginx.conf              # Nginx configuration
├── start.sh                # Container startup script
├── .dockerignore           # Docker ignore file
├── .env.production         # Production environment example
├── START_FULLSTACK.sh      # Local development startup script
│
├── api/                    # Backend Express API
│   ├── src/
│   │   ├── index.js        # Entry point
│   │   ├── server.js       # Express app
│   │   ├── routes/         # Route handlers
│   │   ├── services/       # External API client
│   │   └── utils/          # CSV parser
│   └── test/               # Mocha tests
│
└── frontend/               # React frontend
    ├── src/
    │   ├── components/     # React components
    │   ├── store/          # Redux state
    │   ├── services/       # API client
    │   ├── hooks/          # Custom hooks
    │   └── utils/          # Utilities
    └── webpack.config.js   # Webpack config
```

## Troubleshooting

### Frontend can't connect to backend

**Development:**
- Ensure backend is running on port 3000
- Check webpack proxy configuration in `frontend/webpack.config.js`

**Docker:**
- Check if container is running: `docker ps`
- Check logs: `docker logs fullstack-app`
- Verify nginx proxy configuration in `nginx.conf`

### Process is not defined error

This happens when webpack environment variables are not configured. Restart the webpack dev server after any webpack.config.js changes.

### CSV validation failing

Check the CSV format:
- Must have exactly 4 columns
- Number field must be a valid integer
- Hex field must be exactly 32 characters of valid hex

## License

ISC

## Support

For issues and questions, please check the project documentation in `CLAUDE.md`.
