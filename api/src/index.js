require('dotenv').config();

const createServer = require('./server');
const config = require('./config/environment');
const { API_INFO } = require('./config/constants');

const app = createServer();

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`API available at http://localhost:${config.port}`);
  console.log(`Endpoints:`);
  console.log(`  GET http://localhost:${config.port}${API_INFO.ENDPOINTS.FILES_DATA}`);
  console.log(`  GET http://localhost:${config.port}${API_INFO.ENDPOINTS.FILES_LIST}`);
});

const gracefulShutdown = (signal) => {
  console.log(`${signal} received, shutting down gracefully`);
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
