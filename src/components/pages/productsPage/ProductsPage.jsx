import React from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { apiBaseUrl} from "../../../App";
import { utility } from "../../../utils/utils";
import Filter from "./components/FilterBar";
import Notfound from "../Notfound";
import LoadingFallback from "../../Layouts/LoadingFallback";

// Function to generate the API URL based on search parameters
const generateApiUrl = (searchParams, validParamsQuery) => {
    let queryString = "";
    let categoryString = "";

    // Construct the query string and category path
    searchParams.forEach((value, key) => {
        if (validParamsQuery.includes(key)) {
            if (key !== "category") {
                queryString += `${queryString ? "&" : "?"}${key === "price" ? "currentPrice" : key}=${value}`;
            } else {
                categoryString = `/category/${utility.plusSeparator(value)}`;
            }
        }
    });

    return `${apiBaseUrl}/products${categoryString.trim()}${queryString}`;
};

// Function to handle data fetching
const fetchProductsData = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error('Products not found');
    }
    return res.json();
};

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams(); // Manage query parameters in the URL
    const validParamsQuery = ["category", "page", "search", "sort", "select", "priceRange", "discount", "brand"];
    document.title = 'Products';

    // Generate the API URL based on current search parameters
    const apiUrl = generateApiUrl(searchParams, validParamsQuery);

    // Use React Query to fetch data
    const { data: fetchedData, isLoading, error } = useQuery({
        queryKey: ["products", apiUrl],
        queryFn: () => fetchProductsData(apiUrl),
    });

    // Function to update the page query parameter
    const changePage = (val = "+") => {
        let prevPage = Number(searchParams.get("page") || 1);
        if (val === "+") {
            searchParams.set("page", ++prevPage);
        } else {
            searchParams.set("page", --prevPage);
        }
        setSearchParams(searchParams); // Update the URL
    };

    // Generate product components
    const generateProducts = (hits) => {
        return hits.map((product) => {
            const { _id, name, image, currentPrice, prevPrice, initialQuantity, AmountOrdered } = product;
            return (
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
            );
        });
    };

    let page = fetchedData?.page || 1;
    let nbPages = fetchedData?.nbPages || 1;

    return (
        <div>
            {isLoading ? (
                <LoadingFallback />
            ) : error ? (
                <p>Error loading products: {error.message}</p>
            ) : (
                <>
                    {!fetchedData.hits.length ? (
                        <Notfound message="No products found" />
                    ) : (
                        <>
                            <Filter
                                minPrice={Number(fetchedData.minPrice) / 100}
                                maxPrice={Number(fetchedData.maxPrice) / 100}
                            />
                            <div className="grid grid-cols-2 gap-4 pt-2 px-2 place-items-center md:grid-cols-3 lg:grid-cols-4">
                                {/* Render products */}
                                {generateProducts(fetchedData.hits)}
                            </div>
    
                            {/* Pagination controls */}
                            <div className="w-20 grid mx-auto col-span-2 grid-cols-3 place-items-center md:col-span-3 lg:col-span-4">
                                {/* Previous page button */}
                                <button
                                    disabled={page === 1}
                                    type="button"
                                    className={`${
                                        page !== 1
                                            ? "bg-orange active:bg-orange-dark hover:bg-orange-dark"
                                            : "bg-gray-300"
                                    } h-5 w-4 grid place-content-center text-white cursor-pointer`}
                                    onClick={() => changePage('-')}
                                >
                                    -
                                </button>
    
                                {/* Current page number */}
                                <p>{page}</p>
    
                                {/* Next page button */}
                                <button
                                    type="button"
                                    disabled={page === nbPages}
                                    className={`${
                                        page < nbPages
                                            ? "bg-orange active:bg-orange-dark hover:bg-orange-dark"
                                            : "bg-gray-300"
                                    } h-5 w-4 grid place-content-center text-white cursor-pointer`}
                                    onClick={() => changePage('+')}
                                >
                                    +
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
    
}
