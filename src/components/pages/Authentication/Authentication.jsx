/**
 * Authentication Page Component
 * 
 * This component handles user authentication flows including login and registration.
 * It conditionally renders different views based on authentication state and URL parameters.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isLogged - Current user authentication state
 * @param {Function} props.setIsLogged - Function to update authentication state
 */

import { Navigate, useParams } from "react-router"
import LoginView from "./components/loginView"
import LogoutView from "./components/logoutView"
import React from "react"

export function AuthenticationPage({isLoggedIn, setIsLoggedIn}) {
  // Extract action parameter from URL using React Router's useParams
  const {action} = useParams()

  // Handle routing based on URL action parameter
  if(action === "register" || action === "login") {
    // Conditional rendering based on authentication state
    return isLoggedIn ? (
      // Show logout view for authenticated users
      <LogoutView 
        action={action} 
        isLoggedIn={isLoggedIn} 
        setIsLoggedIn={setIsLoggedIn}
      />
    ) : (
      // Show login view for unauthenticated users
      <LoginView 
        action={action} 
        setIsLoggedIn={setIsLoggedIn}
      />
    )
  } else {
    // Redirect to 404 page for invalid routes
    return <Navigate to="/notfound" />
  }
}

/**
 * Component Props Documentation
 * 
 * @typedef {Object} AuthenticationPageProps
 * @property {boolean} isLogged - Indicates if user is currently authenticated
 * @property {Function} setIsLogged - Function to update authentication state
 * 
 * URL Parameters
 * @param {string} action - URL parameter that can be either "login" or "register"
 * 
 * Child Components
 * @component LoginView - Handles user login and registration forms
 * @component LogoutView - Handles user logout functionality
 */