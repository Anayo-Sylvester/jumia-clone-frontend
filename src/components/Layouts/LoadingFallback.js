import React from 'react';
import PropTypes from 'prop-types';

/**
 * LoadingFallback Component
 * Displays a loading spinner animation
 * 
 * @component
 * @param {Object} props
 * @param {string} [props.size='40px'] - Size of the spinner
 * @returns {JSX.Element} Loading spinner with animation
 */
const LoadingFallback = ({ size = '40px' }) => (
  <div className="flex justify-center items-center min-h-[200px]">
    <div 
      className="animate-spin rounded-full border-t-4 border-b-4 border-orange"
      style={{ 
        width: size, 
        height: size,
        borderTopColor: '#F68B1E',
        borderBottomColor: '#F68B1E',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent'
      }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

LoadingFallback.propTypes = {
  size: PropTypes.string
};

LoadingFallback.displayName = 'LoadingFallback';

export default React.memo(LoadingFallback);