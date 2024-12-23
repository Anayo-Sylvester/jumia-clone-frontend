import React, { forwardRef, useContext, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ToastContext } from '../../../Layouts/Toast/Logic/logic';
import { useQueryClient } from '@tanstack/react-query';
import { enableCartButtons, handleUpdateCartItem } from './Logic/logic';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { utility } from '../../../../utils/utils';

/**
 * CartItemStructure Component
 * Renders individual cart items with quantity controls and delete functionality
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.name - Product name
 * @param {number} props.quantity - Product quantity
 * @param {string} props.image - Product image URL
 * @param {number} props.price - Product price
 * @param {boolean} props.inStock - Product stock status
 * @param {string} props.itemId - Product ID
 * @param {boolean} props.isFirstItem - Whether this is the first item
 * @param {Function} props.handleDeleteCartItem - Delete item handler
 */
const CartItemStructure = forwardRef(({ name, quantity, image, price, inStock, itemId, productId, isFirstItem, handleDeleteCartItem }, ref) => {
  const {setData} = useContext(ToastContext);
  const queryClient = useQueryClient();

  const getErrorMessage = useCallback((error) => {
    if (error.response) return error.response.data.message;
    if (error.message) return error.message;
    return "An unexpected error occurred";
  }, []);


  const itemClasses = useMemo(() => 
    `${!inStock ? 'bg-gray-400' : 'bg-gray-100'} ${isFirstItem ? 'rounded-b-lg' : 'rounded-lg'} cart-item p-3 grid gap-2`,
    [inStock, isFirstItem]
  );

  return (
    <div ref={ref} className={itemClasses}>
      <div className="flex  items-center gap-4 cart-item-details">
        <LazyLoadImage
          src={image}
          alt={name}
          className="h-20 rounded-md"
          effect="blur"
          loading="lazy"
        />
        <div className="leading-10">
          <h2 className="max-w-[83vw] text-ellipsis overflow-hidden">{name}</h2>
          {inStock && <p className="text-sm">In Stock</p>}
        </div>

        {inStock && 
          <div className="price font-semibold text-[22px] ml-auto">
            <p>₦ {(utility.convertKoboTONaira(price) * quantity).toLocaleString()}</p>
          </div>
        }

      </div>

      <div className="cart-item-details-footer flex justify-between items-end">
        <button 
          className={`flex gap-2 remove-button ${!inStock && 'filter-white'} hover:filter-orange`}
          onClick={async(e)=>{
            try {
              const isDeleted = await handleDeleteCartItem(productId);
              if (isDeleted) {
                setData(true, "Successfully deleted item");
                queryClient.invalidateQueries(['cart']); // Trigger cart refetch
              } else {
                setData(false, "Failed to delete item");
                enableCartButtons();
              }
            } catch (error) {
              setData(false, getErrorMessage(error));
              enableCartButtons();
            }
          }}
        >
          <img src="./icons/delete.svg" alt="delete icon" className="h-6" loading="lazy" />
          Remove
        </button>
        
        {inStock && 
          <div className="flex items-center gap-2">
            <button 
              type="button" 
              className={`p-2 rounded-md  ${quantity > 1 ? 'bg-orange' : 'bg-gray-300'}`}
              disabled={quantity === 1}
              onClick={async (e) => {
                try {
                  const isUpdated = await handleUpdateCartItem(e, itemId, quantity - 1);
                  if (isUpdated) {
                    setData(true, "Quantity updated successfully");
                    queryClient.invalidateQueries(['cart']);// Trigger cart refetch
                  } else {
                    setData(false, "Failed to update quantity");
                    enableCartButtons();
                  }
                } catch (error) {
                  setData(false, getErrorMessage(error));
                  enableCartButtons();
                }
              }}
            >
              <img className="h-5" src="./icons/minus.svg" loading="lazy" alt="" />
            </button>
            
            <p>{quantity}</p>
            
            <button 
              type="button" 
              className="bg-orange p-2 rounded-md"
              onClick={async (e) => {
                try {
                  const isUpdated = await handleUpdateCartItem(e, itemId, quantity + 1);
                  if (isUpdated) {
                    setData(true, "Quantity updated successfully");
                    queryClient.invalidateQueries(['cart']);// Trigger cart refetch
                  } else {
                    setData(false, "Failed to update quantity");
                    enableCartButtons();
                  }
                } catch (error) {
                  setData(false, getErrorMessage(error));
                  enableCartButtons();
                }
              }}
            >
              <img className="h-5" src="./icons/plus.svg" loading="lazy" alt="" />
            </button>
          </div>
        }
      </div>
    </div>
  );
});

CartItemStructure.propTypes = {
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  inStock: PropTypes.bool.isRequired,
  itemId: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  isFirstItem: PropTypes.bool.isRequired,
  handleDeleteCartItem: PropTypes.func.isRequired,
};

CartItemStructure.displayName = 'CartItemStructure';

export default React.memo(CartItemStructure);
