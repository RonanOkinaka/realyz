import React from "react";
import Logo from "../media/logo.svg"
import { clearUserData, loginUser, storeBearerToken, userData } from "../util/data";
import { useNavigate } from "react-router-dom";

const Navbar = ({show}) => {
    const navigate = useNavigate();
    const handleOnClick = event => {
        if (!(userData['uid'] || userData['pass']))
        {
            clearUserData();
            show();
        }
        else {
            loginUser()
            .then(function(response){
                storeBearerToken(response['data']['token']);
                navigate('/profile');
            })
            .catch(function(error){
                show();
            });
        }
    }
    

    return (
        <ul className="nav">
            <li>
                <button onClick={handleOnClick}>
                    Sign in
                </button>
            </li>
            <li className="logo">
                <img src={Logo} alt="Realyz"/>
            </li>
        </ul>
    );
}

export default Navbar;