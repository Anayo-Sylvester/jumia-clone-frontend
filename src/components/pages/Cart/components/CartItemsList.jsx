import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import LoadingFallback from '../../../Layouts/LoadingFallback';
import { handleDeleteCartItem } from './Logic/logic';

// Lazy load CartItemStructure component
const CartItemStructure = lazy(() => import('./CartItemsStructure'));

/**
 * CartItemsList Component
 * Renders a list of cart items with lazy loading and error boundaries
 * 
 * @component
 * @param {Object} props
 * @param {Array} props.items - Array of cart items to display
 */
export const CartItemsList = ({ items, setIsConfirmingOrder }) => {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, id) => (
        <Suspense 
          key={item._id} 
          fallback={<LoadingFallback />}
        >
          <CartItemStructure
            {...item.productDetails}
            itemId={item._id}
            productId={item.productId}
            quantity={item.quantity}
            inStock={item.instock}
            isFirstItem={id === 0}
            handleDeleteCartItem={handleDeleteCartItem}
            loading="lazy" // Enable lazy loading for images
          />
        </Suspense>
      ))}
      <button 
        className="bg-orange w-fit py-2 px-4 mx-auto text-white rounded-sm hover:bg-orange-dark"
        onClick={() => setIsConfirmingOrder(prev => !prev)}
        >
        ORDER
      </button>
    </div>
  );
};

// PropTypes validation
CartItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      productDetails: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        currentPrice: PropTypes.number.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
      instock: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setIsConfirmingOrder: PropTypes.func.isRequired
};

export default CartItemsList;
