import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiBaseUrl } from '../../../../App';

const fetchProduct = async (id) => {
  const response = await fetch(`${apiBaseUrl}/products/${id}?select=-_id`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
};

const fetchCartStatus = async (id) => {
  const response = await fetch(
`${process.env.REACT_APP_API_URL}/cart/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jumiaCloneToken')}`
      }
    }
  );
  return response.status === 204;
};

export const useProductLogic = (id, isLoggedInState) => {
  const queryClient = useQueryClient();

  const toggleCart = useCallback(async (isInCart) => {
    if (!isLoggedInState) return false;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/cart${isInCart ? `/${id}`:''}`,
        {
          method: isInCart ? 'DELETE' : 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jumiaCloneToken')}`
          },
          // Only include body for PUT request
          ...(!isInCart &&  {
            body: JSON.stringify({
              productId: id,
              quantity: 1
            })
          })
        }
      );

      // Check specific response statuses
      if ((isInCart && response.status !== 204) || 
          (!isInCart && response.status !== 201)) {
        console.log({response,error:'error',isInCart})
      }

      // Invalidate queries
      await Promise.all([
        queryClient.invalidateQueries(['cartStatus', id]),
        queryClient.invalidateQueries(['cart'])
      ]);

      return true;
    } catch (error) {
      console.error('Cart operation failed:', error);
      return false;
    }
  }, [id, isLoggedInState, queryClient]);

  return { 
    toggleCart,
    fetchProduct,
    fetchCartStatus
  };
};