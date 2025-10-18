import React from 'react';
import { Container, Card, Row, Col, Table } from 'react-bootstrap';
import './SkeletonLoader.css';

/**
 * SkeletonLoader component
 * Displays animated skeleton placeholders while data is loading
 * Mimics the exact structure of the actual FileTable for zero layout shift
 *
 * @param {Object} props
 * @param {number} props.rows - Number of skeleton rows to display (default: 5)
 */
const SkeletonLoader = ({ rows = 5 }) => {
  return (
    <Container className="py-4" fluid="lg">
      {/* Stats Cards Skeleton */}
      <Row className="mb-4 g-3">
        {[1, 2, 3, 4].map((i) => (
          <Col key={i} xs={12} sm={6} lg={3}>
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="d-flex align-items-center">
                <div className="skeleton skeleton-icon me-3"></div>
                <div className="flex-grow-1">
                  <div className="skeleton skeleton-stat-value mb-2"></div>
                  <div className="skeleton skeleton-stat-label"></div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Search and Filter Skeleton */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3 align-items-center">
            <Col xs={12} md={6}>
              <div className="skeleton skeleton-input"></div>
            </Col>
            <Col xs={12} md={4}>
              <div className="skeleton skeleton-select"></div>
            </Col>
            <Col xs={12} md={2}>
              <div className="skeleton skeleton-button"></div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Table Skeleton */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table hover className="mb-0">
              <thead style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
                <tr>
                  <th className="py-3 px-3">
                    <div className="skeleton skeleton-header" style={{ width: '120px' }}></div>
                  </th>
                  <th className="py-3 px-3">
                    <div className="skeleton skeleton-header" style={{ width: '80px' }}></div>
                  </th>
                  <th className="py-3 px-3">
                    <div className="skeleton skeleton-header" style={{ width: '100px' }}></div>
                  </th>
                  <th className="py-3 px-3">
                    <div className="skeleton skeleton-header" style={{ width: '80px' }}></div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: rows }).map((_, index) => (
                  <tr key={index}>
                    <td className="py-3 px-3">
                      <div className="skeleton skeleton-badge"></div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="skeleton skeleton-text" style={{ width: '200px' }}></div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="skeleton skeleton-number"></div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="skeleton skeleton-hex"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SkeletonLoader;
