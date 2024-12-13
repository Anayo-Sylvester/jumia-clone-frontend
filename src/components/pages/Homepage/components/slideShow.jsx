import React, { useEffect, useRef, useState, useCallback } from "react";

export default function SlideShow() {
    const imagesData = [
        { id: 0, name: "live-now", url: `${process.env.PUBLIC_URL}/images/slideshow/712x384-livenow-hero.gif` },
        { id: 1, name: "nine_712x384_FS", url: `${process.env.PUBLIC_URL}/images/slideshow/9Nine_712x384_FS.jpg` },
        { id: 2, name: "nine_712x384", url: `${process.env.PUBLIC_URL}/images/slideshow/9Nine_712x384.jpg` },
        { id: 3, name: "shoes", url: `${process.env.PUBLIC_URL}/images/slideshow/712_X_384-shoes.png` },
        { id: 4, name: "weekend_cpr", url: `${process.env.PUBLIC_URL}/images/slideshow/712x384-weeekend-cpr.png` },
        { id: 5, name: "uba", url: `${process.env.PUBLIC_URL}/images/slideshow/712x384-Uba.jpg` },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const frequency = 6000;
    const intervalIdRef = useRef(null);

    // Memoize the changeCurrentIndex function
    const changeCurrentIndex = useCallback((id = undefined) => {
        id === undefined 
            ? setCurrentIndex((prev) => (prev + 1) % imagesData.length)
            : setCurrentIndex(id);
    }, [imagesData.length]);

    useEffect(() => {
        intervalIdRef.current = setInterval(() => {
            changeCurrentIndex();
        }, frequency);

        return () => clearInterval(intervalIdRef.current);
    }, [changeCurrentIndex]);

    // GenerateDots component to render clickable dots for each image in the slideshow
    const GenerateDots = ({ onclick }) => {
        const DotsHTML = imagesData.map((image, index) => (
            <span
                // Apply a background color to indicate the active dot
                className={` w-2 h-2 rounded-[50%] ${index === currentIndex ? 'bg-orange-dark':'bg-slate-400'} cursor-pointer`}
                key={index}
                onClick={() => {
                    // Clear the existing interval to prevent overlapping intervals when a dot is clicked
                    clearInterval(intervalIdRef.current);
                    onclick(index); // Change the slideshow to the clicked dot's index
                    // Restart the interval after dot click to resume automatic slideshow
                    intervalIdRef.current = setInterval(() => {
                        changeCurrentIndex();
                    }, frequency);
                }}
            ></span>
        ));
        
        // Center the dots container at the bottom of the slideshow
        return (
            <div className="flex gap-1 absolute left-0 w-fit right-0 mx-auto bottom-2">
                {DotsHTML}
            </div>
        );
    };

    // Main render: display the current image and the dots navigation below it
    return (
        <div className="slideShow relative mx-auto border-2">
            {/* Render the current image in the slideshow */}
            <img className="h-full rounded-sm" src={imagesData[currentIndex].url} alt={imagesData[currentIndex].name} />

            {/* Render the dots for navigation, passing the changeCurrentIndex function */}
            <GenerateDots onclick={changeCurrentIndex} />
        </div>
    );
}