import React, { useState } from 'react'; // Importing React and the useState hook for state management

import Info from './Info'; // Component to display login-related information
import Form from './Form'; // Component to handle login and registration forms
import Footer from './Footer'; // Component for footer layout
import Toast from '../../../Layouts/Toast'; // Component for displaying success or error messages

/**
 * LoginView Component
 * Handles the layout and functionality for the login and registration views.
 * @param {Object} props - Component props
 * @param {string} props.action - Determines the action (e.g., login or register)
 * @param {Function} props.setIsLoggedIn - Function to update the logged-in state
 */
const LoginView = ({ action, setIsLoggedIn }) => {
  // State for managing the visibility of the Toast component
  const [isToastVisible, setIsToastVisible] = useState(false);

  // State for storing Toast data (success status and message)
  const [toastData, setToastData] = useState({
    success: false, // Indicates if the toast represents a success message
    message: '', // Message to display in the toast
  });

  return (
    <div className="h-screen text-center">
      <div className="flex flex-col justify-between pt-6 pb-8 mx-auto max-w-[391px] h-screen">
        {/* Info and Form components */}
        <div className="mb-3">
          <Info />
          <Form
            setIsLoggedIn={setIsLoggedIn}
            setIsToastVisible={setIsToastVisible}
            setToastData={setToastData}
            param={action}
          />
        </div>

        {/* Footer component */}
        <Footer />

        {/* Toast component for displaying feedback messages */}
        <Toast
          success={toastData.success}
          message={toastData.message}
          isToastVisible={isToastVisible}
          setIsToastVisible={setIsToastVisible}
        />
      </div>
    </div>
  );
};

export default LoginView; // Exporting the LoginView component
