import React, { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiBaseUrl, urls } from "../../../../App";
import { utility } from "../../../../utils/utils";
import "../../../../App.css";



export default function ProductsCard() {
  // Async function to fetch data
  const fetchProducts = useCallback(async () => {
    const response = await fetch(`${apiBaseUrl}/products?sort=name`);
    if (!response.ok) {
      throw new Error("Failed to fetch products. Please try again later.");
    }
    return response.json();
  }, []);

  // Fetch data with React Query
  const { data: fetchedData, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  // Generate product cards from the fetched data
  const generateProducts = useMemo(() => {
    return (
      fetchedData?.hits?.map(
        ({
          _id,
          name,
          image,
          currentPrice,
          prevPrice,
          initialQuantity,
          AmountOrdered,
        }) => (
          <utility.ProductStructure
            key={_id}
            id={_id}
            discount={utility.calcDiscount(currentPrice, prevPrice)}
            currentPrice={currentPrice}
            prevPrice={prevPrice}
            image={image}
            name={name}
            AmountOrdered={AmountOrdered}
            initialQuantity={initialQuantity}
          />
        )
      ) || " "
    );
  }, [fetchedData]);

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
