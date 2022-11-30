import React from "react";
import { useNavigate } from "react-router-dom";
import pic from "../media/logo.svg"

const Logo = () => {
    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate('/');
    }
    return (
        <a onClick={handleOnClick}>
            <img src={pic} alt="Realyz"/>
        </a>
    )
}

export default Logo;
