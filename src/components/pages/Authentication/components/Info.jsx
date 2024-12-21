import { Link } from "react-router-dom"; 
import React, { useMemo } from "react"; 

/**
 * Info Component
 * Displays welcome information and branding for the authentication page
 * Uses memoization for static content optimization
 * 
 * @component
 * @returns {JSX.Element} Authentication info section
 */
function Info() {
  // Memoize logo section
  const logoSection = useMemo(() => (
    <Link to={'/'}>
      <img 
        src={`${process.env.PUBLIC_URL}/icons/favicon.svg`} 
        alt="jumia logo" 
        className="h-16 mx-auto" 
        loading="lazy"
      />
    </Link>
  ), []);

  // Memoize text content
  const textContent = useMemo(() => (
    <>
      <h2 className="text-[20px] font-semibold">Welcome to Jumia Clone</h2>
      <p className="text-gray-500">Sign in to continue shopping and explore great deals</p>
      <p className="text-red-500">NOTE: This is not the real Jumia site, it's a clone project!</p>
    </>
  ), []);

  return (
    <div className="text-center">
      {logoSection}
      {textContent}
    </div>
  );
}

Info.displayName = 'Info';

export default React.memo(Info);
