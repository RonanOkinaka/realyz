import React from "react";
import Logo from "../media/logo.svg"
export default function Navbar() {
    return (
        <ul className="nav">
            <li>
                <button>Sign in</button>
            </li>
            <li className="logo">
                <img src={Logo} alt="Realyz"/>
            </li>
        </ul>
    )
}

