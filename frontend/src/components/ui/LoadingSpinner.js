import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

/**
 * Reusable loading spinner component
 * @param {object} props
 * @param {string} props.text - Loading text to display
 * @param {string} props.variant - Bootstrap color variant
 * @param {string} props.size - Spinner size (sm, lg)
 */
const LoadingSpinner = ({ text = 'Loading...', variant = 'primary', size = 'md' }) => {
  const spinnerSize = size === 'sm' ? { width: '2rem', height: '2rem' } : { width: '3rem', height: '3rem' };

  return (
    <Container className="text-center py-5">
      <Spinner
        animation="border"
        role="status"
        variant={variant}
        style={spinnerSize}
        className="mb-3"
      >
        <span className="visually-hidden">{text}</span>
      </Spinner>
      <p className="text-muted">{text}</p>
    </Container>
  );
};

export default LoadingSpinner;
