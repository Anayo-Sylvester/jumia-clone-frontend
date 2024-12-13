/**
 * Renders a list of product categories fetched from the API.
 * 
 * The component uses the `useQuery` hook from `@tanstack/react-query` to fetch the categories data.
 * It displays a loading message while the data is being fetched, an error message if there's an issue,
 * and the list of categories if the data is successfully fetched.
 * 
 * Each category is rendered as a list item with a link to the products page filtered by that category.
 */
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiBaseUrl, urls } from "../../App";
import { utility } from "../../utils/utils";

// Function to fetch categories data
const fetchCategories = async () => {
    const response = await fetch(`${apiBaseUrl}/products/category`);
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    return response.json();
};

export default function Categories() {
  // Use React Query to fetch categories data
    const { data: fetchedCategoriesData, isLoading,isError, error } = useQuery({
    queryKey: ["categories"], // Unique key for the query
    queryFn: fetchCategories,
});

  // Generates the structure for each category
const CategoryStructure = ({ categoryName }) => (
    <li className="flex items-center cursor-pointer p-2 text-[12px] hover:text-orange">
        <Link
            to={`${urls.products}?category=${utility.replaceSpacesWithPercent20(
                encodeURIComponent(categoryName)
            )}`}
        >
            {categoryName}
        </Link>
    </li>
);

// Render categories based on the query state
const renderCategories = () => {
    if (isLoading) {
        return <li>Loading categories...</li>;
    }

    if (isError) {
        return <li>{error.message} Please try again.</li>;
    }

    if (fetchedCategoriesData && fetchedCategoriesData.hits.length > 0) {
        return fetchedCategoriesData.hits.map((category, index) => (
            <CategoryStructure key={index} categoryName={category} />
        ));
    }

    return <li>No categories found.</li>;
};

return (
    <section className="bg-white rounded-sm relative">
        <ul className="h-full flex flex-col rounded-[50px] justify-between">
        {renderCategories()}
        </ul>
    </section>
);
}
