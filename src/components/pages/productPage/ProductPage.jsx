import React, { useContext, useEffect, lazy, Suspense } from "react";
import { useParams } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import { apiBaseUrl } from "../../../App";
import LoadingFallback from "../../Layouts/LoadingFallback";
import { AuthContext } from "../../../contexts/AuthContext";
import ProductStructure from "./Components/PageStructure";
import { useProductLogic } from './Logic/Logic';

const Notfound = lazy(() => import("../Notfound"));

export default function ProductPage() {
  const { id } = useParams();
  const { isLoggedInState } = useContext(AuthContext);
  const { toggleCart, fetchProduct, fetchCartStatus } = useProductLogic(id, isLoggedInState);

  const [productQuery, cartQuery] = useQueries({
    queries: [
      {
        queryKey: ['product', id],
        queryFn: () => fetchProduct(id)
      },
      {
        queryKey: ['cartStatus', id],
        queryFn: () => fetchCartStatus(id),
        enabled: isLoggedInState
      }
    ]
  });

  const isLoading = productQuery.isLoading || (isLoggedInState && cartQuery.isLoading);
  const error = productQuery.error || cartQuery.error;

  const { name } = productQuery.data?.hit || "";

  useEffect(() => {
    document.title = isLoading ? id : name || "Product Not Found";
  }, [id, isLoading, name]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      {isLoading ? (
        <LoadingFallback />
      ) : error ? (
        <Notfound message="Error loading product" />
      ) : productQuery.data?.hit ? (
        <div className="grid p-5">
          <ProductStructure
            {...productQuery.data.hit}
            isLoggedInState={isLoggedInState}
            onAddToCart={() => toggleCart(cartQuery.data)}
            isInCart={cartQuery.data}
            isCheckingCart={cartQuery.isLoading}
          />
        </div>
      ) : (
        <Notfound message="Product not found" />
      )}
    </Suspense>
  );
}

ProductPage.displayName = 'ProductPage';
