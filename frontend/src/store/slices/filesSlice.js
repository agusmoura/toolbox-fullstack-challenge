import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFilesData as apiFetchFilesData, fetchFilesList as apiFetchFilesList } from '../../services/apiService';
import { STATUS } from '../../constants';

const initialState = {
  data: [],
  list: [],
  selectedFile: null,
  sortConfig: {
    key: null,
    direction: 'asc' // 'asc' or 'desc'
  },
  status: STATUS.IDLE,
  error: null
};

/**
 * Async thunk to fetch files data from API
 */
export const fetchFilesData = createAsyncThunk(
  'files/fetchFilesData',
  async (fileName = null, { rejectWithValue }) => {
    try {
      const data = await apiFetchFilesData(fileName);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Async thunk to fetch files list from API
 */
export const fetchFilesList = createAsyncThunk(
  'files/fetchFilesList',
  async (_, { rejectWithValue }) => {
    try {
      const list = await apiFetchFilesList();
      return list;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const filesSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setSelectedFile: (state, action) => {
      state.selectedFile = action.payload;
    },
    setSortConfig: (state, action) => {
      state.sortConfig = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    resetFiles: () => initialState
  },
  extraReducers: (builder) => {
    builder
      // fetchFilesData
      .addCase(fetchFilesData.pending, (state) => {
        state.status = STATUS.LOADING;
        state.error = null;
      })
      .addCase(fetchFilesData.fulfilled, (state, action) => {
        state.status = STATUS.SUCCEEDED;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchFilesData.rejected, (state, action) => {
        state.status = STATUS.FAILED;
        state.error = action.payload || 'Failed to fetch files data';
      })
      // fetchFilesList
      .addCase(fetchFilesList.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchFilesList.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(fetchFilesList.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch files list';
      });
  }
});

export const { setSelectedFile, setSortConfig, clearError, resetFiles } = filesSlice.actions;
export default filesSlice.reducer;
