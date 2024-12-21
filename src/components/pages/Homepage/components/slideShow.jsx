import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

/**
 * SlideShow Component
 * Displays an image slideshow with automatic transitions and navigation dots.
 */
export default function SlideShow() {
    const [currentIndex, setCurrentIndex] = useState(0); // Current image index
    const intervalIdRef = useRef(null); // Ref to store the interval ID
    const frequency = 5000; // Transition frequency in milliseconds

    // Memoize images data
    const imagesData = useMemo(() => [
        { id: 0, name: "live-now", url: `${process.env.PUBLIC_URL}/images/slideshow/712x384-livenow-hero.gif` },
        { id: 1, name: "nine_712x384_FS", url: `${process.env.PUBLIC_URL}/images/slideshow/9Nine_712x384_FS.jpg` },
        { id: 2, name: "nine_712x384", url: `${process.env.PUBLIC_URL}/images/slideshow/9Nine_712x384.jpg` },
        { id: 3, name: "shoes", url: `${process.env.PUBLIC_URL}/images/slideshow/712_X_384-shoes.png` },
        { id: 4, name: "weekend_cpr", url: `${process.env.PUBLIC_URL}/images/slideshow/712x384-weeekend-cpr.png` },
        { id: 5, name: "uba", url: `${process.env.PUBLIC_URL}/images/slideshow/712x384-Uba.jpg` },
    ], []);

    // Memoize index change handler
    const changeCurrentIndex = useCallback(() => {
        setCurrentIndex(prev => 
            prev === imagesData.length - 1 ? 0 : prev + 1
        );
    }, [imagesData.length]);

    useEffect(() => {
        intervalIdRef.current = setInterval(changeCurrentIndex, frequency);
        return () => clearInterval(intervalIdRef.current);
    }, [changeCurrentIndex]);

    // Memoize dot click handler
    const handleDotClick = useCallback((index) => {
        clearInterval(intervalIdRef.current);
        setCurrentIndex(index);
        intervalIdRef.current = setInterval(changeCurrentIndex, frequency);
    }, [changeCurrentIndex]);

    // Memoize dots generation
    const dotsHTML = useMemo(() => 
        imagesData.map((_, index) => (
            <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-orange-dark" : "bg-slate-400"
                } cursor-pointer`}
                onClick={() => handleDotClick(index)}
            ></span>
        )), [currentIndex, handleDotClick, imagesData]);

    const GenerateDots = () => (
        <div className="flex gap-1 absolute left-0 w-fit right-0 mx-auto bottom-2">
            {dotsHTML}
        </div>
    );

    return (
        <div className="slideShow relative mx-auto border-2">
            <img
                className="h-full rounded-sm"
                src={imagesData[currentIndex].url}
                alt={imagesData[currentIndex].name}
                loading="lazy"
            />
            <GenerateDots />
        </div>
    );
}

SlideShow.displayName = 'SlideShow';
