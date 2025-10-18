import React from 'react';
import { Alert, Button, Container } from 'react-bootstrap';

/**
 * Reusable error alert component
 * @param {object} props
 * @param {string} props.error - Error message to display
 * @param {function} props.onRetry - Retry callback function
 * @param {boolean} props.dismissible - Whether alert can be dismissed
 */
const ErrorAlert = ({ error, onRetry, dismissible = false }) => {
  if (!error) return null;

  return (
    <Container className="py-4">
      <Alert variant="danger" dismissible={dismissible} className="mb-3">
        <Alert.Heading>Error</Alert.Heading>
        <p className="mb-3">{error}</p>
        {onRetry && (
          <div className="d-flex gap-2">
            <Button variant="danger" onClick={onRetry}>
              Retry
            </Button>
          </div>
        )}
      </Alert>
    </Container>
  );
};

export default ErrorAlert;
