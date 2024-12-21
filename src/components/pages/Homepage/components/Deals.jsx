import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { urls } from "../../../../App";
import PropTypes from 'prop-types';

/**
 * DealsSection component displays a list of promotional deals with images and links.
 * Uses memoization for performance optimization
 * 
 * @component
 * @returns {JSX.Element} Grid of deal cards with images and links
 */
function DealsSection() {
    // Memoize deals array to prevent recreation on re-renders
    const deals = useMemo(() => [
        {
            name: "Up to 50% Off",
            image: `${process.env.PUBLIC_URL}/images/livenow-300BY300.gif`,
            url: `${urls.products}?discount=50`
        },
        {
            name: "TV Deals",
            image: `${process.env.PUBLIC_URL}/images/electronics.png`,
            url: `${urls.products}?category=phones %26 tablets`
        },
        {
            name: "New Arrivals",
            image: `${process.env.PUBLIC_URL}/images/new-arrival.gif`,
            url: `${urls.products}?sort=updatedAt`
        },
        {
            name: "Appliances Deals",
            image: `${process.env.PUBLIC_URL}/images/appliances.png`,
            url: `${urls.products}?category=appliances`
        },
        {
            name: "Phones & Tablets Deals",
            image: `${process.env.PUBLIC_URL}/images/phonesandtabletdeals.png`,
            url: `${urls.products}?category=phones %26 tablets`
        }
    ], []);

    // Memoize deals grid rendering
    const dealsGrid = useMemo(() => (
        <div className=" bg-gray-100 grid grid-cols-5 gap-3">
            {deals.map((deal, index) => (
                <Link 
                    key={index}
                    to={deal.url}
                    className="bg-white p-2 rounded-md hover:shadow-md transition-shadow"
                >
                    <img
                        src={deal.image}
                        alt={deal.name}
                        className="w-full h-auto"
                        loading="lazy"
                    />
                    <p className="text-center mt-2 text-sm">{deal.name}</p>
                </Link>
            ))}
        </div>
    ), [deals]);

    return dealsGrid;
}

DealsSection.displayName = 'DealsSection';

export default React.memo(DealsSection);
