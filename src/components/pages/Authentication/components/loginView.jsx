import React, { lazy, Suspense, useContext, useState, useMemo, useCallback } from 'react';
import { AuthContext } from '../../../../contexts/AuthContext';
import PropTypes from 'prop-types';
import LoadingFallback from '../../../Layouts/LoadingFallback';

// Lazy load components
const Info = lazy(() => import('./Info'));
const Form = lazy(() => import('./Form'));
const Footer = lazy(() => import('./Footer'));
const Toast = lazy(() => import('../../../Layouts/Toast/Toast'));

/**
 * LoginView Component
 * Handles user authentication views (login/register)
 * Uses lazy loading for optimal performance
 * 
 * @component
 * @param {Object} props
 * @param {string} props.action - Current action (login/register)
 */
const LoginView = ({ action }) => {
  const {setIsLoggedInState} = useContext(AuthContext);

  // Memoize main content
  const mainContent = useMemo(() => (
    <div className="mb-3">
      <Suspense fallback={<LoadingFallback />}>
        <Info />
        <Form
          setIsLoggedIn={setIsLoggedInState}
          param={action}
        />
      </Suspense>
    </div>
  ), [action, setIsLoggedInState]);

  return (
    <div className="h-screen text-center">
      <div className="flex flex-col justify-between pt-6 pb-8 mx-auto max-w-[391px] h-screen">
        {mainContent}
        <Suspense fallback={<LoadingFallback />}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
};

LoginView.propTypes = {
  action: PropTypes.string.isRequired,
};

LoginView.displayName = 'LoginView';

export default React.memo(LoginView);
