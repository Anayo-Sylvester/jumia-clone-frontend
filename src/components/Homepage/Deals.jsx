import React from "react";
import { Link } from "react-router-dom";
import { urls } from "../../App"; // Importing predefined URLs from the App component for use in deal links

/**
 * DealsSection component displays a list of promotional deals with images and links.
 * Each deal includes a name, an image, and a URL for navigation.
 */
export default function DealsSection() {
    // Array of deals, each containing the deal name, image path, and navigation URL
    const deals = [
        {
            name: "Up to 50% Off",
            image: `${process.env.PUBLIC_URL}/images/livenow-300BY300.gif`, // Image for the deal
            url: `${urls.products}?discount=50` // URL to navigate to the products category and gets 50% off products
        },
        {
            name: "TV Deals",
            image: `${process.env.PUBLIC_URL}/images/electronics.png`,
            url: `${urls.category}/phones & tablets`
        },
        {
            name: "New Arrivals",
            image: `${process.env.PUBLIC_URL}/images/new-arrival.gif`,
            url: `${urls.category}?sort=updatedAt` // URL for new arrivals sorted by latest updates
        },
        {
            name: "Appliances Deals",
            image: `${process.env.PUBLIC_URL}/images/appliances.png`,
            url: `${urls.category}/appliances` // URL to navigate to the appliances category
        },
        {
            name: "Phones & Tablets Deals",
            image: `${process.env.PUBLIC_URL}/images/phonesandtabletdeals.png`,
            url: `${urls.category}/phones & tablets`
        }
    ];

    /**
     * DealsStructure component generates the structure for a single deal.
     * @param {string} name - The name of the deal.
     * @param {string} image - The image URL for the deal.
     * @param {string} url - The navigation URL for the deal.
     */
    const DealsStructure = ({ name, image, url }) => (
        <Link to={url} className="min-w-[140px] w-1/3 text-center text-sm hover:shadow-md hover:scale-105">
            <img className="rounded-md" src={image} alt={name} /> {/* Deal image */}
            <p className="my-2">{name}</p> {/* Deal name */}
        </Link>
    );

    // Generate JSX for all deals using the DealsStructure component
    const generateDealHtml = deals.map(({ name, image, url }, index) => (
        <DealsStructure key={index} name={name} image={image} url={url} />
    ));

    // Render the deals section with horizontal scrolling enabled
    return (
        <section 
            className="flex bg-white overscroll-y-none overscroll-contain gap-2 p-2 my-3 overflow-x-auto deals">
            {generateDealHtml}
        </section>
    );
}
