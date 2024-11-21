import React from "react";
import Hero from "../Homepage/Hero";
import DealsSection from "../Homepage/Deals";
import DisplayFirstTenProducts from "../Homepage/ProductsCard";

export default function HomePage() {
  const bg = `${process.env.PUBLIC_URL}/images/bg-pernod.jpeg`; // Background image for the homepage

    return (
        // Main section with a background image
        <section
            className="bg-purple-300"
            style={{
                backgroundImage: `url(${bg})`, // Set the background image dynamically
                backgroundSize: "120% auto", // Adjust background dimensions
                backgroundPosition: "center", // Center the image
                }}
            >
            {/* Content container for the homepage */}
            <section className="mx-auto bg-transparent lg:max-w-[950px] xl:max-w-[1184px]">
                <Hero /> {/* Hero section for the homepage */}
                <DealsSection /> {/* Section showcasing deals */}
                <DisplayFirstTenProducts /> {/* Section displaying the first 10 products */}

                {/* Spacer to create space above the mobile navigation bar */}
                <div className="mb-[52px] sm:hidden"></div>
            </section>
        </section>
    );
}
