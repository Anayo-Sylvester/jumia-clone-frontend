import { useState, useCallback } from 'react';
import { apiBaseUrl } from '../App';

const useAuth = () => {
  const [isLoggedState, setIsLoggedState] = useState(() =>
    JSON.parse(sessionStorage.getItem('isLoggedIn')) || false
  );

  const setIsLoggedIn = (value) => {
    sessionStorage.setItem('isLoggedIn', JSON.stringify(value));
    setIsLoggedState(value);
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem('jumiaCloneToken');
    sessionStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  }, []);

  const checkTokenValidity = useCallback(async () => {
    const token = localStorage.getItem('jumiaCloneToken');

    if (!token) return;

    try {
      const response = await fetch(`${apiBaseUrl}/auth/validate-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok && response.status === 200) {
        setIsLoggedIn(true);
      } else {
        handleLogout();
      }
    } catch (error) {
      console.error('Error validating token:', error);
      handleLogout();
    }
  }, [handleLogout]);

  return { isLoggedState, setIsLoggedIn, handleLogout, checkTokenValidity };
};

export default useAuth;
