import { formatNumber, truncateHex, getErrorMessage, getTotalRows } from './formatters';

describe('formatters utils', () => {
  describe('formatNumber', () => {
    it('formats numbers with thousand separators', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(64075909)).toBe('64,075,909');
    });

    it('returns input if not a number', () => {
      expect(formatNumber('abc')).toBe('abc');
      expect(formatNumber(null)).toBe(null);
    });
  });

  describe('truncateHex', () => {
    it('truncates long hex strings', () => {
      const longHex = '70ad29aacf0b690b0467fe2b2767f765';
      expect(truncateHex(longHex, 12)).toBe('70ad29aacf0b...');
    });

    it('returns short hex strings unchanged', () => {
      const shortHex = '70ad29aa';
      expect(truncateHex(shortHex, 12)).toBe(shortHex);
    });

    it('handles invalid input', () => {
      expect(truncateHex(null)).toBe(null);
      expect(truncateHex('')).toBe('');
    });
  });

  describe('getErrorMessage', () => {
    it('returns error message from Error object', () => {
      const error = new Error('Test error');
      expect(getErrorMessage(error)).toBe('Test error');
    });

    it('returns string error as-is', () => {
      expect(getErrorMessage('String error')).toBe('String error');
    });

    it('returns default message for invalid input', () => {
      expect(getErrorMessage({})).toBe('An unexpected error occurred');
    });
  });

  describe('getTotalRows', () => {
    it('calculates total rows correctly', () => {
      const files = [
        { lines: [1, 2, 3] },
        { lines: [1, 2] }
      ];
      expect(getTotalRows(files)).toBe(5);
    });

    it('handles empty array', () => {
      expect(getTotalRows([])).toBe(0);
    });

    it('handles invalid input', () => {
      expect(getTotalRows(null)).toBe(0);
      expect(getTotalRows('invalid')).toBe(0);
    });
  });
});
