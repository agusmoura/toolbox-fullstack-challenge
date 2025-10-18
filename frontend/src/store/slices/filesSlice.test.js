import filesReducer, {
  fetchFilesData,
  fetchFilesList,
  setSelectedFile,
  clearError,
  resetFiles
} from './filesSlice';
import { STATUS } from '../../constants';

describe('filesSlice', () => {
  const initialState = {
    data: [],
    list: [],
    selectedFile: null,
    sortConfig: {
      key: null,
      direction: 'asc'
    },
    status: STATUS.IDLE,
    error: null
  };

  it('should return initial state', () => {
    expect(filesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setSelectedFile', () => {
    const actual = filesReducer(initialState, setSelectedFile('test.csv'));
    expect(actual.selectedFile).toEqual('test.csv');
  });

  it('should handle clearError', () => {
    const state = { ...initialState, error: 'Test error' };
    const actual = filesReducer(state, clearError());
    expect(actual.error).toBeNull();
  });

  it('should handle resetFiles', () => {
    const state = {
      data: [{ file: 'test.csv', lines: [] }],
      list: ['test.csv'],
      selectedFile: 'test.csv',
      sortConfig: {
        key: 'fileName',
        direction: 'desc'
      },
      status: STATUS.SUCCEEDED,
      error: null
    };
    const actual = filesReducer(state, resetFiles());
    expect(actual).toEqual(initialState);
  });

  it('should handle fetchFilesData.pending', () => {
    const actual = filesReducer(initialState, fetchFilesData.pending());
    expect(actual.status).toEqual(STATUS.LOADING);
    expect(actual.error).toBeNull();
  });

  it('should handle fetchFilesData.fulfilled', () => {
    const payload = [{ file: 'test.csv', lines: [] }];
    const actual = filesReducer(initialState, fetchFilesData.fulfilled(payload));
    expect(actual.status).toEqual(STATUS.SUCCEEDED);
    expect(actual.data).toEqual(payload);
    expect(actual.error).toBeNull();
  });

  it('should handle fetchFilesData.rejected', () => {
    const error = 'Network error';
    const actual = filesReducer(initialState, fetchFilesData.rejected(null, '', null, error));
    expect(actual.status).toEqual(STATUS.FAILED);
    expect(actual.error).toBeTruthy();
  });
});
