import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';

/**
 * Toast Component
 * Displays success/error notifications with auto-dismiss
 * 
 * @component
 * @param {Object} props
 * @param {boolean} props.success - Success state of notification
 * @param {string} props.message - Message to display
 * @param {boolean} props.isToastVisible - Visibility state
 * @param {Function} props.setIsToastVisible - Visibility state setter
 */
function Toast({ success, message, isToastVisible, setIsToastVisible }) {
  const onClickRef = useRef(null);

  // Memoize close handler
  const handleClose = useCallback(() => {
    setIsToastVisible(false);
  }, [setIsToastVisible]);

  // Memoize toast classes
  const toastClasses = useMemo(() => `
    ${success ? "bg-green-500" : "bg-red-500"}
    ${!isToastVisible && "scale-0"} 
    grid gap-3 grid-cols-[1fr_20px]
    place-items-center fixed top-0 right-0 left-0 w-fit mx-auto my-4 
    p-4 rounded-md text-white shadow-md transition-all duration-300 ease-in-out transform
  `, [success, isToastVisible]);

  useEffect(() => {
    if (typeof success === 'boolean' && message && isToastVisible) {
      setIsToastVisible(true);
      const closeButton = onClickRef.current;
      const ToastTTL = success ? 3000 : 5000;

      closeButton.onclick = handleClose;
      const timer = setTimeout(handleClose, ToastTTL);

      return () => clearTimeout(timer);
    }
  }, [isToastVisible, success, message, handleClose, setIsToastVisible]);

  if (typeof success === 'boolean' && message && isToastVisible) {
    return (
      <div className={toastClasses}>
        <p>{message}</p>
        <button
          type="button"
          className="hover:invert"
          ref={onClickRef}
        >
          <img 
            src="/icons/close-icon.svg" 
            alt="close" 
            className="h-5 filter-white" 
            loading="lazy"
          />
        </button>
      </div>
    );
  }

  return null;
}

Toast.propTypes = {
  success: PropTypes.bool,
  message: PropTypes.string,
  isToastVisible: PropTypes.bool.isRequired,
  setIsToastVisible: PropTypes.func.isRequired
};

Toast.displayName = 'Toast';

export default React.memo(Toast);
