import React from 'react';
import { useNavigate } from 'react-router';

const EmptyCartUi = () => {
  const navigate = useNavigate(); // Use the hook here

  const onClick = () => {
    navigate('/'); // Use navigate inside the onClick function
  };

  return (
    <div className="grid items-center h-[84vh]">
      <div className="flex flex-col justify-around items-center h-3/5">
        <img
          src="./images/cart.668e6453.svg"
          alt="cart image"
          className="h-[100px] w-[100px]"
        />
        <p className="font-semibold">Your cart is empty!</p>
        <p>Browse our categories and discover our best deals!</p>
        <button
          type="button"
          onClick={onClick}
          className="font-bold bg-orange shadow-md hover:bg-orange-dark p-3 w-fit rounded-md text-white"
        >
          START SHOPPING
        </button>
      </div>
    </div>
  );
};

export default EmptyCartUi;
