/**
 * Renders a filter bar component for a products page.
 * The filter bar allows users to sort products by name, price, or brand, and filter products by price range and discount.
 * The filter bar state is managed using the URL search parameters, allowing for easy sharing and bookmarking of filtered views.
 *
 * @param {number} minPrice - The minimum price of products to display.
 * @param {number} maxPrice - The maximum price of products to display.
 * @param {function} setFilterState - A function to update the overall filter state.
 * @returns {JSX.Element} - The rendered filter bar component.
 */
import React, { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import ReactSlider from "react-slider";
import "../../../../App.css";

export default function Filter({ minPrice, maxPrice}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterVisible, setFilterVisible] = useState(false); // State to toggle filter container visibility

// Function to manipulate the URL for a specific key-value pair
const manipulateURL = (key, value) => {
  const currentSearchParams = new URLSearchParams(searchParams.toString());

  if (key === "sort") {
    const currentValue = currentSearchParams.get(key) || "";
    const values = currentValue.split(",").filter(Boolean); // Split and remove any empty values

    if (values.includes(value)) {
      // Remove the value if it already exists
      const updatedValues = values.filter((v) => v !== value);
      if (updatedValues.length > 0) {
        // If there are still other values left, update the `sort` parameter
        currentSearchParams.set(key, updatedValues.join(","));
      } else {
        // If no values are left, remove the `sort` parameter entirely
        currentSearchParams.delete(key);
      }
    } else {
      // Add the value, separated by a comma if other values exist
      if (values.length > 0) {
        currentSearchParams.set(key, `${currentValue},${value}`);
      } else {
        currentSearchParams.set(key, value);
      }
    }
  } else if ((key === "priceRange" || key === "discount") && value) {
    // Set value if provided for these keys
    currentSearchParams.set(key, value);
  }

  // Remove the key if the value is empty or null
  if (value === "" || value === null || value === undefined) {
    currentSearchParams.delete(key);
  }

  currentSearchParams.delete('page') // incase the filter doesn't support the current page number
  setSearchParams(currentSearchParams);
};
  
  const isValueInURL = (key, value) => {
    const currentValue = searchParams.get(key);
    if (!currentValue) return false;
    return currentValue.split(",").includes(value);
  };

  const GenerateSortEl = ({ onClick }) => (
    <div className="w-96">
      <h2 className="font-serif">Sort by</h2>
      <div className="grid grid-cols-[20px,1fr] gap-1 p-2">
        {["name", "Price", "brand"].map((field) => (
          <React.Fragment key={field}>
            <input
              type="checkbox"
              id={field}
              checked={isValueInURL("sort", field)}
              onChange={() => onClick("sort", field)}
            />
            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const GeneratePriceRangeEl = () => {
    const [priceRangeArray, setPriceRangeArray] = useState(() => {
      const urlPriceRange = searchParams.get("priceRange");
      if (urlPriceRange) {
        const [min, max] = urlPriceRange.split("-").map(Number);
        return [min || minPrice, max || maxPrice];
      }
      return [minPrice, maxPrice];
    });
      const debouncedSetSearchParams = useCallback(
        (range) => {
          manipulateURL("priceRange", range);
        },
        []
      );
    const handleInputChange = (e, isMin) => {
      const newValue = Number(e.target.value);
      setPriceRangeArray((prev) => {
        const updatedRange = isMin ? [newValue, prev[1]] : [prev[0], newValue];
        debouncedSetSearchParams(updatedRange.join("-"));
        return updatedRange;
      });
    };

    return (
      <div className="flex flex-col">
        <h2>Price Range</h2>
        <input
          type="number"
          name="min"
          id="min"
          value={priceRangeArray[0]}
          className="w-3/4 border-2 border-black"
          onChange={(e) => handleInputChange(e, true)}
        />
        <span className="mx-auto">to</span>
        <input
          type="number"
          name="max"
          id="max"
          value={priceRangeArray[1]}
          className="w-3/4 ml-auto border-2 border-black"
          onChange={(e) => handleInputChange(e, false)}
        />
      </div>
    );
  };

  const GenerateDiscountEl = () => {
    const [discountValue, setDiscountValue] = useState(Number(searchParams.get("discount")) || 0);
  
    // Debounced function to update the URL without impacting slider smoothness
    const debouncedManipulateURL = useCallback(
      (value) => {
        manipulateURL("discount", value);
      },
      [] // Empty dependency array since we're using an inline function
    );
  
    const handleSliderChange = (value) => {
      setDiscountValue(value); // Update state for immediate feedback
      debouncedManipulateURL(value); // Update URL after delay
    };
  
    return (
      <div className="flex flex-col">
        <p>Discount</p>
        <ReactSlider
          className="discount-slider flex items-center h-8"
          thumbClassName="discount-thumb text-center bg-orange border hover:cursor-pointer"
          trackClassName="discount-track h-[3px] bg-black"
          value={discountValue}
          onChange={(value, index) => console.log(`onChange: ${JSON.stringify({ value, index })}`)}
          onAfterChange={(value, index) => handleSliderChange(value, index)} // Corrected this line
                  renderThumb={(props, state) => {
                    const {key, ...restProps} = props
                    return <div key={key} {...restProps}>{`${state.valueNow}%`}</div>
                  }}
        />

      </div>
    );
  };
  


  const handleFilterToggle = () => {
    setFilterVisible((prev) => !prev);
  };

  return (
    <div className="flex  bg-orange pl-3 relative">
      <input type="checkbox" name="filter" id="filter" className="hidden" onChange={handleFilterToggle} />
      <label htmlFor="filter" className="cursor-pointer">
        <img src="/icons/filter.svg" alt="filter icon" className="h-5" />
      </label>

      <div className={`filter-container ${isFilterVisible ? "block" : "hidden"} bg-gray-300 flex flex-col absolute top-full z-10 font-serif min-w-[157px] w-[60%] max-w-[450px]`}>
        <GenerateSortEl onClick={manipulateURL} />
        <GeneratePriceRangeEl />
        <GenerateDiscountEl />
      </div>
    </div>
  );
}
