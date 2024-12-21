import React, { useContext, useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { utility } from "../../../../utils/utils";
import { apiBaseUrl } from "../../../../App";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ToastContext } from "../../../Layouts/Toast/Logic/logic";


const ProductStructure = React.memo(({ 
  image,
  name,
  description,
  brand,
  initialQuantity,
  AmountOrdered,
  currentPrice,
  prevPrice,
  isLoggedInState,
  onAddToCart,
  isInCart
}) => {
  const itemsRemaining = useMemo(() => 
    utility.subtract(initialQuantity, AmountOrdered),
    [initialQuantity, AmountOrdered]
  );


  const {setData} = useContext(ToastContext);
  return (
    <div className="productContainer flex flex-col items-center justify-around md:flex-row md:my-auto">
      {/* Product Image with Lazy Loading */}
      <div className="imgContainer">
        <LazyLoadImage
          className="w-5/5 basis-[600px]"
          src={image}
          alt={name}
          loading="lazy"
          effect="blur"
        />
      </div>

      {/* Product Information */}
      <div className="productInfo px-2 flex flex-col gap-3 my-auto">
        <section className="about-product border-b-2">
          <p className="font-semibold">{name}</p>
          <p className="text-sm">{description}</p>
          <p className="text-xs text-blue-800">
            <span className="text-black leading-10">Brand: </span>
            <Link to={`${apiBaseUrl}?brand=${brand}`}>
              {brand} | Similar products from {brand}
            </Link>
          </p>
        </section>

        <section className="price-amount-section">
          <div className="price flex gap-2 items-end">
            <p className="font-bold text-[22px]">{utility.formatMoney(currentPrice)}</p>
            <p className="line-through text-gray-600 leading-[30px]">
              {utility.formatMoney(prevPrice)}
            </p>
            <p className="text-orange-400 bg-orange-100 w-10 self-center text-center">
              {utility.calcDiscount(currentPrice, prevPrice)}
            </p>
          </div>
          <p className="text-sm text-orange-800">
            {itemsRemaining} unit{itemsRemaining > 1 && "s"} left
          </p>
        </section>

        {/* Add to Cart Section */}
        <section className="cart-section">

          <button
            disabled={!isLoggedInState}
            className={`text-white flex py-2 w-3/4 px-4 rounded-md shadow-md ${
              isLoggedInState
                ? `cursor-pointer ${isInCart ? 'bg-red-500 hover:bg-red-800' : 'bg-orange hover:bg-orange-dark'} `
                : "bg-gray-500 cursor-not-allowed"
            }`}
            onClick={async () => {
              const addedSuccessfully = await onAddToCart();
              if (addedSuccessfully) {
                setData(true, isInCart ? "Removed from cart" : "Added to cart");
              } else {
                setData(false,"Failed to update cart!");
              }
            }}
          >
            {isLoggedInState ? (
              isInCart ? (
                <>
                  <img
                    src="/icons/remove-from-cart.svg"
                    alt="cart icon"
                    className="h-6 filter-white"
                  />
                  <p className="mx-auto">Remove from cart</p>
                </>
              ) : (
                <>
                  <img
                    src="/icons/cart-icon.svg"
                    alt="cart icon"
                    className="h-6 filter-white"
                  />
                  <p className="mx-auto">Add to cart</p>
                </>
              )
            ) : (
              <p className="mx-auto">Login to add to cart</p>
            )}
          </button>
        </section>
      </div>
    </div>
  );
});

ProductStructure.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  initialQuantity: PropTypes.number.isRequired,
  AmountOrdered: PropTypes.number.isRequired,
  currentPrice: PropTypes.number.isRequired,
  prevPrice: PropTypes.number.isRequired,
  isLoggedInState: PropTypes.bool.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  isInCart: PropTypes.bool.isRequired
};

ProductStructure.displayName = 'ProductStructure';

export default ProductStructure;