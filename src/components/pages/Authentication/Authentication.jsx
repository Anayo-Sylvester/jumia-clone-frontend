/**
 * Authentication Page Component
 * 
 * This component handles user authentication flows including login and registration.
 * It conditionally renders different views based on authentication state and URL parameters.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {boolean} props.isLoggedIn - Current user authentication state
 * @param {Function} props.setIsLoggedIn - Function to update authentication state
 */

import { Navigate, useLocation, useParams } from "react-router"
import LoginView from "./components/loginView"
import LogoutView from "./components/logoutView"
import React from "react"

export function AuthenticationPage({isLoggedIn, setIsLoggedIn}) {
  // Extract action parameter from URL using React Router's useLocation
  const location = useLocation()
  const endWith = location.pathname.split('/').pop();
  console.log({endWith})

  // Handle routing based on URL endWith parameter

  return isLoggedIn ? (
    // Show logout view for authenticated users
    <LogoutView 
      action={endWith} 
      isLoggedIn={isLoggedIn} 
      setIsLoggedIn={setIsLoggedIn}
    />
  ) : (
    // Show login view for unauthenticated users
    <LoginView 
      action={endWith} 
      setIsLoggedIn={setIsLoggedIn}
    />
  )
}

/**
 * Component Props Documentation
 * 
 * @typedef {Object} AuthenticationPageProps
 * @property {boolean} isLoggedIn - Indicates if user is currently authenticated
 * @property {Function} setIsLoggedIn - Function to update authentication state
 * 
 * URL Parameters
 * @param {string} endWith - URL parameter that can be either "login" or "register"
 * 
 * Child Components
 * @component LoginView - Handles user login and registration forms
 * @component LogoutView - Handles user logout functionality
 */

