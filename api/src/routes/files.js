const express = require('express');
const { getAllFilesWithContent, getFilesList } = require('../services/externalApi');
const { processFiles } = require('../utils/csvParser');
const config = require('../config/environment');
const { HTTP_STATUS, ERROR_MESSAGES } = require('../config/constants');

const router = express.Router();

const validateConfig = (res) => {
  if (!config.externalApi.baseUrl || !config.externalApi.apiKey) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      error: ERROR_MESSAGES.SERVER_CONFIG_ERROR,
      message: ERROR_MESSAGES.API_URL_NOT_CONFIGURED
    });
    return false;
  }
  return true;
};

const handleError = (res, error, context) => {
  console.error(`Error in ${context}:`, error);
  res.status(HTTP_STATUS.SERVICE_UNAVAILABLE).json({
    error: ERROR_MESSAGES.SERVICE_UNAVAILABLE,
    message: ERROR_MESSAGES.UNABLE_TO_FETCH
  });
};

router.get('/data', async (req, res) => {
  try {
    if (!validateConfig(res)) return;

    const filesWithContent = await getAllFilesWithContent(
      config.externalApi.baseUrl,
      config.externalApi.apiKey
    );
    const formattedData = processFiles(filesWithContent);

    res.json(formattedData);
  } catch (error) {
    handleError(res, error, '/files/data');
  }
});

router.get('/list', async (req, res) => {
  try {
    if (!validateConfig(res)) return;

    const files = await getFilesList(
      config.externalApi.baseUrl,
      config.externalApi.apiKey
    );
    res.json({ files });
  } catch (error) {
    handleError(res, error, '/files/list');
  }
});

module.exports = router;
