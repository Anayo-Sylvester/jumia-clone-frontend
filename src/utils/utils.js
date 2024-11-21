import { Link } from "react-router-dom";
import { urls } from "../App";
import React from "react"

class Utilities {
  constructor() {}

  calcDiscount(currentPrice, prevPrice) {
    currentPrice = Number(currentPrice);
    prevPrice = Number(prevPrice);
    return `${Math.round(((currentPrice - prevPrice) / currentPrice) * 100)}%`;
  }
  subtract(a,b){
    return (Number(a) - Number(b))
  }
  convertKoboTONaira(price) {
    return Number(price) / 100;
  }

  formatMoney(money) {
    return `₦${money.toLocaleString()}`
  }

  getAmountRemainingPercent(remaining, total) {
    return `${100 - ((Number(remaining) / Number(total)) * 100).toFixed(0)}%`
  }

  // Arrow function to fix "this" context
  ProductStructure = ({
    discount,
    currentPrice,
    prevPrice,
    image,
    name,
    amountOrdered,
    initialQuantity,
    id,
  }) => {
    const amountRemaining = this.subtract(initialQuantity,amountOrdered)// Calculates remaining stock
    const stop = this.getAmountRemainingPercent(amountRemaining, initialQuantity); // Calculates remaining stock percentage
    return (
      <Link
        to={`${urls.product}/${id}`}
        className="product-card max-w-44 lg:max-w-56 relative rounded-t-lg rounded-b-md hover:shadow-md hover:scale-105"
      >
        {/* Product image */}
        <img
          className="h-2/3 min-w-[176px] lg:min-w-[200px] rounded-lg mx-auto overflow-hidden"
          src={image}
          alt={name}
        />

        {/* Product name */}
        <h3 className="whitespace-nowrap text-ellipsis overflow-hidden">{name}</h3>

        {/* Current price */}
        <p>{this.formatMoney(this.convertKoboTONaira(currentPrice))}</p>

        {/* Previous price (strikethrough) */}
        <p className="text-sm line-through">
          {this.formatMoney(this.convertKoboTONaira(prevPrice))}
        </p>

        {/* Stock availability */}
        <p className="text-[11px]">
          {amountRemaining} item{amountRemaining > 1 ? "s" : ""} left
        </p>

        {/* Discount badge */}
        <p className="absolute top-2 right-2 text-orange-400 bg-orange-100 w-10 text-center">
          {discount}
        </p>

        {/* Stock bar indicator */}
        <div
          className="h-2 w-full rounded-md"
          style={{
            background: `linear-gradient(
              90deg,
              #F68B1E ${stop},
              rgba(201, 208, 209, 1) ${stop}
            )`,
          }}
        ></div>
      </Link>
    );
  };
}

export const utility = new Utilities();
