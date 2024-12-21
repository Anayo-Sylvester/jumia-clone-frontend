import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from "@tanstack/react-query";
import { apiBaseUrl, urls } from "../../App";
import { utility } from "../../utils/utils";
import LoadingFallback from "../Layouts/LoadingFallback";

// Function to fetch categories data
const fetchCategories = async () => {
    const response = await fetch(`${apiBaseUrl}/products/category`);
    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }
    return response.json();
};

/**
 * Categories Component
 * Displays a list of product categories with links
 * 
 * @component
 * @returns {JSX.Element} Categories list
 */
export default function Categories() {
    // Use React Query to fetch categories data
    const { data: fetchedCategoriesData, isLoading, isError, error } = useQuery({
        queryKey: ["categories"], // Unique key for the query
        queryFn: fetchCategories,
    });

    // Memoize CategoryStructure component
    const CategoryStructure = useMemo(() => {
        const Component = ({ categoryName }) => (
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
        Component.propTypes = {
            categoryName: PropTypes.string.isRequired
        };
        return Component;
    }, []);

    // Memoize categories rendering function
    const renderCategories = useMemo(() => {
        if (isLoading) {
            return <LoadingFallback />;
        }

        if (isError) {
            return <li>{error.message} Please try again.</li>;
        }

        if (fetchedCategoriesData?.hits?.length > 0) {
            return fetchedCategoriesData.hits.map((category, index) => (
                <CategoryStructure key={index} categoryName={category} />
            ));
        }

        return <li>No categories found.</li>;
    }, [isLoading, isError, error, fetchedCategoriesData, CategoryStructure]);

    return (
        <section className="bg-white rounded-sm relative">
            <ul className="h-full flex flex-col rounded-[50px] justify-between">
                {renderCategories}
            </ul>
        </section>
    );
}

Categories.displayName = 'Categories';
