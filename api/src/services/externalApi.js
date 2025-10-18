const https = require('https');
const http = require('http');
const config = require('../config/environment');
const { HTTP_STATUS_RANGES, ERROR_MESSAGES } = require('../config/constants');

const makeRequest = (url, headers = {}) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const options = { headers, timeout: config.externalApi.timeout };

    const req = client.get(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => { data += chunk; });

      res.on('end', () => {
        if (res.statusCode >= HTTP_STATUS_RANGES.SUCCESS_MIN &&
            res.statusCode <= HTTP_STATUS_RANGES.SUCCESS_MAX) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(ERROR_MESSAGES.REQUEST_TIMEOUT));
    });
  });
};

const getFilesList = async (baseUrl, apiKey) => {
  const response = await makeRequest(
    `${baseUrl}${config.externalApi.endpoints.filesList}`,
    { Authorization: apiKey }
  );
  const { files = [] } = JSON.parse(response);
  return files;
};

const downloadFile = async (baseUrl, apiKey, filename) => {
  try {
    return await makeRequest(
      `${baseUrl}${config.externalApi.endpoints.fileDownload}/${filename}`,
      { Authorization: apiKey }
    );
  } catch (error) {
    console.error(`Error downloading file ${filename}:`, error.message);
    return null;
  }
};

const getAllFilesWithContent = async (baseUrl, apiKey) => {
  const filenames = await getFilesList(baseUrl, apiKey);

  const downloadPromises = filenames.map(async (filename) => ({
    filename,
    content: await downloadFile(baseUrl, apiKey, filename)
  }));

  const results = await Promise.all(downloadPromises);
  return results.filter(({ content }) => content !== null);
};

module.exports = {
  getFilesList,
  downloadFile,
  getAllFilesWithContent
};
