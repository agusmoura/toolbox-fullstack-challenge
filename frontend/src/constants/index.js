export const DEBOUNCE_DELAY = 300;

export const ERROR_MESSAGES = {
  NETWORK: 'Unable to connect to server. Make sure the API is running.',
  TIMEOUT: 'Request timed out. Please try again.',
  SERVER_ERROR: 'Server error. Please try again later.',
  NOT_FOUND: 'Endpoint not found. Please check API configuration.',
  SERVICE_UNAVAILABLE: 'Service temporarily unavailable. Please try again later.',
  INVALID_DATA: 'Invalid data received. Please contact support.',
  UNKNOWN: 'An unexpected error occurred. Please try again.'
};

export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCEEDED: 'succeeded',
  FAILED: 'failed'
};

export const SORT_DIRECTION = {
  ASC: 'asc',
  DESC: 'desc'
};

export const HTTP_STATUS = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};
