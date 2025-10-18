module.exports = {
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  externalApi: {
    baseUrl: process.env.EXTERNAL_API_URL || 'https://echo-serv.tbxnet.com',
    apiKey: process.env.API_KEY || 'Bearer aSuperSecretKey',
    timeout: parseInt(process.env.API_TIMEOUT, 10) || 30000,
    endpoints: {
      filesList: '/v1/secret/files',
      fileDownload: '/v1/secret/file'
    }
  }
};
