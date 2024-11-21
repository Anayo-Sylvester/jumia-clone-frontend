import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { urls } from "../../App"; // Import URL constants

// Component for the mobile navigation bar
export default function MobileNavbar() {
    const location = useLocation(); // Get current URL path
    const navigate = useNavigate(); // React Router hook for navigation

    // Define navigation items
    const navItems = [
        { id: 1, label: "Home", icon: `${process.env.PUBLIC_URL}/icons/home-icon.svg`, path: urls.home },
        { id: 2, label: "Categories", icon: `${process.env.PUBLIC_URL}/icons/category-icon.svg`, path: urls.category },
        { id: 3, label: "Orders", icon: `${process.env.PUBLIC_URL}/icons/feed-icon.svg`, path: urls.orders },
        { id: 4, label: "Account", icon: `${process.env.PUBLIC_URL}/icons/user-icon.svg`, path: urls.account },
        { id: 5, label: "Help", icon: `${process.env.PUBLIC_URL}/icons/help-icon.svg`, path: urls.help }
    ];

    const clickedPathRef = useRef(null); // Track last clicked path

    // Function to handle navigation and set clicked path for animation
    const handleNavigation = (path) => {
        navigate(path);
        clickedPathRef.current = path;
    };

    // Component for each navigation button
    const NavButton = ({ icon, label, path }) => {
        const isActive = location.pathname === path; // Check if button is active
        const showClickAnimation = path === clickedPathRef.current; // Check if button should animate

        return (
            <button
                className={`grid w-1/4 relative place-items-center 
                    ${isActive ? 'filter-orange' : ''} 
                    ${showClickAnimation ? 'animate-click' : ''}`}
                onClick={() => handleNavigation(path)}
                ref={clickedPathRef}
            >
                <img className="h-5" src={icon} alt={`${label} icon`} />
                <h2>{label}</h2>
            </button>
        );
    };

    // Generate navigation buttons from navItems
    const navButtons = navItems.map((item) => (
        <NavButton key={item.id} icon={item.icon} label={item.label} path={item.path} />
    ));

    return (
        <>
          {/* Spacer to ensure elements covered by the navbar are visible */}
            <div className="mt-16 sm:hidden"></div> 

          {/* Fixed bottom navigation bar */}
            <div className="fixed bottom-0 left-0 w-full flex justify-around p-1 bg-white shadow-md overflow-hidden sm:hidden">
            {navButtons}
            </div>
        </>
    );
}
