const express = require('express');
const { getAllFilesWithContent, getFilesList } = require('../services/externalApi');
const { processFiles } = require('../utils/csvParser');

const router = express.Router();

const { EXTERNAL_API_URL, API_KEY } = process.env;

const validateConfig = (res) => {
  if (!EXTERNAL_API_URL || !API_KEY) {
    res.status(500).json({
      error: 'Server configuration error',
      message: 'External API URL or API key not configured'
    });
    return false;
  }
  return true;
};

const handleError = (res, error, context) => {
  console.error(`Error in ${context}:`, error);
  res.status(503).json({
    error: 'Service temporarily unavailable',
    message: 'Unable to fetch data from external API'
  });
};

router.get('/data', async (req, res) => {
  try {
    if (!validateConfig(res)) return;

    const filesWithContent = await getAllFilesWithContent(EXTERNAL_API_URL, API_KEY);
    const formattedData = processFiles(filesWithContent);

    res.json(formattedData);
  } catch (error) {
    handleError(res, error, '/files/data');
  }
});

router.get('/list', async (req, res) => {
  try {
    if (!validateConfig(res)) return;

    const files = await getFilesList(EXTERNAL_API_URL, API_KEY);
    res.json({ files });
  } catch (error) {
    handleError(res, error, '/files/list');
  }
});

module.exports = router;
