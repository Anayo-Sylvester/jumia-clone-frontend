import React, { lazy, Suspense, useContext, useMemo } from "react";
import { useLocation } from "react-router";
import { AuthContext } from "../../../contexts/AuthContext";
import LoadingFallback from "../../Layouts/LoadingFallback";
import PropTypes from 'prop-types';

// Lazy load view components
const LoginView = lazy(() => import("./components/loginView"));
const LogoutView = lazy(() => import("./components/logoutView"));

/**
 * AuthenticationPage Component
 * Handles user authentication routing and views
 * 
 * @component
 * @returns {JSX.Element} Authentication view based on login state
 */
export function AuthenticationPage() {
  const {isLoggedInState} = useContext(AuthContext);
  const location = useLocation();

  // Memoize action parameter extraction
  const endWith = useMemo(() => 
    ['login', 'register'].includes(location.pathname.split('/').pop()) 
      ? location.pathname.split('/').pop() 
      : 'login',
    [location.pathname]
  );

  // Memoize view rendering
  const authView = useMemo(() => (
    isLoggedInState ? (
      <LogoutView />
    ) : (
      <LoginView action={endWith} />
    )
  ), [isLoggedInState, endWith]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      {authView}
    </Suspense>
  );
}

AuthenticationPage.displayName = 'AuthenticationPage';

export default React.memo(AuthenticationPage);
