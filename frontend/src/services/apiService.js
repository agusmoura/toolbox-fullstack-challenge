import axios from 'axios';
import config from '../config/environment';
import { HTTP_STATUS, ERROR_MESSAGES } from '../constants';

const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json'
  }
});

const handleApiError = (error) => {
  if (error.response) {
    const status = error.response.status;

    if (status === HTTP_STATUS.NOT_FOUND) {
      throw new Error(ERROR_MESSAGES.NOT_FOUND);
    } else if (status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
      throw new Error(ERROR_MESSAGES.SERVER_ERROR);
    } else if (status === HTTP_STATUS.SERVICE_UNAVAILABLE) {
      throw new Error(ERROR_MESSAGES.SERVICE_UNAVAILABLE);
    } else {
      throw new Error(ERROR_MESSAGES.UNKNOWN);
    }
  } else if (error.request) {
    if (error.code === 'ECONNABORTED') {
      throw new Error(ERROR_MESSAGES.TIMEOUT);
    } else if (error.message === 'Network Error') {
      throw new Error(ERROR_MESSAGES.NETWORK);
    } else {
      throw new Error(ERROR_MESSAGES.NETWORK);
    }
  } else {
    throw new Error(ERROR_MESSAGES.UNKNOWN);
  }
};

export const fetchFilesData = async (fileName = null) => {
  try {
    const url = fileName
      ? `${config.api.endpoints.filesData}?fileName=${fileName}`
      : config.api.endpoints.filesData;
    const response = await apiClient.get(url);

    if (!Array.isArray(response.data)) {
      throw new Error(ERROR_MESSAGES.INVALID_DATA);
    }

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchFilesList = async () => {
  try {
    const response = await apiClient.get(config.api.endpoints.filesList);

    if (!response.data || !Array.isArray(response.data.files)) {
      throw new Error(ERROR_MESSAGES.INVALID_DATA);
    }

    return response.data.files;
  } catch (error) {
    handleApiError(error);
  }
};
