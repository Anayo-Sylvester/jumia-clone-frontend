import React, { lazy, Suspense, useMemo } from "react";
import LoadingFallback from "../LoadingFallback";

// Lazy loaded components for code splitting and performance
const HeaderTop = lazy(() => import("./components/HeaderTop"));
const HeaderTopBtm = lazy(() => import("./components/Navbar/HeaderTopBottom"));

/**
 * Header Component
 * Main header component that contains the top banner and navigation bar
 * Uses React.lazy for code splitting and performance optimization
 *
 * @component
 * @example
 * return (
 *   <Header />
 * )
 */
function Header() {
    // Memoize the header content to prevent unnecessary re-renders
    const headerContent = useMemo(() => (
        <header>
            <Suspense fallback={<LoadingFallback />}>
                <HeaderTop />
            </Suspense>
            <Suspense fallback={<LoadingFallback />}>
                <HeaderTopBtm />
            </Suspense>
        </header>
    ), []);

    return headerContent;
}

// Add displayName for better debugging experience
Header.displayName = 'Header';

export default React.memo(Header);