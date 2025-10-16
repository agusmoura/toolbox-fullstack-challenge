require('dotenv').config();

const createServer = require('./server');

const PORT = process.env.PORT || 3000;
const app = createServer();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
  console.log(`Endpoints:`);
  console.log(`  GET http://localhost:${PORT}/files/data`);
  console.log(`  GET http://localhost:${PORT}/files/list`);
});

const gracefulShutdown = (signal) => {
  console.log(`${signal} received, shutting down gracefully`);
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
