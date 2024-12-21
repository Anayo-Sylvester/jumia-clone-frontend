import React, { useContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../../contexts/AuthContext";
import PropTypes from 'prop-types';

/**
 * LogoutView Component
 * Handles user logout confirmation and navigation
 * 
 * @component
 * @returns {JSX.Element} Logout confirmation screen
 */
export default function LogoutView() {
    const navigate = useNavigate();
    const { handleLogout } = useContext(AuthContext);

    // Memoize navigation handler
    const handleCancel = useCallback(() => {
        navigate("/");
    }, [navigate]);

    // Memoize logout handler
    const handleLogoutClick = useCallback(() => {
        handleLogout();
    }, [handleLogout]);

    // Memoize message section
    const messageSection = useMemo(() => (
        <>
            <h1 className="text-2xl font-bold mb-4">Logout</h1>
            <p className="text-2xl font-semibold text-blue-600 mb-2">
                You are currently logged in
            </p>
            <p className="text-gray-600 mb-4">
                Are you sure you want to logout?
            </p>
        </>
    ), []);

    // Memoize buttons section
    const buttonSection = useMemo(() => (
        <div className="flex space-x-4">
            <button 
                onClick={handleLogoutClick}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
                Logout
            </button>
            <button 
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
                Cancel
            </button>
        </div>
    ), [handleLogoutClick, handleCancel]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {messageSection}
            {buttonSection}
        </div>
    );
}

LogoutView.displayName = 'LogoutView';
