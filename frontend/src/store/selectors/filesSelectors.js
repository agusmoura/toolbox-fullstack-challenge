import { createSelector } from '@reduxjs/toolkit';
import { STATUS } from '../../constants';
import { getTotalRows } from '../../utils/formatters';

export const selectFilesState = (state) => state.files;

export const selectFilesData = (state) => state.files.data;

export const selectFilesStatus = (state) => state.files.status;

export const selectFilesError = (state) => state.files.error;

export const selectFilesList = (state) => state.files.list;

export const selectSelectedFile = (state) => state.files.selectedFile;

export const selectSortConfig = (state) => state.files.sortConfig;

export const selectFilesLoading = (state) => state.files.status === STATUS.LOADING;

export const selectHasError = (state) => state.files.status === STATUS.FAILED;

export const selectIsEmpty = createSelector(
  [selectFilesData],
  (data) => !Array.isArray(data) || data.length === 0 || getTotalRows(data) === 0
);

export const selectTotalRows = createSelector(
  [selectFilesData],
  (data) => getTotalRows(data)
);

export const selectFilteredData = createSelector(
  [selectFilesData, selectSelectedFile],
  (data, selectedFile) => {
    if (!selectedFile || !Array.isArray(data)) return data;
    return data.filter(file => file.file === selectedFile);
  }
);

export const selectFileCount = createSelector(
  [selectFilesData],
  (data) => Array.isArray(data) ? data.length : 0
);

/**
 * Selector that returns sorted and flattened data
 * Flattens the nested structure and sorts by the configured column
 */
export const selectSortedData = createSelector(
  [selectFilesData, selectSortConfig],
  (data, sortConfig) => {
    if (!Array.isArray(data) || data.length === 0) return [];

    // Flatten the data structure
    const flatData = data.flatMap(file =>
      file.lines.map(line => ({
        fileName: file.file,
        text: line.text,
        number: line.number,
        hex: line.hex
      }))
    );

    // If no sort configured, return as-is
    if (!sortConfig.key) return flatData;

    // Sort the data
    const sorted = [...flatData].sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      // Handle null/undefined
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      // String comparison (case-insensitive)
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
        return sortConfig.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      // Number comparison
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortConfig.direction === 'asc'
          ? aVal - bVal
          : bVal - aVal;
      }

      // Default comparison
      return sortConfig.direction === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return sorted;
  }
);
