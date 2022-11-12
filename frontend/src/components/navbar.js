import React from "react";
import Logo from "../media/logo.svg"
const Navbar = ({show}) => {
    return (
        <ul className="nav">
            <li>
                <button onClick={show}>Sign in</button>
            </li>
            <li className="logo">
                <img src={Logo} alt="Realyz"/>
            </li>
        </ul>
    )
}

export default Navbar;