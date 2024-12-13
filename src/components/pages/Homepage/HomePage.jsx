import React, { useEffect } from "react";
import Hero from "./components/Hero";
import DealsSection from "./components/Deals";
import DisplayFirstTenProducts from "./components/ProductsCard";
import { responsiveScreenLimits } from "../../../App";

export default function HomePage() {
  const bg = `${process.env.PUBLIC_URL}/images/bg-pernod.jpeg`; // Background image for the homepage
    useEffect(()=>{
        document.title = `Jumia Clone - Your One-stop Shop for Everything`
    },[])

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
            <section className={`bg-transparent ${responsiveScreenLimits}`}>
                <Hero /> {/* Hero section for the homepage */}
                <DealsSection /> {/* Section showcasing deals */}
                <DisplayFirstTenProducts /> {/* Section displaying the first 10 products */}

                {/* Spacer to create space above the mobile navigation bar */}
                <div className="mb-[52px] sm:hidden"></div>
            </section>
        </section>
    );
}
