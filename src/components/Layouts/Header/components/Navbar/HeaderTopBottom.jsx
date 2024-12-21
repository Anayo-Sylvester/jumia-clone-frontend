import React, { lazy, useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { urls } from "../../../../../App";
import PropTypes from 'prop-types';

const HeaderBtmRight = lazy(() => import("./HeaderTopBottomRight"));

/**
 * HeaderBottomSection Component
 * Manages the bottom section of the header including search functionality
 *
 * @component
 * @example
 * return (
 *   <HeaderBottomSection />
 * )
 */
function HeaderBottomSection() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState('');
    const searchRef = useRef();

    // Memoize container styles
    const containerStyles = useMemo(() => ({
        outer: "header-bottom horizontal-center py-3 px-4 bg-black sm:bg-white",
        inner: "header-bottom-container flex gap-5 w-full lg:max-w-[950px] xl:max-w-[1184px] sm:justify-between"
    }), []);

    useEffect(() => {
        searchValue && searchRef.current?.focus();
    }, [searchValue]);

    /**
     * Handles search product navigation
     * Memoized to prevent unnecessary re-renders
     */
    const searchProduct = useCallback(() => {
        navigate(urls.products + `?search=${searchValue}`);
        setSearchValue("");
        window.location.reload();
    }, [navigate, searchValue]);

    /**
     * Handles search input changes
     * Memoized to prevent unnecessary re-renders
     */
    const handleSearchChange = useCallback((e) => {
        setSearchValue(e.target.value);
        searchRef.current?.focus();
    }, []);

    /**
     * Handles keyboard events for search
     * Memoized to prevent unnecessary re-renders
     */
    const handleKeyDown = useCallback((e) => {
        e.key === "Enter" && searchProduct();
    }, [searchProduct]);

    const LogoSection = useMemo(() => {
        return (
            <div 
                className="img-container grid place-content-center min-w-[133.56px] cursor-pointer w-[10%] hidden sm:block" 
                onClick={() => navigate(urls.home)}
            >
                <img 
                    loading="lazy" 
                    className="my-auto" 
                    src="/icons/jumia-logo.png" 
                    alt="jumia logo" 
                    tabIndex={0} 
                />
            </div>
        );
    }, [navigate]);

    const SearchBar = useMemo(() => {
        return (
            <div className="header-bottom-search-container relative flex w-[90%] sm:w-[54%]">
                <img 
                    className="absolute bottom-0 top-0 my-auto ml-2 h-1/2 object-cover" 
                    loading="lazy" 
                    src="/icons/search.svg" 
                    alt="search icon" 
                />
                <input 
                    className="text-xs placeholder-black border-solid border-black border-[1px] rounded-[5px] mr-2 pl-[35px] py-2 w-full min-w-[90px]" 
                    value={searchValue}
                    placeholder="Search products, brands and categories" 
                    ref={searchRef}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
                <button 
                    className="h-full px-3 hidden bg-orange hover:bg-orange-dark text-xs font-bold text-white rounded-md ml-auto sm:block"
                    onClick={searchProduct}
                >
                    SEARCH
                </button>
            </div>
        );
    }, [searchValue, handleSearchChange, handleKeyDown, searchProduct]);

    return (
        <div className={containerStyles.outer}>
            <div className={containerStyles.inner}>
                {LogoSection}
                {SearchBar}
                <HeaderBtmRight />
            </div>
        </div>
    );
}

HeaderBottomSection.displayName = 'HeaderBottomSection';

export default React.memo(HeaderBottomSection);
