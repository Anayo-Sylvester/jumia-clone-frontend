import React, { lazy, Suspense, useMemo } from "react";
import LoadingFallback from "../../../Layouts/LoadingFallback";

// Lazy load components
const SlideShow = lazy(() => import("./slideShow"));
const Categories = lazy(() => import("../../Categories"));
const RightInfoSection = lazy(() => import("./RightInfo"));

/**
 * Hero Component
 * Renders the main hero section of the page with a slideshow, categories, and right information
 * Uses lazy loading and memoization for optimal performance
 * 
 * @component
 * @returns {JSX.Element} Hero section with slideshow, categories and info
 */
export default function Hero() {
    // Memoize hero content
    const heroContent = useMemo(() => (
        <section className="bg-black">
            <div className="grid h-full mx-auto md:gap-3 p-3 md:grid-cols-[200px,minmax(20px,720px),1fr]">
                <div className="hidden md:block">
                    <Suspense fallback={<LoadingFallback />}>
                        <Categories />
                    </Suspense>
                </div>
                
                <Suspense fallback={<LoadingFallback />}>
                    <SlideShow />
                </Suspense>
                
                <Suspense fallback={<LoadingFallback />}>
                    <RightInfoSection />
                </Suspense>
            </div>
        </section>
    ), []);

    return heroContent;
}

Hero.displayName = 'Hero';
