import React, { useContext, useEffect, useState } from "react"; 
import { AuthenticationPage } from "../Authentication/Authentication";
import { apiBaseUrl } from "../../../App";
import { useQuery } from "@tanstack/react-query";
import EmptyCartUi from "./components/EmptyCartPage";
import { AuthContext } from "../../../contexts/AuthContext";
import { utility } from "../../../utils/utils";
import { CartItemsList } from './components/CartItemsList';
import { fetchCart } from "./components/Logic/logic";
import LoadingFallback from "../../Layouts/LoadingFallback";
import OrderConfirmationUi from "./components/OrderConfirmation";


export default function CartPage() {
  const [isConfirmingOrder, setIsConfirmingOrder] = useState(false);
  const { isLoggedInState } = useContext(AuthContext);
  const { data: cartJson, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: ()=>fetchCart(),
    enabled: isLoggedInState,
  });
  useEffect(() => {
    // Set the window title to "cart"
    window.document.title = "cart";
  }, []);

  // Redirect to login if the user is not authenticated
  if (!isLoggedInState) {
    return <AuthenticationPage action="login" />;
  }

  // Display loading state
  if (isLoading) {
    return <LoadingFallback/>;
  }

  // Handle errors
  if (error) {
    return <p>Error loading your cart: {error.message}</p>;
  }

  // Display empty cart UI if no items are found
  return cartJson.nbHits === 0 ? (
    <EmptyCartUi />
  ) : !isConfirmingOrder ? (
    <div>
      <h1 className="bg-gray-200 p-4 text-lg font-semibold">
        Cart ({cartJson.nbHits})
      </h1>
      <div id="cartItemsContainer">
        <CartItemsList items={cartJson.Hits || []} setIsConfirmingOrder={setIsConfirmingOrder} />
      </div>
    </div>
  ) : (
    <OrderConfirmationUi data={cartJson}/>
  )
}
