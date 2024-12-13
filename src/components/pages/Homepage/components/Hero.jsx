import React from "react";
import SlideShow from "./slideShow"; // Component for displaying the main slideshow
import Categories from "../../Categories"; // Component for displaying category links or menu
import RightInfoSection from "./RightInfo"; // Component for additional information on the right

/**
 * Hero Component
 * Renders the main hero section of the page with a slideshow, categories, and a right information section.
 */
export default function Hero() {
    return (
        <section className="bg-black">
            {/* Main container for the hero section */}
            <div className="grid h-full mx-auto md:gap-3 p-3 md:grid-cols-[200px,minmax(20px,720px),1fr]">
                
                {/* Categories Section - Visible only on medium screens and above */}
                <div className="hidden md:block">
                    <Categories />
                </div>
                
                {/* Slideshow Section */}
                <SlideShow />
                
                {/* Right Information Section */}
                <RightInfoSection />
            </div>
        </section>
    );
}
