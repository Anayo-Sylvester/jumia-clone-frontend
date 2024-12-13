import React from 'react';

/**
 * Footer Component
 * Provides additional support information and displays the company logo.
 */
export default function Footer() {
  return (
    <footer className="grid gap-8 p-4 bg-gray-100 text-center">
      {/* Support Message */}
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

      {/* Company Logo */}
      <img 
        src="./icons/jumia-logo.png" 
        alt="Jumia Logo" 
        className="h-5 mx-auto" 
        loading="lazy" // Lazy loading for improved performance
      />
    </footer>
  );
}
