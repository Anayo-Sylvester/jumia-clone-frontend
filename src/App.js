import './App.css'; // Importing global styles
import React, { lazy, Suspense } from 'react'; // Importing React, lazy, and Suspense for code splitting
import LoadingFallback from './components/Layouts/LoadingFallback';

export const apiBaseUrl = process.env.REACT_APP_API_URL; // remove this Base API URL

// Lazy loading RoutesEl component
const RoutesEl = lazy(() => import('./routes/Routes'));

// Exporting various URL paths for convenience
export const urls = {
  cart: `${process.env.PUBLIC_URL}/cart`,
  order: `${process.env.PUBLIC_URL}/order`,
  home: `${process.env.PUBLIC_URL}/`,
  notfound: `${process.env.PUBLIC_URL}/*`,
  help: `${process.env.PUBLIC_URL}/help`,
  account: `${process.env.PUBLIC_URL}/account`,
  sell: `${process.env.PUBLIC_URL}/sell`,
  category: `${process.env.PUBLIC_URL}/categories`,
  feed: `${process.env.PUBLIC_URL}/feed`,
  products: `${process.env.PUBLIC_URL}/products`,
  product: `${process.env.PUBLIC_URL}/product`,
  login: `${process.env.PUBLIC_URL}/login`,
  register: `${process.env.PUBLIC_URL}/register`,
};

// Main App component
export function App() {
  return (
    <Suspense fallback={<LoadingFallback/>}>
        <RoutesEl />
    </Suspense>
  );
}
