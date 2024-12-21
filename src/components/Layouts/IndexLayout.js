import React, { lazy, Suspense, useContext, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingFallback from './LoadingFallback';
import { AuthContext } from '../../contexts/AuthContext';
import { IndexToastUi } from './Toast/Toast';

/**
 * Lazy loaded components with preloadable modules
 * @see https://reactjs.org/docs/code-splitting.html#named-exports
 */
const App = lazy(() => import('../../App').then(module => ({ default: module.App })));
const Header = lazy(() => import('./Header/Header'));
const MobileNavbar = lazy(() => import('./MobileNavbar/MobileNavbar'));

/**
 * Layout Component
 * Main layout wrapper that manages the app structure and navigation
 * Handles component lazy loading and authentication state
 * 
 * @component
 * @returns {JSX.Element} The main layout structure with lazy-loaded components
 */
function Layout() {
  const location = useLocation();
  const { isLoggedInState } = useContext(AuthContext);

  // Memoize path checking utility
  const checkPath = useCallback((path) => 
    location.pathname.startsWith(`${process.env.PUBLIC_URL}${path}`),
  [location.pathname]);

  // Memoize route checks
  const { isAuthPage, isCartPage } = useMemo(() => ({
    isAuthPage: checkPath('/login') || checkPath('/register'),
    isCartPage: !isLoggedInState && checkPath('/cart')
  }), [checkPath, isLoggedInState]);

  // Memoize header section
  const headerSection = useMemo(() => (
    !isAuthPage && !isCartPage && (
      <>
        <Header />
        <IndexToastUi />
      </>
    )
  ), [isAuthPage, isCartPage]);

  // Memoize main content
  const mainContent = useMemo(() => (
    <div className='mx-auto lg:max-w-[950px] xl:max-w-[1184px]'>
      <App />
      {!isAuthPage && !isCartPage && <MobileNavbar isLoggedIn={isLoggedInState} />}
    </div>
  ), [isAuthPage, isCartPage, isLoggedInState]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      {headerSection}
      {mainContent}
    </Suspense>
  );
}

Layout.displayName = 'Layout';

export default React.memo(Layout);
