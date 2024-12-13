import React from "react";
import HeaderTop from "./components/HeaderTop";
import HeaderTopBtm from "./components/Navbar/HeaderTopBottom";


function Header({isLoggedIn,setIsLoggedIn}) {
    return(
        <header>
            <HeaderTop/>
            <HeaderTopBtm {...{isLoggedIn}}/>
        </header>
    )
}


export default Header;