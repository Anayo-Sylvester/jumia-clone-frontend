import React, { useCallback, useMemo, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { urls } from "../../../../../App";

/**
 * HeaderTopBottomRight Component
 * Renders the right section of the header including account dropdown
 * and authentication controls
 * 
 * @component
 * @example
 * return (
 *   <HeaderTopBottomRight />
 * )
 */
const HeaderTopBottomRight = () => {
    const navigate = useNavigate();
    const { isLoggedInState, handleLogout } = useContext(AuthContext);

    // Memoize dropdown close handler
    const closeHandler = useCallback(() => {
        closeAllDropdowns();
    }, []);

    // Memoize account options
    const accountOptions = useMemo(() => [
        { name: "My Account", icon: `${process.env.PUBLIC_URL}/icons/user-icon.svg`, link: "" },
        { name: "Orders", icon: `${process.env.PUBLIC_URL}/icons/orders-icon.svg`, link: "" },
        { name: "Saved Items", icon: `${process.env.PUBLIC_URL}/icons/empty-heart-icon.svg`, link: "" },
    ], []);

    // Setup click listener for closing dropdowns
    useEffect(() => {
        document.body.addEventListener("click", closeHandler);
        return () => document.body.removeEventListener("click", closeHandler);
    }, [closeHandler]);

    // Memoize authentication handler
    const handleAuth = useCallback((e) => {
        e.stopPropagation();
        if(isLoggedInState) {
            handleLogout();
            navigate(0);
        } else {
            navigate('/login');
        }
    }, [isLoggedInState, handleLogout, navigate]);

    // State to manage menu items
    const [menuItems, setMenuItems] = useState([]);

    // Update menu items whenever `isLoggedInState` changes
    useEffect(() => {
        setMenuItems([
            {
                id: 0,
                name: isLoggedInState ? `Hi, ${localStorage.getItem('username')}` : "Account",
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
        ]);
    }, [isLoggedInState]);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const closeHandler = () => closeAllDropdowns();
        document.body.addEventListener("click", closeHandler);
        return () => document.body.removeEventListener("click", closeHandler);
    }, []);

    // Renders the "Account" submenu
    function renderAccountSubMenu() {
        const AccountSubMenuItem = ({ name, icon, link }) => (
            <li>
                <Link to={link} className="flex p-2 items-center">
                    <img loading='lazy' className="h-4 mr-3" src={icon} alt={`${name} icon`} />
                    <p className="text-xs">{name}</p>
                </Link>
            </li>
        );
        return (
            <ul className="absolute top-[88px] w-[150px] rounded-md shadow-md bg-white z-10">
                <li className="grid place-items-center p-[12px] border-b-[1px] border-gray-300">
                    <button
                        className={`text-white text-[12px] py-1 rounded-md ${
                            isLoggedInState ? "bg-red-600 hover:bg-red-800 px-8" : "px-10 bg-orange hover:bg-orange-dark"
                        }`}
                        onClick={handleAuth}
                    >
                        {isLoggedInState ? 'LOGOUT' : 'LOGIN'}
                    </button>
                </li>
                {accountOptions.map((option) => (
                    <AccountSubMenuItem key={option.name} {...option} />
                ))}
            </ul>
        );
    }

    // Renders the "Help" submenu
    function renderHelpSubMenu() {
        const helpOptions = [
            { id: 0, name: "Help Center", link: "" },
            { id: 1, name: "Place an order", link: "" },
            { id: 2, name: "Payment options", link: "" },
            { id: 3, name: "Track an order", link: "" },
            { id: 4, name: "Cancel an order", link: "" },
            { id: 5, name: "Returns & Refunds", link: "" },
        ];

        const HelpSubMenuItem = ({ name }) => (
            <li className="py-2 text-xs">
                {name}
            </li>
        );

        return (
            <ul className="absolute top-[88px] w-[160px] rounded-md shadow-md p-5 z-10 bg-white">
                {helpOptions.map((option) => (
                    <HelpSubMenuItem key={option.id} {...option} />
                ))}
            </ul>
        );
    }

    // Toggles a dropdown's visibility
    function toggleDropdown(id) {
        setMenuItems((currentItems) =>
            currentItems.map((item) =>
                item.id === id
                    ? { ...item, isDropdownOpen: !item.isDropdownOpen }
                    : item
            )
        );
    }

    // Closes all dropdowns
    function closeAllDropdowns() {
        setMenuItems((currentItems) =>
            currentItems.map((item) => ({ ...item, isDropdownOpen: false }))
        );
    }

    // Render menu items
    const renderMenus = menuItems.map((menu) => (
        <div
            key={menu.id}
            tabIndex={0}
            className="flex h-full"
            onClick={(e) => {
                e.stopPropagation();
                navigate(menu.url);
            }}
        >
            <div className="flex gap-1 cursor-pointer items-center relative hover:filter-orange">
                <img  loading='lazy' className="h-6" src={menu.icon} alt={`${menu.name} icon`} />
                <label className="hidden sm:block">{menu.name}</label>
                {menu.subMenu && (
                    <img
                        className={`h-2 ${!menu.isDropdownOpen && "rotate-180"}`}
                        src="/icons/up-arrow.svg"
                        alt="arrow"
                        loading="lazy"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleDropdown(menu.id);
                        }}
                    />
                )}
            </div>
            {menu.subMenu && menu.isDropdownOpen && menu.subMenu}
        </div>
    ));

    return (
        <div className="header-bottom-right flex gap-x-4">
            {renderMenus}
        </div>
    );
};

HeaderTopBottomRight.displayName = 'HeaderTopBottomRight';

export default React.memo(HeaderTopBottomRight);
