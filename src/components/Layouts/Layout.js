import React, { useEffect, lazy, Suspense, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingFallback from './LoadingFallback';
import useAuth from '../../hooks/useAuth';

const App = lazy(() => import('../../App').then((module) => ({ default: module.App })));
const Header = lazy(() => import('./Header/Header'));
const MobileNavbar = lazy(() => import('./MobileNavbar/MobileNavbar'));

function Layout() {
  const location = useLocation();
  const { isLoggedState, setIsLoggedIn, handleLogout, checkTokenValidity } = useAuth();

  const isAuthPage =
    location.pathname.startsWith(`${process.env.PUBLIC_URL}/login`) ||
    location.pathname.startsWith(`${process.env.PUBLIC_URL}/register`);

  // Token validation effect
  useEffect(() => {
    checkTokenValidity();
  }, [checkTokenValidity]);

  // Clear tokens if not logged in
  useEffect(() => {
    if (!isLoggedState) {
      handleLogout();
    }
  }, [isLoggedState, handleLogout]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      {!isAuthPage && <Header isLoggedIn={isLoggedState} />}
      <App isLoggedIn={isLoggedState} setIsLoggedIn={setIsLoggedIn} />
      {!isAuthPage && <MobileNavbar isLoggedIn={isLoggedState} />}
    </Suspense>
  );
}

export default Layout;
