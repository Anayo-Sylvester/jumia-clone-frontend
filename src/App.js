import './App.css'
import React, { lazy, Suspense } from 'react';

export const apiBaseUrl = process.env.REACT_APP_API_URL;
const RoutesEl = lazy(() => import('./routes/Routes'));

export const urls = {
  cart: `${process.env.PUBLIC_URL}/cart`,
  home: `${process.env.PUBLIC_URL}/`,
  notfound: `${process.env.PUBLIC_URL}/*`,
  help: `${process.env.PUBLIC_URL}/help`,
  account: `${process.env.PUBLIC_URL}/account`,
  sell: `${process.env.PUBLIC_URL}/sell`,
  category: `${process.env.PUBLIC_URL}/categories`,
  feed: `${process.env.PUBLIC_URL}/feed`,
  products: `${process.env.PUBLIC_URL}/products`,
  product: `${process.env.PUBLIC_URL}/product`,
  login: `${process.env.PUBLIC_URL}/login`,
  register: `${process.env.PUBLIC_URL}/register`
}

export const responsiveScreenLimits = `mx-auto lg:max-w-[950px] xl:max-w-[1184px]`;

export function App({isLoggedIn, setIsLoggedIn}) {
  return (
    <Suspense fallback={<div></div>}>
      <RoutesEl {...{isLoggedIn, setIsLoggedIn}} />
    </Suspense>
  );
}