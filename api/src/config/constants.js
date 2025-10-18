module.exports = {
  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503
  },

  HTTP_STATUS_RANGES: {
    SUCCESS_MIN: 200,
    SUCCESS_MAX: 299,
    CLIENT_ERROR_MIN: 400,
    CLIENT_ERROR_MAX: 499,
    SERVER_ERROR_MIN: 500,
    SERVER_ERROR_MAX: 599
  },

  ERROR_MESSAGES: {
    SERVER_CONFIG_ERROR: 'Server configuration error',
    API_URL_NOT_CONFIGURED: 'External API URL or API key not configured',
    SERVICE_UNAVAILABLE: 'Service temporarily unavailable',
    UNABLE_TO_FETCH: 'Unable to fetch data from external API',
    NOT_FOUND: 'Not Found',
    ROUTE_NOT_FOUND: 'Route not found',
    INTERNAL_ERROR: 'Internal Server Error',
    UNEXPECTED_ERROR: 'An unexpected error occurred',
    REQUEST_TIMEOUT: 'Request timeout'
  },

  API_INFO: {
    NAME: 'Toolbox Fullstack Challenge API',
    STATUS: 'running',
    ENDPOINTS: {
      FILES_DATA: '/files/data',
      FILES_LIST: '/files/list'
    }
  }
};
