import React, { lazy, Suspense, useEffect, useMemo } from "react";
import LoadingFallback from "../../Layouts/LoadingFallback";

/**
 * HomePage Component
 * Main landing page component that displays hero section, deals, and products
 * Uses lazy loading and suspense for better performance
 * 
 * @component
 * @example
 * return (
 *   <HomePage />
 * )
 * 
 * @returns {JSX.Element} The homepage with lazy-loaded sections
 */

// Lazy load components for code splitting and better initial load time
const Hero = lazy(() => import("./components/Hero"));
const DealsSection = lazy(() => import("./components/Deals"));
const DisplayFirstTenProducts = lazy(() => import("./components/ProductsCard"));

/**
 * HomePage implementation
 * Manages the layout and loading of main page sections
 * Implements background styling and title updates
 */
export default function HomePage() {
  // Background image path from environment variables
  const bg = `${process.env.PUBLIC_URL}/images/bg-pernod.jpeg`;

  // Set document title on component mount
  useEffect(() => {
    document.title = `Jumia Clone - Your One-stop Shop for Everything`;
  }, []);

  // Memoize background styles for performance
  const backgroundStyles = useMemo(() => ({
    backgroundImage: `url(${bg})`,
    backgroundSize: "120% auto",
    backgroundPosition: "center",
  }), [bg]);

  // Memoize main content to prevent unnecessary re-renders
  const mainContent = useMemo(() => (
    <section className="bg-transparent">
      <Suspense fallback={<LoadingFallback />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <DealsSection />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <DisplayFirstTenProducts />
      </Suspense>
      {/* Mobile spacing adjustment */}
      <div className="mb-[52px] sm:hidden"></div>
    </section>
  ), []);

  return (
    <section 
      className="bg-purple-300"
      style={backgroundStyles}
    >
      {mainContent}
    </section>
  );
}

HomePage.displayName = 'HomePage';
