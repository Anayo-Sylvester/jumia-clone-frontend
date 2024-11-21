import './App.css'
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage'; // Adjust the path as necessary
import RoutesEl from './components/Routes';

export const apiBaseUrl = `http://localhost:5000/api/v1/products`
// loading animation
//category icons
export const urls = {
  cart: `${process.env.PUBLIC_URL}/cart`,
  home: `${process.env.PUBLIC_URL}/`,
  notfound: `${process.env.PUBLIC_URL}/*`,
  help: `${process.env.PUBLIC_URL}/help`,
  account: `${process.env.PUBLIC_URL}/account`,
  sell: `${process.env.PUBLIC_URL}/sell`,
  category: `${process.env.PUBLIC_URL}/category`,
  feed: `${process.env.PUBLIC_URL}/feed`,
  products: `${process.env.PUBLIC_URL}/products`,
  product: `${process.env.PUBLIC_URL}/product`
}
export const responsiveScreenLimits = `mx-auto lg:max-w-[950px] xl:max-w-[1184px]`;
export function App() {
  console.log('App')
  return (
    <>
      <RoutesEl/>
    </>
  );
}

