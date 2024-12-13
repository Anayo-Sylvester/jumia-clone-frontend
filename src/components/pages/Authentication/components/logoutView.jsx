import React from "react"
import { useNavigate } from "react-router"
import PropTypes from "prop-types"

export default function LogoutView({setIsLoggedIn}){
    const navigate = useNavigate();
  
    return(
          <div className="flex flex-col items-center justify-center h-screen">
              <h1 className="text-2xl font-bold mb-4">Logout</h1>
              <p className="text-2xl font-semibold text-blue-600 mb-2">You are currently logged in</p>
              <p className="text-gray-600 mb-4">Are you sure you want to logout?</p>
              <div className="flex space-x-4">
                  <button 
                  onClick={() => {
                    setIsLoggedIn(false);
                    navigate("/");
                  }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                      Logout
                  </button>
                  <button 
                    onClick={() => navigate("/")}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400">
                      Cancel
                  </button>
              </div>
          </div>
      )
}

LogoutView.propTypes = {
    setIsLoggedIn: PropTypes.func.isRequired
}