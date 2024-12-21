import React, { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { ToastContext } from "./Logic/logic";
import PropTypes from 'prop-types';

/**
 * Toast Notification Component
 * Displays success/error messages with auto-dismiss
 * 
 * @component
 * @returns {JSX.Element|null} Toast notification or null if not visible
 */
export const IndexToastUi = () => {
  const { toastObject, closeToast } = useContext(ToastContext);
  const [isVisible, setIsVisible] = useState(false);

  // Memoize close handler
  const handleClose = useCallback(() => {
    setIsVisible(false);
    closeToast();
  }, [closeToast]);

  useEffect(() => {
    if (toastObject.message) {
      setIsVisible(true);
      const timer = setTimeout(handleClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastObject, handleClose]);

  // Memoize toast content
  const toastContent = useMemo(() => (
    <div
      className={`toast4 ${
        toastObject.success ? "bg-green-700" : "bg-red-500"
      } flex py-2 text-white text-2xl justify-center items-center gap-5 px-4`}
    >
      <h1>{toastObject.message}</h1>
      <button
        type="button"
        onClick={handleClose}
        className="hover:filter-orange"
      >
        <img
          src={`${process.env.PUBLIC_URL}/icons/close.svg`}
          alt="close icon"
          className="h-5 filter-white mb-[-4px]"
          loading="lazy"
        />
      </button>
    </div>
  ), [toastObject.success, toastObject.message, handleClose]);

  if (!isVisible) return null;

  return toastContent;
};

IndexToastUi.displayName = 'IndexToastUi';

export default React.memo(IndexToastUi);
