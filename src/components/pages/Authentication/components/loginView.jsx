import React, { useState } from 'react';  // Importing React and useState hook for state management

import Info from './Info';  // Importing the Info component to display login-related information
import Form from './Form';  // Importing the Form component to handle login and registration forms
import Footer from './Footer';  // Importing the Footer component for the footer layout
import Toast from '../../../Layouts/Toast';  // Importing the Toast component to display success or error messages

// LoginView Component
const LoginView = ({ action, setIsLoggedIn }) => {
  // State for managing the visibility of the toast
  const [isToastVisible, setIsToastVisible] = useState(false);

  // State for managing toast data (success status and message)
  const [ToastData, setToastData] = useState({
    success: false,
    message: ''
  });

  return (
    <div className="h-screen text-center">
      <div className="flex flex-col justify-between pt-6 pb-8 mx-auto max-w-[391px] h-screen">
        
        {/* Displaying information and form components */}
        <div className="mb-3">
          <Info />
          <Form setIsLoggedIn={setIsLoggedIn} setIsToastVisible={setIsToastVisible} setToastData={setToastData} param ={action} />
        </div>

        <Footer />  {/* Footer component */}

        {/* Conditional rendering of the Toast component */}
        <Toast 
          success={ToastData.success} 
          message={ToastData.message} 
          isToastVisible={isToastVisible} 
          setIsToastVisible={setIsToastVisible} 
        />
      </div>
    </div>
  );
};

export default LoginView;  // Exporting the LoginView component
