// Import necessary modules from React and React Router
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { urls } from '../../../../../App';

/**
 * HeaderBottomRight Component
 * 
 * This component renders the right section of a header containing menu items such as "Account," "Help," and "Cart." 
 * Each menu item may include dropdowns for additional options. The component supports dynamic navigation and dropdown toggling.
 * 
 * @param {boolean} isLoggedIn - Indicates if the user is logged in.
 * @param {function} setIsLoggedIn - Function to update the logged-in state.
 */
const HeaderBottomRight = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate(); // For programmatic navigation

    // Define the initial menu items, including dropdowns and icons
    const initialMenuItems = [
        {
            id: 0,
            name: "Account",
            icon: `${process.env.PUBLIC_URL}/icons/user-icon.svg`,
            url: urls.account,
            subMenu: renderAccountSubMenu(),
            isDropdownOpen: false,
        },
        {
            id: 1,
            name: "Help",
            icon: `${process.env.PUBLIC_URL}/icons/help-icon.svg`,
            url: urls.help,
            subMenu: renderHelpSubMenu(),
            isDropdownOpen: false,
        },
        {
            id: 2,
            name: "Cart",
            icon: `${process.env.PUBLIC_URL}/icons/cart-icon.svg`,
            url: urls.cart,
            subMenu: null,
        },
    ];

    // State to track menu items and their dropdown states
    const [menuItems, setMenuItems] = useState(() => initialMenuItems);

    // Effect to close dropdowns when clicking outside the menu
    useEffect(() => {
        const closeHandler = (e) => closeAllDropdowns();
        document.body.addEventListener("click", closeHandler);
        return () => document.body.removeEventListener("click", closeHandler);
    }, []);

    /**
     * Renders the submenu for the "Account" menu item.
     * 
     * Includes options for logging in/out and navigation to account-related pages.
     */
    function renderAccountSubMenu() {
        const accountOptions = [
            { name: "My Account", icon: `${process.env.PUBLIC_URL}/icons/user-icon.svg`, link: "" },
            { name: "Orders", icon: `${process.env.PUBLIC_URL}/icons/orders-icon.svg`, link: "" },
            { name: "Saved Items", icon: `${process.env.PUBLIC_URL}/icons/empty-heart-icon.svg`, link: "" },
        ];

        const AccountSubMenuItem = ({ name, icon, link }) => (
            <li>
                <Link to={link} className="flex p-2 items-center">
                    <img className="h-4 mr-3" src={icon} alt={`${name} icon`} />
                    <p className="text-xs">{name}</p>
                </Link>
            </li>
        );

        return (
            <ul className="absolute top-7 w-[150px] rounded-md shadow-md bg-white z-10">
                <li className="grid place-items-center p-[12px] border-b-[1px] border-gray-300">
                    <Link
                        to={'/login'}
                        className={`text-white text-[12px] py-1 ${isLoggedIn ? "px-9 bg-red-600 hover:bg-red-800" : "px-10 bg-orange hover:bg-orange-dark"} min-w-fit rounded-md`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isLoggedIn ? 'LOG OUT' : "SIGN IN"}
                    </Link>
                </li>
                {accountOptions.map((option) => (
                    <AccountSubMenuItem key={option.name} {...option} />
                ))}
            </ul>
        );
    }

    /**
     * Renders the submenu for the "Help" menu item.
     * 
     * Includes links to help-related resources and a live chat option.
     */
    function renderHelpSubMenu() {
        const helpOptions = [
            { id: 0, name: "Help Center", link: "" },
            { id: 1, name: "Place an order", link: "" },
            { id: 2, name: "Payment options", link: "" },
            { id: 3, name: "Track an order", link: "" },
            { id: 4, name: "Cancel an order", link: "" },
            { id: 5, name: "Returns & Refunds", link: "" },
        ];

        const HelpSubMenuItem = ({ name, link }) => (
            <li className="py-2 text-xs" tabIndex={0}>
                {name}
            </li>
        );

        const LiveChatButton = () => (
            <li className="border-t-2 border-gray-200 border-solid py-[12px]">
                <Link className="flex bg-orange hover:bg-orange-dark text-white text-[12px] py-3 px-4 rounded-md">
                    <img className="h-4 mr-auto" src="/icons/message-icon.svg" alt="message icon" />
                    <p className="mr-auto">LIVE CHAT</p>
                </Link>
            </li>
        );

        return (
            <ul className="absolute top-7 w-[160px] rounded-md shadow-md p-5 z-10 bg-white">
                {helpOptions.map((option) => (
                    <HelpSubMenuItem key={option.id} {...option} />
                ))}
                <LiveChatButton />
            </ul>
        );
    }

    /**
     * Toggles the dropdown visibility for a specific menu item.
     * @param {number} id - The ID of the menu item to toggle.
     */
    function toggleDropdown(id) {
        setMenuItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id
                    ? { ...item, isDropdownOpen: !item.isDropdownOpen }
                    : item
            )
        );
    }

    /**
     * Closes all dropdowns, optionally excluding a specific menu item.
     * @param {number} [exceptId] - The ID of the menu item to exclude from closing.
     */
    function closeAllDropdowns(exceptId) {
        setMenuItems((currentItems) =>
            currentItems.map((item) =>
                item.id !== exceptId ? { ...item, isDropdownOpen: false } : item
            )
        );
    }

    /**
     * Renders individual menu items, handling navigation and dropdown toggling.
     */
    const MenuItem = ({ icon, url, name, subMenu, isDropdownOpen, toggleDropdown, closeAllDropdowns }) => (
        <div
            tabIndex={0}
            className={`${name === 'Cart' ? "" : "hidden"} flex h-full mr-[-30px] sm:block sm:mr-0`}
            onClick={(e) => {
                e.stopPropagation();
                navigate(url);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    closeAllDropdowns();
                    toggleDropdown();
                }
            }}
        >
            <div className={`label flex gap-1 cursor-pointer h-full items-center justify-around relative hover:filter-orange`}>
                <img className="h-9 cursor-pointer invert sm:h-6 sm:invert-0" src={icon} alt={`${name} icon`} id={`${name}-icon`} />
                <label className="cursor-pointer hidden sm:block" htmlFor={`${name}-icon`}>{name}</label>
                {subMenu && (
                    <img
                        className={`h-2 my-auto ${!isDropdownOpen && "rotate-180"}`}
                        src='/icons/up-arrow.svg'
                        alt="arrow"
                        onClick={(e) => {
                            e.stopPropagation();
                            closeAllDropdowns();
                            toggleDropdown();
                        }}
                    />
                )}
            </div>
            {subMenu && isDropdownOpen && <div className="bg-red-300">{subMenu}</div>}
        </div>
    );

    // Render all menu items dynamically
    const renderMenus = menuItems.map((menu) => (
        <MenuItem
            key={menu.id}
            icon={menu.icon}
            name={menu.name}
            url={menu.url}
            subMenu={menu.subMenu}
            isDropdownOpen={menu.isDropdownOpen}
            toggleDropdown={() => toggleDropdown(menu.id)}
            closeAllDropdowns={() => closeAllDropdowns(menu.id)}
        />
    ));

    return (
        <div className="header-bottom-right relative flex gap-x-4 place-content-center ml-[-8px] sm:ml-0 sm:min-w-[293px]">
            {renderMenus}
        </div>
    );
};

export default HeaderBottomRight;
