import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [isLoggedInState, setIsLoggedInState] = useState(false);
  const [tokenChecked, setTokenChecked] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const setIsLoggedIn = useCallback((value) => {
    sessionStorage.setItem('isLoggedIn', JSON.stringify(value));
    setIsLoggedInState(value);
  }, []);

  const handleLogOut = useCallback(() => {
    try {
      localStorage.removeItem('jumiaCloneToken');
      localStorage.removeItem('username');
      sessionStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      queryClient.clear();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, [setIsLoggedIn, navigate, queryClient]);

  const handleLogIn = useCallback(async (response) => {
    try {
      console.log(response.data);
      const { token, username } = await response.data;
      localStorage.setItem('jumiaCloneToken', token);
      localStorage.setItem('username', username);
      setIsLoggedIn(true);
      await queryClient.invalidateQueries(['cart']);
      await queryClient.invalidateQueries(['product']);
      navigate('/');
      window.location.reload();
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }, [setIsLoggedIn]);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('jumiaCloneToken');
      if (!token) {
        setIsLoggedIn(false);
        setTokenChecked(true);
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/validate-token`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setIsLoggedIn(response.ok);
      } catch (error) {
        console.error('Token validation failed:', error);
        setIsLoggedIn(false);
      } finally {
        setTokenChecked(true);
      }
    };

    validateToken();
  }, [setIsLoggedIn]);

  return (
    <AuthContext.Provider value={{
      isLoggedInState,
      setIsLoggedInState: setIsLoggedIn,
      handleLogOut,
      handleLogIn,
      tokenChecked
    }}>
      {tokenChecked ? children : null}
    </AuthContext.Provider>
  );
};