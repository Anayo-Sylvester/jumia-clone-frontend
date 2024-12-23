import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';

/**
 * UserAuth Hook
 * Manages authentication state and operations
 * 
 * @returns {Object} Authentication state and methods
 * @property {boolean} isLoggedInState - Current login state
 * @property {boolean} tokenChecked - Token validation status
 * @property {Function} handleLogIn - Login handler
 * @property {Function} handleLogout - Logout handler
 * @property {Function} setIsLoggedIn - Login state setter
 */
const UserAuth = () => {
  const [tokenChecked, setTokenChecked] = useState(false);
  const [isLoggedInState, setIsLoggedInState] = useState(() =>
    JSON.parse(sessionStorage.getItem('isLoggedIn')) || false
  );
  const navigate = useNavigate();

  // Effect for token validation
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('jumiaCloneToken');
        if (!token) {
          setIsLoggedInState(false);
          return;
        }
        // Token validation logic here
        setTokenChecked(true);
      } catch (error) {
        console.error('Token validation failed:', error);
        setIsLoggedInState(false);
      }
    };

    checkToken();
    // Return empty function for cleanup
    return () => {};
  }, []);

  // Memoize login state setter
  const setIsLoggedIn = useCallback((value) => {
    sessionStorage.setItem('isLoggedIn', JSON.stringify(value));
    setIsLoggedInState(value);
  }, []);

  // Memoize logout handler
  const handleLogout = useCallback(() => {
    localStorage.removeItem('jumiaCloneToken');
    localStorage.removeItem('username');
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  // Memoize login handler
  const handleLogIn = useCallback(async (response) => {
    try {
      const { token, username } = response.data;
      
      // Save auth data
      localStorage.setItem('jumiaCloneToken', token);
      localStorage.setItem('username', username);
      setIsLoggedIn(true);
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    let isMounted = true;

    const validateToken = async () => {
      const token = localStorage.getItem('jumiaCloneToken');
      const username = localStorage.getItem('username');

      try {
        if ((sessionStorage.getItem('isLoggedIn') !== 'true') && token) {
          const isTokenValid = await fetch(`${process.env.REACT_APP_API_URL}/auth/validate-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          if (isMounted) {
            setIsLoggedIn(isTokenValid.status === 200);
          }
        } else if (sessionStorage.getItem('isLoggedIn') === 'true' && token && username) {
          if (isMounted) {
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        if (isMounted) {
          setIsLoggedIn(false);
        }
      }
    };

    validateToken();

    return () => {
      isMounted = false;
    };
  }, [setIsLoggedIn]);

  // Memoize auth state object
  const authState = useMemo(() => ({
    isLoggedInState,
    tokenChecked,
    handleLogIn,
    handleLogout,
    setIsLoggedIn
  }), [isLoggedInState, tokenChecked, handleLogIn, handleLogout, setIsLoggedIn]);

  return authState;
};

export default UserAuth;
