import React from "react";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

// LogoutView Component
export default function LogoutView({ setIsLoggedIn }) {
    // useNavigate hook to handle navigation to different routes
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {/* Heading for the Logout screen */}
            <h1 className="text-2xl font-bold mb-4">Logout</h1>

            {/* Confirmation message */}
            <p className="text-2xl font-semibold text-blue-600 mb-2">You are currently logged in</p>
            <p className="text-gray-600 mb-4">Are you sure you want to logout?</p>

            {/* Action buttons */}
            <div className="flex space-x-4">
                {/* Logout Button */}
                <button 
                    onClick={() => {
                        setIsLoggedIn(false); // Update the login state
                        navigate("/"); // Navigate back to the home page
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Logout
                </button>

                {/* Cancel Button */}
                <button 
                    onClick={() => navigate("/")} // Navigate to home page without logging out
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
