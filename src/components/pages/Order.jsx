import React, { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../contexts/AuthContext';
import { utility } from '../../utils/utils';
import LoadingFallback from '../Layouts/LoadingFallback';
import { AuthenticationPage } from '../pages/Authentication/Authentication';
import EmptyCartUi from '../pages/Cart/components/EmptyCartPage';

const OrderCard = ({ order }) => {
  const { shippingAddress, items, totalAmount, createdAt } = order;
  const date = new Date(createdAt).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="border-b pb-2 mb-4">
        <h3 className="font-semibold">Order Date: {date}</h3>
        <p className="text-gray-600">
          Total Amount: {utility.formatMoney(utility.convertKoboTONaira(totalAmount))}
        </p>
      </div>

      <div className="mb-4">
        <h4 className="font-medium mb-2">Shipping Address:</h4>
        <p className="text-gray-600">{shippingAddress.street}</p>
        <p className="text-gray-600">{shippingAddress.city}, {shippingAddress.state}</p>
      </div>

      <div>
        <h4 className="font-medium mb-2">Items:</h4>
        <div className="grid gap-4">
          {items.map((item) => (
            <div key={item._id} className="flex items-center gap-4 border-b pb-2">
              <img
                src={item._doc.productId.image}
                alt={item._doc.productId.name}
                className="w-20 h-20 object-cover rounded"
                loading="lazy"
              />
              <div className="flex-1">
                <h5 className="font-medium">{item._doc.productId.name}</h5>
                <p className="text-gray-600">
                  Quantity: {item._doc.quantity} x {utility.formatMoney(utility.convertKoboTONaira(item._doc.price))}
                </p>
                <p className="text-orange font-medium">
                  Subtotal: {utility.formatMoney(utility.convertKoboTONaira(item._doc.price * item._doc.quantity))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OrderUI = () => {
  const { isLoggedInState } = useContext(AuthContext);

  // Fetch orders using React Query
  const { data: orderData, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/order`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jumiaCloneToken')}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      return response.json();
    },
    enabled: isLoggedInState
  });

  // Redirect to login if not authenticated
  if (!isLoggedInState) {
    return <AuthenticationPage action="login" />;
  }

  // Show loading state
  if (isLoading) {
    return <LoadingFallback />;
  }

  // Show error state
  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error.message}</div>;
  }

  // Show empty state
  if (!orderData || !orderData.nbHits) {
    return <EmptyCartUi />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">My Orders ({orderData.nbHits})</h1>
      <div className="space-y-6">
        {orderData.Hits.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderUI;