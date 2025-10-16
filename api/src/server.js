const express = require('express');
const filesRouter = require('./routes/files');

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
      message: 'Toolbox Fullstack Challenge API',
      status: 'running',
      endpoints: {
        files_data: '/files/data',
        files_list: '/files/list'
      }
    });
  });

  app.use('/files', filesRouter);

  app.use((req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.method} ${req.path} not found`
    });
  });

  app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: err.message || 'An unexpected error occurred'
    });
  });

  return app;
};

module.exports = createServer;
