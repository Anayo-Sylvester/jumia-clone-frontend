import React, { Route, Routes } from "react-router";  // Importing necessary modules
import HomePage from "../components/pages/Homepage/HomePage";  // Importing the HomePage component
import Notfound from "../components/pages/Notfound";  // Importing the Notfound component for handling unmatched routes
import Cart from "../components/pages/Cart/Cart";  // Importing the Cart component
import ProductPage from "../components/pages/productPage/ProductPage";  // Importing the ProductPage component
import ProductsPage from "../components/pages/productsPage/ProductsPage";  // Importing the ProductsPage component
import Categories from "../components/pages/Categories";  // Importing the Categories component
import { AuthenticationPage } from "../components/pages/Authentication/Authentication";  // Importing AuthenticationPage component
import { useContext } from "react";
import { AuthContext, AuthContextProvider } from "../contexts/AuthContext";

/**
 * RoutesEl Component
 * Handles routing and renders different components based on the current path.
 *
 * @param {boolean} isLoggedIn - Indicates if the user is logged in.
 * @param {Function} setIsLoggedIn - Function to update the login state.
 */
const RoutesEl = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    // Array of route definitions
    const routes = [
        {
            path: `${process.env.PUBLIC_URL}/*`,  // Catch-all route for unmatched paths
            element: <Notfound />  // Render Notfound component for unmatched paths
        },
        {
            path: `${process.env.PUBLIC_URL}/`,  // Home page route
            element: <HomePage />
        },
        {
            path: `${process.env.PUBLIC_URL}/cart`,  // Cart page route
            element: <Cart/>
        },
        {
            path: `${process.env.PUBLIC_URL}/products`,  // Products page route
            element: <ProductsPage />
        },
        {
            path: `${process.env.PUBLIC_URL}/product/:id`,  // Product page with dynamic ID
            element: <ProductPage/>
        },
        {
            path: `${process.env.PUBLIC_URL}/categories`,  // Categories page route
            element: <Categories />
        },
        {
            path: `${process.env.PUBLIC_URL}/login`,  // Login page route
            element: <AuthenticationPage/>
        },
        {
            path: `${process.env.PUBLIC_URL}/register`,  // Register page route
            element: <AuthenticationPage/>
        }        
    ];

    // Generating Route components based on the routes array
    const generateRouteElement = routes.map((route, id) => (
        <Route key={id} path={route.path} element={route.element} />
    ));

    return (
        <AuthContextProvider>
            <Routes>
                {generateRouteElement}
            </Routes>
        </AuthContextProvider>
    );
}

export default RoutesEl;  // Exporting the RoutesEl component
