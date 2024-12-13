/**
 * Entry point of the React application.
 * This file initializes and renders the root component of the app.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './utils/queryClient'; // Import the configured React Query client
import Layout from './components/Layouts/Layout'; // Layout component that manages the app structure
import reportWebVitals from './reportWebVitals'; // Performance monitoring utility

// Create a root element for React to render into
const root = ReactDOM.createRoot(document.getElementById('root'));

/**
 * Render the application.
 * 
 * - `React.StrictMode`: Helps detect potential issues in the application during development.
 * - `QueryClientProvider`: Provides React Query context for managing server-state caching.
 * - `BrowserRouter`: Enables routing within the app.
 * - `Layout`: The main layout component that contains the application structure and logic.
 */
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

/**
 * Logs app performance metrics (optional).
 * Can be used to analyze and improve app performance.
 * Example: Pass a callback function to send metrics to an analytics endpoint.
 */
reportWebVitals();
