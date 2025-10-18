const express = require('express');
const filesRouter = require('./routes/files');
const { HTTP_STATUS, ERROR_MESSAGES, API_INFO } = require('./config/constants');

const createServer = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  });

  app.get('/', (req, res) => {
    res.json({
      message: API_INFO.NAME,
      status: API_INFO.STATUS,
      endpoints: API_INFO.ENDPOINTS
    });
  });

  app.use('/files', filesRouter);

  app.use((req, res) => {
    res.status(HTTP_STATUS.NOT_FOUND).json({
      error: ERROR_MESSAGES.NOT_FOUND,
      message: `${ERROR_MESSAGES.ROUTE_NOT_FOUND}: ${req.method} ${req.path}`
    });
  });

  app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: ERROR_MESSAGES.INTERNAL_ERROR,
      message: err.message || ERROR_MESSAGES.UNEXPECTED_ERROR
    });
  });

  return app;
};

module.exports = createServer;
