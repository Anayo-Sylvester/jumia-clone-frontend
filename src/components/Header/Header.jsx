import React from "react";
import HeaderTop from "./components/HeaderTop";
import HeaderTopBtm from "./components/Navbar/HeaderTopBottom";


function Header(){
    console.log("main header")
    return(
        <header>
            <HeaderTop/>
            <HeaderTopBtm/>
        </header>
    )
}


export default Header;