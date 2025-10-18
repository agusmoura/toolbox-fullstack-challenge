import React from 'react';
import PropTypes from 'prop-types';

/**
 * Centralized Icon component for all SVG icons
 * @param {object} props
 * @param {string} props.name - Icon name
 * @param {number} props.size - Icon size in pixels
 * @param {string} props.color - Icon color (currentColor by default)
 * @param {string} props.className - Additional CSS classes
 * @param {object} props.style - Additional inline styles
 */
const Icon = ({ name, size = 24, color = 'currentColor', className = '', style = {}, ...rest }) => {
  const iconStyle = {
    width: size,
    height: size,
    ...style
  };

  const icons = {
    // Document/Table icon - for records/data display
    document: (
      <svg viewBox="0 0 24 24" fill="none" style={iconStyle} className={className} {...rest}>
        <path
          d="M9 12h6M9 16h6M9 8h6M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),

    // File icon - for file references
    file: (
      <svg viewBox="0 0 24 24" fill="none" style={iconStyle} className={className} {...rest}>
        <path
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),

    // Search icon - magnifying glass
    search: (
      <svg viewBox="0 0 24 24" fill="none" style={iconStyle} className={className} {...rest}>
        <path
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),

    // Close/X icon - for dismissing/closing
    close: (
      <svg viewBox="0 0 24 24" fill="none" style={iconStyle} className={className} {...rest}>
        <path
          d="M6 18L18 6M6 6l12 12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),

    // Refresh icon - circular arrows
    refresh: (
      <svg viewBox="0 0 24 24" fill="none" style={iconStyle} className={className} {...rest}>
        <path
          d="M1 4v6h6M23 20v-6h-6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),

    // Home/Folder icon - for folder/database references
    home: (
      <svg viewBox="0 0 24 24" fill="none" style={iconStyle} className={className} {...rest}>
        <path
          d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 002 2h2a2 2 0 002-2V9a2 2 0 00-.586-1.414l-7-7a2 2 0 00-2.828 0l-7 7A2 2 0 004 9v10a2 2 0 002 2h2a2 2 0 002-2z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),

    // Sort arrows icon - for sortable columns
    sort: (
      <svg viewBox="0 0 24 24" fill="none" style={iconStyle} className={className} {...rest}>
        <path
          d="M7 10l5-5 5 5M7 14l5 5 5-5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),

    // Text/Lines icon - horizontal lines for text content
    text: (
      <svg viewBox="0 0 24 24" fill="none" style={iconStyle} className={className} {...rest}>
        <path
          d="M4 6h16M4 12h16M4 18h16"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),

    // Hex icon - staggered lines for hex data
    hex: (
      <svg viewBox="0 0 24 24" fill="none" style={iconStyle} className={className} {...rest}>
        <path
          d="M8 9h8M8 13h6M8 17h4"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),

    // Logo icon - geometric brand icon
    logo: (
      <svg viewBox="0 0 32 32" fill="none" style={iconStyle} className={className} {...rest}>
        <rect width="32" height="32" rx="8" fill="white" fillOpacity="0.2"/>
        <path
          d="M8 12L16 8L24 12V20L16 24L8 20V12Z"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M16 8V16" stroke={color} strokeWidth="2"/>
        <path
          d="M8 12L16 16L24 12"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    )
  };

  // Return the requested icon or a warning if not found
  if (!icons[name]) {
    console.warn(`Icon "${name}" not found. Available icons: ${Object.keys(icons).join(', ')}`);
    return null;
  }

  return icons[name];
};

Icon.propTypes = {
  name: PropTypes.oneOf([
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
  ]).isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
};

export default Icon;
