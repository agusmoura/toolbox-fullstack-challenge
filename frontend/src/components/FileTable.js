import React, { useMemo, useState, useCallback } from 'react';
import { Table, Button, Container, Card, Row, Col, Form, InputGroup, Badge } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import useFilesData from '../hooks/useFilesData';
import { selectFileCount, selectSortConfig } from '../store/selectors/filesSelectors';
import { setSortConfig } from '../store/slices/filesSlice';
import SkeletonLoader from './ui/SkeletonLoader';
import ErrorAlert from './ui/ErrorAlert';
import EmptyState from './ui/EmptyState';
import Icon from './ui/Icon';
import { formatNumber } from '../utils/formatters';
import './FileTable.css';

/**
 * Main table component to display CSV file data
 * Uses Redux for state management and custom hooks for data fetching
 */
const FileTable = () => {
  const dispatch = useDispatch();
  const { data, loading, error, isEmpty, totalRows, retry, refresh } = useFilesData();
  const fileCount = useSelector(selectFileCount);
  const sortConfig = useSelector(selectSortConfig);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFile, setSelectedFile] = useState('all');

  // Handle column header click for sorting
  const handleSort = useCallback((key) => {
    const newDirection =
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    dispatch(setSortConfig({ key, direction: newDirection }));
  }, [sortConfig, dispatch]);

  // Get unique file names
  const fileNames = useMemo(() => {
    const names = new Set();
    data.forEach(file => names.add(file.file));
    return Array.from(names).sort();
  }, [data]);

  // Filter and sort data based on search, file selection, and sorting
  const filteredData = useMemo(() => {
    // First, flatten the data structure
    let flatData = [];
    data.forEach(file => {
      file.lines.forEach(line => {
        flatData.push({
          fileName: file.file,
          text: line.text,
          number: line.number,
          hex: line.hex
        });
      });
    });

    // Filter by search term and file
    flatData = flatData.filter(row => {
      const matchesSearch = searchTerm === '' ||
        row.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.hex.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(row.number).includes(searchTerm);
      const matchesFile = selectedFile === 'all' || row.fileName === selectedFile;
      return matchesSearch && matchesFile;
    });

    // Sort if a sort config is set
    if (sortConfig.key) {
      flatData.sort((a, b) => {
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
    }

    return flatData;
  }, [data, searchTerm, selectedFile, sortConfig]);

  // Calculate filtered stats
  const filteredStats = useMemo(() => {
    const rows = filteredData.length;
    const uniqueFiles = new Set(filteredData.map(row => row.fileName)).size;
    return {
      rows,
      files: uniqueFiles,
      rowsLabel: rows !== 1 ? 's' : '',
      filesLabel: uniqueFiles !== 1 ? 's' : ''
    };
  }, [filteredData]);

  // Memoize file count to avoid unnecessary recalculations
  const displayInfo = useMemo(() => {
    return {
      rows: totalRows,
      files: fileCount,
      rowsLabel: totalRows !== 1 ? 's' : '',
      filesLabel: fileCount !== 1 ? 's' : ''
    };
  }, [totalRows, fileCount]);

  if (loading) {
    return <SkeletonLoader rows={8} />;
  }

  if (error) {
    return <ErrorAlert error={error} onRetry={retry} />;
  }

  if (isEmpty) {
    return <EmptyState onAction={refresh} />;
  }

  return (
    <Container className="py-4" fluid="lg">
      {/* Stats Cards */}
      <Row className="mb-4 g-3">
        <Col xs={12} sm={6} lg={3}>
          <Card className="stat-card border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="stat-icon bg-primary bg-opacity-10 text-primary me-3">
                <Icon name="document" size={24} />
              </div>
              <div>
                <div className="stat-value">{formatNumber(displayInfo.rows)}</div>
                <div className="stat-label">Total Records</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="stat-card border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="stat-icon bg-success bg-opacity-10 text-success me-3">
                <Icon name="file" size={24} />
              </div>
              <div>
                <div className="stat-value">{displayInfo.files}</div>
                <div className="stat-label">Files Loaded</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="stat-card border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="stat-icon bg-info bg-opacity-10 text-info me-3">
                <Icon name="search" size={24} />
              </div>
              <div>
                <div className="stat-value">{formatNumber(filteredStats.rows)}</div>
                <div className="stat-label">Filtered Results</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <Card className="stat-card border-0 shadow-sm h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="stat-icon bg-warning bg-opacity-10 text-warning me-3">
                <Icon name="home" size={24} />
              </div>
              <div>
                <div className="stat-value">{filteredStats.files}</div>
                <div className="stat-label">Active Files</div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Search and Filter */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3 align-items-center">
            <Col xs={12} md={6}>
              <InputGroup>
                <InputGroup.Text className="bg-white">
                  <Icon name="search" size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by text, number, or hex..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0"
                />
                {searchTerm && (
                  <Button variant="outline-secondary" onClick={() => setSearchTerm('')}>
                    <Icon name="close" size={16} />
                  </Button>
                )}
              </InputGroup>
            </Col>
            <Col xs={12} md={4}>
              <Form.Select
                value={selectedFile}
                onChange={(e) => setSelectedFile(e.target.value)}
              >
                <option value="all">All Files ({fileNames.length})</option>
                {fileNames.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={12} md={2}>
              <Button variant="outline-danger" className="w-100" onClick={refresh}>
                <Icon name="refresh" size={16} className="me-1" />
                Refresh
              </Button>
            </Col>
          </Row>
          {(searchTerm || selectedFile !== 'all') && (
            <div className="mt-3 d-flex align-items-center gap-2">
              <small className="text-muted">Active filters:</small>
              {searchTerm && (
                <Badge bg="primary" className="px-3 py-2">
                  Search: "{searchTerm}"
                  <button
                    className="btn-close btn-close-white ms-2"
                    style={{ fontSize: '0.6rem' }}
                    onClick={() => setSearchTerm('')}
                    aria-label="Clear search"
                  ></button>
                </Badge>
              )}
              {selectedFile !== 'all' && (
                <Badge bg="success" className="px-3 py-2">
                  File: {selectedFile}
                  <button
                    className="btn-close btn-close-white ms-2"
                    style={{ fontSize: '0.6rem' }}
                    onClick={() => setSelectedFile('all')}
                    aria-label="Clear file filter"
                  ></button>
                </Badge>
              )}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Data Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0 modern-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort('fileName')} className="sortable-header" style={{ cursor: 'pointer' }}>
                    <div className="d-flex align-items-center gap-2">
                      <Icon name="file" size={16} />
                      File Name
                      {sortConfig.key === 'fileName' && (
                        <span className="sort-indicator">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th onClick={() => handleSort('text')} className="sortable-header" style={{ cursor: 'pointer' }}>
                    <div className="d-flex align-items-center gap-2">
                      <Icon name="text" size={16} />
                      Text
                      {sortConfig.key === 'text' && (
                        <span className="sort-indicator">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th onClick={() => handleSort('number')} className="sortable-header text-end" style={{ cursor: 'pointer' }}>
                    <div className="d-flex align-items-center justify-content-end gap-2">
                      <Icon name="sort" size={16} />
                      Number
                      {sortConfig.key === 'number' && (
                        <span className="sort-indicator">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th onClick={() => handleSort('hex')} className="sortable-header" style={{ cursor: 'pointer' }}>
                    <div className="d-flex align-items-center gap-2">
                      <Icon name="hex" size={16} />
                      Hex
                      {sortConfig.key === 'hex' && (
                        <span className="sort-indicator">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-muted">
                      <div className="mb-2">
                        <Icon name="search" size={48} />
                      </div>
                      No results found. Try adjusting your filters.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row, index) => (
                    <tr key={`${row.fileName}-${index}`} className="table-row-hover">
                      <td>
                        <Badge bg="light" text="dark" className="badge-file">
                          {row.fileName}
                        </Badge>
                      </td>
                      <td className="text-content">{row.text}</td>
                      <td className="text-end number-cell">{formatNumber(row.number)}</td>
                      <td className="font-monospace hex-cell">{row.hex}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FileTable;
