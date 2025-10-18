/**
 * Format a number with thousand separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
  if (typeof num !== 'number') return num;
  return num.toLocaleString('en-US');
};

/**
 * Truncate a hex string to specified length
 * @param {string} hex - Hex string to truncate
 * @param {number} length - Maximum length before truncation
 * @returns {string} Truncated hex string
 */
export const truncateHex = (hex, length = 12) => {
  if (!hex || typeof hex !== 'string') return hex;
  return hex.length > length ? `${hex.substring(0, length)}...` : hex;
};

/**
 * Get user-friendly error message from error object
 * @param {Error|string} error - Error object or message
 * @returns {string} User-friendly error message
 */
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  return 'An unexpected error occurred';
};

/**
 * Calculate total number of rows across all files
 * @param {Array} files - Array of file objects
 * @returns {number} Total row count
 */
export const getTotalRows = (files) => {
  if (!Array.isArray(files)) return 0;
  return files.reduce((acc, file) => acc + (file.lines?.length || 0), 0);
};
