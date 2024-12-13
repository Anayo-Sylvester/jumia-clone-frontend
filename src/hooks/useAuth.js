import { useState, useCallback } from 'react';
import { apiBaseUrl } from '../App';

/**
 * Custom hook to manage authentication state and actions.
 */
const useAuth = () => {
  // State to track the login status, initialized from sessionStorage
  const [isLoggedState, setIsLoggedState] = useState(() =>
    JSON.parse(sessionStorage.getItem('isLoggedIn')) || false
  );

  /**
   * Updates the login state and persists it in sessionStorage.
   * @param {boolean} value - New login state.
   */
  const setIsLoggedIn = (value) => {
    sessionStorage.setItem('isLoggedIn', JSON.stringify(value));
    setIsLoggedState(value);
  };

  /**
   * Logs the user out by clearing token and login state.
   */
  const handleLogout = useCallback(() => {
    localStorage.removeItem('jumiaCloneToken'); // Remove token from localStorage
    sessionStorage.removeItem('isLoggedIn'); // Clear login state from sessionStorage
    setIsLoggedIn(false); // Update state
  }, []);

  /**
   * Checks the validity of the stored token by calling the API.
   * If the token is invalid or an error occurs, logs the user out.
   */
  const checkTokenValidity = useCallback(async () => {
    const token = localStorage.getItem('jumiaCloneToken'); // Retrieve token from localStorage

    if (!token) return; // Exit if no token is found

    try {
      const response = await fetch(`${apiBaseUrl}/auth/validate-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in the request headers
        },
      });

      if (response.ok && response.status === 200) {
        setIsLoggedIn(true); // Set login state to true if token is valid
      } else {
        handleLogout(); // Log out if token is invalid
      }
    } catch (error) {
      console.error('Error validating token:', error); // Log any errors
      handleLogout(); // Log out on error
    }
  }, [handleLogout]);

  // Return the authentication-related state and actions
  return { isLoggedState, setIsLoggedIn, handleLogout, checkTokenValidity };
};

export default useAuth;
