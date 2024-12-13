import React from "react";
import { Link } from "react-router-dom";
import { responsiveScreenLimits, urls } from "../../../../App"; // Import URL constants

/**
 * Component for the top section of the header.
 * Displays promotional links, logo, and branding.
 * @returns {JSX.Element} The top section of the header.
 */
export default function HeaderTop() {

    /**
     * Opens the Jumia Pay website in a new browser tab.
     */
    const openJumiaPayWebsite = () => {
        window.open("https://pay.jumia.com.ng/", "_blank");
    };

    return (
        // Top header section for promotional links and branding, hidden on small screens
        <div className="header-top horizontal-center py-1.5 hide bg-gray-300 sm:unhide">
            <div className={`header-top-container grid grid-cols-2 w-full items-center justify-between ${responsiveScreenLimits} md:grid-cols-3 px-2`}>

                {/* Left section with favicon and 'Sell on Jumia' link */}
                <div className="flex items-center header-top-left">
                    <img className="h-3.5" src="/icons/favicon.svg" alt="jumia favicon" />
                    <Link to={urls.sell} className="text-orange ml-2 text-xs text-left hover:underline font-semibold">
                        Sell on Jumia
                    </Link>
                </div>

                {/* Right section with Jumia logo and Jumia Pay logo */}
                <div className="flex header-top-right">
                    <img className="h-2.5 ml-auto mr-2" src="/icons/jumia-logo.png" alt="jumia logo" />
                    <img 
                        className="jumia-pay ml-2 md:mr-auto h-3 grayscale cursor-pointer hover:grayscale-0" 
                        src="/icons/jumiaPay-logo.png" 
                        alt="jumia pay logo" 
                        onClick={openJumiaPayWebsite} 
                    />
                </div>
            </div>
        </div>
    );
}
