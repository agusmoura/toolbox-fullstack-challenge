const https = require('https');
const http = require('http');

const REQUEST_TIMEOUT = 30000;

const makeRequest = (url, headers = {}) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const options = { headers, timeout: REQUEST_TIMEOUT };

    const req = client.get(url, options, (res) => {
      let data = '';

      res.on('data', (chunk) => { data += chunk; });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
};

const getFilesList = async (baseUrl, apiKey) => {
  const response = await makeRequest(
    `${baseUrl}/v1/secret/files`,
    { Authorization: apiKey }
  );
  const { files = [] } = JSON.parse(response);
  return files;
};

const downloadFile = async (baseUrl, apiKey, filename) => {
  try {
    return await makeRequest(
      `${baseUrl}/v1/secret/file/${filename}`,
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
