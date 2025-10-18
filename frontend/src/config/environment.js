const environment = {
  api: {
    // Use relative paths in production (empty string), full URL in development
    baseUrl: process.env.REACT_APP_API_URL !== undefined
      ? process.env.REACT_APP_API_URL
      : (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'),
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT, 10) || 10000,
    endpoints: {
      filesData: '/files/data',
      filesList: '/files/list'
    }
  },
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test'
};

export default environment;
