import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilesData } from '../store/slices/filesSlice';
import {
  selectFilesData,
  selectFilesLoading,
  selectFilesError,
  selectIsEmpty,
  selectTotalRows
} from '../store/selectors/filesSelectors';

/**
 * Custom hook to manage files data fetching and state
 * @param {string|null} fileName - Optional filename filter
 * @returns {object} Files data and helper functions
 */
const useFilesData = (fileName = null) => {
  const dispatch = useDispatch();

  const data = useSelector(selectFilesData);
  const loading = useSelector(selectFilesLoading);
  const error = useSelector(selectFilesError);
  const isEmpty = useSelector(selectIsEmpty);
  const totalRows = useSelector(selectTotalRows);

  useEffect(() => {
    dispatch(fetchFilesData(fileName));
  }, [dispatch, fileName]);

  const retry = useCallback(() => {
    dispatch(fetchFilesData(fileName));
  }, [dispatch, fileName]);

  const refresh = useCallback(() => {
    dispatch(fetchFilesData(fileName));
  }, [dispatch, fileName]);

  return {
    data,
    loading,
    error,
    isEmpty,
    totalRows,
    retry,
    refresh
  };
};

export default useFilesData;
