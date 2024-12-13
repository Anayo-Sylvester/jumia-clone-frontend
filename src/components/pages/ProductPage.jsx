import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiBaseUrl, responsiveScreenLimits } from "../../App";
import fetchData from "../../scripts/data/fetchData";
import { utility } from "../../utils/utils";

export default function ProductPage(){
  const {id} = useParams();
  const [fetchedData,setFetchedData] = useState("");
  const [isLoading,setLoading] = useState(true);

  const {name} = fetchedData?.hit || "";

  useEffect(() => {
    fetchData(setFetchedData, setLoading, `${apiBaseUrl}/${id}?select=-_id`);
  }, [id]);
  
  useEffect(() => {
    document.title = isLoading ? id : name || "Product Not Found";
  }, [id, isLoading, name]);

  const ProductStructure = ({image,name,description,brand,initialQuantity,AmountOrdered,currentPrice,prevPrice})=>{
    const itemsRemaining = utility.subtract(initialQuantity,AmountOrdered) 
    return (
      <div className="productContainer flex flex-col justify-around  md:flex-row md:my-auto">
        
        <div className="imgContainer  mg:grow">
          <img className="w-full basis-[600px]" src={image} alt={name}/>
        </div>

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
              <p className="line-through text-gray-600 leading-[30px]">{utility.formatMoney(prevPrice)}</p>
              <p className="text-orange-400 bg-orange-100 w-10 self-center text-center">
                {utility.calcDiscount(currentPrice,prevPrice)}
              </p>
            </div>
            <p className="text-sm text-orange-800">{itemsRemaining} unit{itemsRemaining > 1 && "s"} left</p>
          </section>

          <section className="cart-section">
              <button className="text-white flex bg-orange py-2 w-3/4 px-4 rounded-md shadow-md hover:bg-orange-dark">
                <img src="/icons/cart-icon.svg" alt="cart icon" className="h-6 filter-white"/>
                <p className="mx-auto">Add TO CART</p>
              </button>
          </section>
        </div>
      </div>
    );
  }

  const {image,description,brand,initialQuantity,AmountOrdered,currentPrice,prevPrice} = fetchedData?.hit || "";

  return isLoading ? 
    " ":
    fetchedData.hit ? ( 
      <div className={`grid p-5 ${responsiveScreenLimits}`}>
        <ProductStructure
          key={id}
          image={image}
          brand={brand}
          description={description}
          initialQuantity={initialQuantity}
          name={name}
          AmountOrdered={AmountOrdered}
          currentPrice={currentPrice}
          prevPrice={prevPrice}
        />
      </div>
    ) : (
      <div>NO PRODUCT WITH ID:{id} FOUND</div>
    );
}