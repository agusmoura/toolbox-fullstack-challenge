import React from 'react';
import { Container, Button } from 'react-bootstrap';

/**
 * Reusable empty state component
 * @param {object} props
 * @param {string} props.title - Title for empty state
 * @param {string} props.message - Message to display
 * @param {function} props.onAction - Action button callback
 * @param {string} props.actionText - Action button text
 */
const EmptyState = ({
  title = 'No Data Available',
  message = 'No files are currently available to display.',
  onAction,
  actionText = 'Refresh'
}) => {
  return (
    <Container className="text-center py-5">
      <div className="empty-state">
        <h3 className="text-muted mb-3">{title}</h3>
        <p className="text-muted">{message}</p>
        {onAction && (
          <Button variant="primary" onClick={onAction} className="mt-3">
            {actionText}
          </Button>
        )}
      </div>
    </Container>
  );
};

export default EmptyState;
