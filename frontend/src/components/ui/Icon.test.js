import React from 'react';
import { render, screen } from '@testing-library/react';
import Icon from './Icon';

describe('Icon Component', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(<Icon name="document" />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render document icon', () => {
      render(<Icon name="document" />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    });

    it('should render file icon', () => {
      render(<Icon name="file" />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render search icon', () => {
      render(<Icon name="search" />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render close icon', () => {
      render(<Icon name="close" />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render refresh icon', () => {
      render(<Icon name="refresh" />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render home icon', () => {
      render(<Icon name="home" />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render sort icon', () => {
      render(<Icon name="sort" />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render text icon', () => {
      render(<Icon name="text" />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render hex icon', () => {
      render(<Icon name="hex" />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('should render logo icon with 32x32 viewBox', () => {
      render(<Icon name="logo" />);
      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 32 32');
    });

    it('should return null for invalid icon name', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
      const { container } = render(<Icon name="invalid" />);
      expect(container.firstChild).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Icon "invalid" not found')
      );
      consoleSpy.mockRestore();
    });
  });

  describe('Props', () => {
    it('should apply custom size', () => {
      render(<Icon name="document" size={48} />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveStyle({ width: '48px', height: '48px' });
    });

    it('should apply default size of 24', () => {
      render(<Icon name="document" />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveStyle({ width: '24px', height: '24px' });
    });

    it('should apply custom color', () => {
      render(<Icon name="document" color="red" />);
      const path = document.querySelector('path');
      expect(path).toHaveAttribute('stroke', 'red');
    });

    it('should apply default color of currentColor', () => {
      render(<Icon name="document" />);
      const path = document.querySelector('path');
      expect(path).toHaveAttribute('stroke', 'currentColor');
    });

    it('should apply custom className', () => {
      render(<Icon name="document" className="custom-class" />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveClass('custom-class');
    });

    it('should apply custom style', () => {
      render(<Icon name="document" style={{ opacity: 0.5 }} />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveStyle({ opacity: '0.5' });
    });

    it('should merge custom style with size style', () => {
      render(<Icon name="document" size={32} style={{ margin: '10px' }} />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveStyle({
        width: '32px',
        height: '32px',
        margin: '10px'
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper SVG structure', () => {
      render(<Icon name="document" />);
      const svg = document.querySelector('svg');
      expect(svg.tagName.toLowerCase()).toBe('svg');
    });

    it('should have fill="none" for most icons', () => {
      render(<Icon name="document" />);
      const svg = document.querySelector('svg');
      expect(svg).toHaveAttribute('fill', 'none');
    });
  });

  describe('All Icons Coverage', () => {
    const iconNames = [
      'document',
      'file',
      'search',
      'close',
      'refresh',
      'home',
      'sort',
      'text',
      'hex',
      'logo'
    ];

    iconNames.forEach((iconName) => {
      it(`should render ${iconName} icon without errors`, () => {
        const { container } = render(<Icon name={iconName} />);
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
      });
    });
  });
});
