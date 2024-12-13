import React, { useEffect, useRef, useState } from "react";

export default function Toast({ success, message, isToastVisible,setIsToastVisible }) {
  const onClickRef = useRef(null);

  useEffect(() => {
    if (typeof success === 'boolean' && message && isToastVisible) {
      setIsToastVisible(true); // Reset visibility when new props are received
      const closeButton = onClickRef.current;

      const ToastTTL = success ? 3000 : 5000;
      closeButton.onclick = () => {
        clearTimeout(timer);
        setIsToastVisible(false);
      };
      const timer = setTimeout(() => {
        success = '';
        message = '';
        setIsToastVisible(false);
      }, ToastTTL);

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when success or message changes
    }
  }, [isToastVisible]);

  if (typeof success === 'boolean' && message && isToastVisible) {
    return (
      <div
        className={`${
          success ? "bg-green-500" : "bg-red-500"
        } ${!isToastVisible && "scale-0"} 
        grid gap-3 grid-cols-[1fr_20px]
        place-items-center fixed top-0 right-0 left-0 w-fit mx-auto my-4 
        p-4 rounded-md shadow-md transition-all duration-300 ease-in-out transform`}
      >
        <p>{message}</p>
        <button
          type="button"
          className="hover:invert"
          ref={onClickRef}
        >
          <img
            src="./icons/close-icon.svg"
            className="h-5 cursor-pointer"
            alt="close"
          />
        </button>
      </div>
    );
  }
}
