import React, { createContext, useState, useCallback } from "react";
import PropTypes from 'prop-types';

/**
 * Context for managing toast notifications across the application
 * @type {React.Context}
 */
export const ToastContext = createContext();

/**
 * Toast Context Provider Component
 * Manages state and callbacks for toast notifications
 * 
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 */
const ToastContextProvider = ({ children }) => {
  // Initialize toast state
  const [toastObject, setToastObject] = useState({
    success: true,
    message: "",
  });

  // Memoize setData to prevent unnecessary re-renders
  const setData = useCallback((success, message) => {
    setToastObject({ success, message });
  }, []);

  // Memoize closeToast to prevent unnecessary re-renders
  const closeToast = useCallback(() => {
    setToastObject({ success: true, message: "" });
  }, []);

  return (
    <ToastContext.Provider value={{ setData, closeToast, toastObject }}>
      {children}
    </ToastContext.Provider>
  );
};

ToastContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ToastContextProvider.displayName = 'ToastContextProvider';

export default ToastContextProvider;
