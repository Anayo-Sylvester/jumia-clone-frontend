import React, { useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { urls } from "../../../../App";

/**
 * HeaderTop Component
 * Displays the top section of the header with promotional content and branding
 * 
 * @component
 * @returns {JSX.Element} Rendered header top section
 */
export default function HeaderTop() {
    /**
     * Opens Jumia Pay website in new tab
     * Memoized to prevent unnecessary re-renders
     */
    const openJumiaPayWebsite = useCallback(() => {
        window.open("https://pay.jumia.com.ng/", "_blank");
    }, []);

    // Memoize left section content
    const leftSection = useMemo(() => (
        <div className="flex items-center header-top-left">
            <img className="h-3.5" src="/icons/favicon.svg" alt="jumia favicon" loading="lazy" />
            <Link to={urls.sell} className="text-orange ml-2 text-xs text-left hover:underline font-semibold">
                Sell on Jumia
            </Link>
        </div>
    ), []);

    // Memoize right section content
    const rightSection = useMemo(() => (
        <div className="flex header-top-right">
            <img 
                className="h-2.5 ml-auto mr-2" 
                src="/icons/jumia-logo.png" 
                alt="jumia logo" 
                loading="lazy" 
            />
            <img 
                className="jumia-pay ml-2 md:mr-auto h-3 grayscale cursor-pointer hover:grayscale-0" 
                src={`${process.env.PUBLIC_URL}/icons/jumiaPay-logo.png`}
                alt="jumia pay logo opppppppp"
                onClick={openJumiaPayWebsite}
                loading="lazy"
            />
        </div>
    ), [openJumiaPayWebsite]);

    return (
        <div className="header-top horizontal-center py-1.5 hide bg-gray-300 sm:unhide">
            <div className='mx-auto lg:max-w-[950px] xl:max-w-[1184px] header-top-container grid grid-cols-2 w-full items-center justify-between md:grid-cols-3 px-2'>
                {leftSection}
                {rightSection}
            </div>
        </div>
    );
}

HeaderTop.displayName = 'HeaderTop';
