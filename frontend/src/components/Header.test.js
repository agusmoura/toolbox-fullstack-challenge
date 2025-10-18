import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByText('CSV Data Viewer')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    render(<Header />);
    const title = screen.getByText('CSV Data Viewer');
    expect(title).toHaveClass('brand-title');
  });

  it('displays the subtitle', () => {
    render(<Header />);
    const subtitle = screen.getByText('React + Redux');
    expect(subtitle).toHaveClass('brand-subtitle');
  });

  it('displays the Live badge', () => {
    render(<Header />);
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('has correct Bootstrap classes', () => {
    const { container } = render(<Header />);
    const navbar = container.querySelector('.navbar');
    expect(navbar).toHaveClass('custom-navbar');
    expect(navbar).toHaveClass('shadow-sm');
  });

  it('renders the logo icon', () => {
    const { container } = render(<Header />);
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('viewBox', '0 0 32 32');
  });
});
