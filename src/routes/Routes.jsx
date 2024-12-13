import React, { Route, Routes } from "react-router";
import HomePage from "../components/pages/Homepage/HomePage";
import Notfound from "../components/pages/Notfound";
import Cart from "../components/pages/Cart";
import ProductPage from "../components/pages/ProductPage";
import ProductsPage from "../components/pages/productsPage/ProductsPage";
import Categories from "../components/pages/Categories";
import { AuthenticationPage } from "../components/pages/Authentication/Authentication";

const RoutesEl = ({isLoggedIn, setIsLoggedIn}) => {
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
            element: <ProductPage {...{isLoggedIn}} />
        },
        {
            path: `${process.env.PUBLIC_URL}/categories`,
            element: <Categories/>
        },
        {
            path: `${process.env.PUBLIC_URL}/login`,
            element: <AuthenticationPage {...{isLoggedIn, setIsLoggedIn}}/>
        },
        {
            path: `${process.env.PUBLIC_URL}/register`,
            element: <AuthenticationPage {...{isLoggedIn, setIsLoggedIn}}/>
        }        
    ]

    const generateRouteElement = routes.map((route,id)=>(
        <Route key={id} path={route.path} element={route.element}/>
    ))

    return (
        <Routes>
            {generateRouteElement}
        </Routes>
    )
}

export default RoutesEl;