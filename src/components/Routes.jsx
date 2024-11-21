import React, { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Notfound from "./pages/Notfound";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import ProductsPage from "./pages/ProductsPage";


const routes = [
    {
        path: `${process.env.PUBLIC_URL}/*`,
        element: <Notfound/>
    },
    {
        path: `${process.env.PUBLIC_URL}/`,
        element: <HomePage/>
    },
    {
        path: `${process.env.PUBLIC_URL}/cart`,
        element: <Cart/>
    },
    {
        path: `${process.env.PUBLIC_URL}/products`,
        element: <ProductsPage/>
    },
    {
        path: `${process.env.PUBLIC_URL}/product/:id`,
        element: <ProductPage/>
    }
]


const generateRouteElement = routes.map((route,id)=>(
    <Route key = {id} path={route.path} element = {route.element}/>
))

const RoutesEl = () =>(
    <Routes>
        {generateRouteElement},
    </Routes>
)
export default RoutesEl;