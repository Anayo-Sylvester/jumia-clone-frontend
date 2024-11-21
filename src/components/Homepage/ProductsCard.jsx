import React, { useEffect, useRef, useState } from "react";
import fetchData from "../../scripts/data/fetchData";
import { apiBaseUrl, urls } from "../../App";
import { utility } from "../../utils/utils";

import "../../App.css";
import { Link } from "react-router-dom";

/**
 * Displays a grid of product cards, fetching the first 10 products sorted alphabetically by name.
 * @returns {JSX.Element} The rendered product cards component.
 */
export default function ProductsCard() {
  const firstTenDataRef = useRef(null); // Stores fetched product data
  const [isLoading, setLoading] = useState(true); // Tracks loading state

  /**
   * Fetches the first 10 products sorted alphabetically on component mount.
   * Uses the `fetchData` function to retrieve data and update the component's state.
   */
  useEffect(() => {
    fetchData(firstTenDataRef, setLoading, `${apiBaseUrl}?sort=name`);
  }, []);

  /**
   * Generates product cards for the first 10 items in the fetched data.
   * @returns {JSX.Element[]} An array of product card components.
   */
  const generateProducts =
    firstTenDataRef.current?.hits?.map(
      ({ _id, name, image, currentPrice, prevPrice, initialQuantity, AmountOrdered }, index) => {
        const amountRemaining = Number(initialQuantity) - Number(AmountOrdered); // Calculates remaining stock

        return (
          <utility.ProductStructure
            key={_id || index} // Use `_id` for stable keys, fallback to `index`
            id={_id}
            discount={utility.calcDiscount(currentPrice, prevPrice)}
            currentPrice={currentPrice}
            prevPrice={prevPrice}
            image={image}
            name={name}
            amountRemaining={amountRemaining}
            initialQuantity={initialQuantity}
          />
        );
      }
    ) || [];

  return (
    <div className="bg-white">
      {/* Header with title and link to all products */}
      <div className="flex justify-between bg-red-600 p-3 font-semibold text-white">
        PRODUCTS
        <Link to={urls.products} className="hover:text-orange-500">
          SEE ALL
        </Link>
      </div>

      {/* Product list container */}
      <div className="products-card-container flex gap-4 overflow-scroll p-3">
        {isLoading ? (
          <div>Loading...</div> // Show loading indicator while fetching data
        ) : generateProducts.length ? (
          <>{generateProducts}</> // Render product cards once data is loaded
        ) : (
          <div>No content found</div>
        )}
      </div>
    </div>
  );
}
