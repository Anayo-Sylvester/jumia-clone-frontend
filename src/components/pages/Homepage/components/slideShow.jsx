import React, { useEffect, useRef, useState, useCallback } from "react";

/**
 * SlideShow Component
 * Displays an image slideshow with automatic transitions and navigation dots.
 */
export default function SlideShow() {
    // Image data for the slideshow
    const imagesData = [
        { id: 0, name: "live-now", url: `${process.env.PUBLIC_URL}/images/slideshow/712x384-livenow-hero.gif` },
        { id: 1, name: "nine_712x384_FS", url: `${process.env.PUBLIC_URL}/images/slideshow/9Nine_712x384_FS.jpg` },
        { id: 2, name: "nine_712x384", url: `${process.env.PUBLIC_URL}/images/slideshow/9Nine_712x384.jpg` },
        { id: 3, name: "shoes", url: `${process.env.PUBLIC_URL}/images/slideshow/712_X_384-shoes.png` },
        { id: 4, name: "weekend_cpr", url: `${process.env.PUBLIC_URL}/images/slideshow/712x384-weeekend-cpr.png` },
        { id: 5, name: "uba", url: `${process.env.PUBLIC_URL}/images/slideshow/712x384-Uba.jpg` },
    ];

    const [currentIndex, setCurrentIndex] = useState(0); // Current image index
    const frequency = 6000; // Transition frequency in milliseconds
    const intervalIdRef = useRef(null); // Ref to store the interval ID

    /**
     * Function to change the current image index.
     * Advances to the next image automatically or sets a specific index on dot click.
     * @param {number | undefined} id - Optional specific index to set.
     */
    const changeCurrentIndex = useCallback(
        (id = undefined) => {
            id === undefined
                ? setCurrentIndex((prev) => (prev + 1) % imagesData.length) // Advance to next image
                : setCurrentIndex(id); // Set specific index
        },
        [imagesData.length]
    );

    // Set up the interval for automatic image transitions
    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            changeCurrentIndex();
        }, frequency);

        // Clear the interval on component unmount
        return () => clearInterval(intervalIdRef.current);
    }, [changeCurrentIndex]);

    /**
     * GenerateDots Component
     * Renders interactive dots for navigating the slideshow.
     * @param {Object} props - Component props
     * @param {Function} props.onclick - Function to handle dot click.
     */
    const GenerateDots = ({ onclick }) => {
        const dotsHTML = imagesData.map((image, index) => (
            <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                    index === currentIndex ? "bg-orange-dark" : "bg-slate-400"
                } cursor-pointer`}
                onClick={() => {
                    clearInterval(intervalIdRef.current); // Stop the current interval
                    onclick(index); // Change the slideshow to the clicked dot's index
                    intervalIdRef.current = setInterval(() => {
                        changeCurrentIndex(); // Restart automatic slideshow
                    }, frequency);
                }}
            ></span>
        ));

        return (
            <div className="flex gap-1 absolute left-0 w-fit right-0 mx-auto bottom-2">
                {dotsHTML}
            </div>
        );
    };

    // Main render: display the current image and navigation dots
    return (
        <div className="slideShow relative mx-auto border-2">
            {/* Render the current image */}
            <img
                className="h-full rounded-sm"
                src={imagesData[currentIndex].url}
                alt={imagesData[currentIndex].name}
            />

            {/* Render navigation dots */}
            <GenerateDots onclick={changeCurrentIndex} />
        </div>
    );
}
