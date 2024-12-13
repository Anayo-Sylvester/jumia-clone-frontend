/**
 * Renders a card component that displays a list of products fetched from an API.
 * The component uses the `useQuery` hook from `@tanstack/react-query` to fetch the product data.
 * The fetched data is then mapped to create individual product cards, which are displayed in a scrollable container.
 * The component also includes a header section with a link to the "See All" page.
 */
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiBaseUrl, urls } from "../../../../App";
import { utility } from "../../../../utils/utils";
import "../../../../App.css";

// Async function to fetch data
const fetchProducts = async () => {
  const response = await fetch(`${apiBaseUrl}/products?sort=name`);
  if (!response.ok) {
    throw new Error("Failed to fetch products. Please try again later.");
  }
  return response.json();
};

export default function ProductsCard() {
  // Fetch data with React Query
  const { data: fetchedData, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Generate product cards from the fetched data
  const generateProducts = fetchedData?.hits?.map(
    ({ _id, name, image, currentPrice, prevPrice, initialQuantity, AmountOrdered }) => (
      <utility.ProductStructure
        key={_id}
        id={_id}
        discount={utility.calcDiscount(currentPrice, prevPrice)}
        currentPrice={currentPrice}
        prevPrice={prevPrice}
        image={image}
        name={name}
        amountOrdered={AmountOrdered}
        initialQuantity={initialQuantity}
      />
    )
  ) || " ";

  return (
    <div className="bg-white">
      {/* Header section */}
      <div className="flex justify-between bg-red-600 p-3 font-semibold text-white">
        PRODUCTS
        <Link to={urls.products} className="hover:text-orange-500">
          SEE ALL
        </Link>
      </div>

      {/* Product cards container */}
      <div className="products-card-container flex gap-4 overflow-scroll p-3">
        {isLoading ? (
          <div>Loading...</div> // Show loading indicator while data is being fetched
        ) : isError ? (
          <div className="text-red-600">Error: {error.message}</div> // Display error message if data fetching fails
        ) : generateProducts.length ? (
          <>{generateProducts}</> // Render product cards if data is available
        ) : (
          <div>No content found</div> // Display message if no data is found
        )}
      </div>
    </div>
  );
}
