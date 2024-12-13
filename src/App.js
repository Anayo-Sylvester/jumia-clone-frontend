import './App.css';  // Importing global styles
import React, { lazy, Suspense } from 'react';  // Importing React, lazy, and Suspense for code splitting

export const apiBaseUrl = process.env.REACT_APP_API_URL;  // Base API URL

// Lazy loading RoutesEl component
const RoutesEl = lazy(() => import('./routes/Routes'));

// Exporting various URL paths for convenience
export const urls = {
  cart: `${process.env.PUBLIC_URL}/cart`,  // Cart page URL
  home: `${process.env.PUBLIC_URL}/`,  // Home page URL
  notfound: `${process.env.PUBLIC_URL}/*`,  // Not found route
  help: `${process.env.PUBLIC_URL}/help`,  // Help page URL
  account: `${process.env.PUBLIC_URL}/account`,  // Account page URL
  sell: `${process.env.PUBLIC_URL}/sell`,  // Sell page URL
  category: `${process.env.PUBLIC_URL}/categories`,  // Categories page URL
  feed: `${process.env.PUBLIC_URL}/feed`,  // Feed page URL
  products: `${process.env.PUBLIC_URL}/products`,  // Products page URL
  product: `${process.env.PUBLIC_URL}/product`,  // Product page URL
  login: `${process.env.PUBLIC_URL}/login`,  // Login page URL
  register: `${process.env.PUBLIC_URL}/register`  // Register page URL
};

export const responsiveScreenLimits = `mx-auto lg:max-w-[950px] xl:max-w-[1184px]`;  // Responsive screen limits

// Main App component
export function App({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>  {/* Display fallback content while lazy loading */}
      <RoutesEl {...{ isLoggedIn, setIsLoggedIn }} />  {/* Rendering the lazy-loaded Routes component */}
    </Suspense>
  );
}
