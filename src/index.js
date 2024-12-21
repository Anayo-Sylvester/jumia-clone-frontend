import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './utils/queryClient'; // Import the configured React Query client
import Layout from './components/Layouts/IndexLayout'; // Layout component that manages the app structure
import reportWebVitals from './reportWebVitals'; // Performance monitoring utility
import { AuthContextProvider } from './contexts/AuthContext'; // Ensure correct import
import ToastContextProvider from './components/Layouts/Toast/Logic/logic';

// Create a root element for React to render into
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
        <ToastContextProvider>
          <Layout />
        </ToastContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);


/**
 * Logs app performance metrics (optional).
 */
reportWebVitals();
