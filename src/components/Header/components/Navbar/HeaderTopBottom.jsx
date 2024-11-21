import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBtmRight from "./HeaderTopBottomRight"; // Import right section of header
import { urls } from "../../../../App"; // Import URL constants

/**
 * Main component for the bottom section of the header.
 * Includes the logo, search bar, and right-side menu.
 * @returns {JSX.Element} The rendered bottom header section.
 */
export default function HeaderBottomSection() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState(''); // Tracks the search input value
    const searchRef = useRef(); // Ref for the search input element
    
    /**
     * Focuses the search input when `searchValue` changes.
     */
    useEffect(() => {
        searchValue && searchRef.current?.focus(); // Fixes the issue of the input losing focus on re-render
    }, [searchValue]);

    /**
     * Renders the logo section of the header.
     * Navigates to the home page when the logo is clicked.
     * @returns {JSX.Element} The logo section of the header.
     */
    const LogoSection = () => {
        return (
            <div 
                className="img-container grid place-content-center min-w-[133.56px] cursor-pointer w-[10%] hidden sm:block" 
                onClick={() => navigate(urls.home)}
            >
                <img className="my-auto" src="/icons/jumia-logo.png" alt="jumia logo" tabIndex={0} />
            </div>
        );
    };

    /**
     * Navigates to the products page with the search query.
     * Clears the search input after navigating.
     */
    const searchProduct = () => {
        navigate(urls.products + `?search=${searchValue}`);
        setSearchValue(""); // Clears the search value from the input
    };

    /**
     * Renders the search bar section of the header.
     * Includes the search input field and button for submitting the search.
     * @returns {JSX.Element} The search bar section.
     */
    const SearchBar = () => {
        return (
            <div className="header-bottom-search-container relative flex w-[90%] sm:w-[54%]">
                <img className="absolute bottom-0 top-0 my-auto ml-2 h-1/2 object-cover" src="/icons/search.svg" alt="search icon" />
                <input 
                    className="text-xs placeholder-black border-solid border-black border-[1px] rounded-[5px] mr-2 pl-[35px] py-2 w-full min-w-[90px]" 
                    value={searchValue}
                    placeholder="Search products, brands and categories" 
                    ref={searchRef}
                    onChange={(e) => {
                        setSearchValue(e.target.value); // Updates the search value on input change
                        searchRef.current?.focus(); // Keeps the focus on the search input
                    }}
                    onKeyDown={(e) => {
                        e.key === "Enter" && searchProduct(); // Initiates the search on Enter key press
                    }}
                />
                <button 
                    className="h-full px-3 hidden bg-orange hover:bg-orange-dark text-xs font-bold text-white rounded-md ml-auto sm:block"
                    onClick={searchProduct}>
                    SEARCH
                </button>
            </div>
        );
    };

    /**
     * Renders the bottom section of the header, including the logo, search bar, and right menu.
     * @returns {JSX.Element} The full bottom header section.
     */
    return (
        <div className="header-bottom horizontal-center py-3 px-4 bg-black sm:bg-white">
            <div className="header-bottom-container flex gap-5 w-full lg:max-w-[950px] xl:max-w-[1184px] sm:justify-between">
                <LogoSection />
                <SearchBar />
                <HeaderBtmRight />
            </div>
        </div>
    );
}
