import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

/**
 * Footer Component
 * Provides additional support information and displays the company logo.
 * Uses useMemo to optimize rendering of static content.
 * 
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 */
function Footer() {
  // Memoize support message section
  const supportMessage = useMemo(() => (
    <p className="text-sm text-gray-700">
      For further support, you may visit the 
      <a 
        href="/help-center" 
        className="text-blue-500 hover:underline mx-1"
      >
        Help Center
      </a>
      or contact our customer service team.
    </p>
  ), []);

  // Memoize logo section
  const logo = useMemo(() => (
    <img 
      src="./icons/jumia-logo.png" 
      alt="Jumia Logo" 
      className="h-5 mx-auto" 
      loading="lazy"
      fetchpriority="low"
    />
  ), []);

  return (
    <footer className="grid gap-8 p-4 bg-gray-100 text-center">
      {supportMessage}
      {logo}
    </footer>
  );
}

Footer.displayName = 'Footer';

export default React.memo(Footer);
