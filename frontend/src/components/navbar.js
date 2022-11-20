import React from "react";
import Logo from "../media/logo.svg"
import { clearUserData, loginUser, storeBearerToken, userData } from "../util/data";
import { useNavigate } from "react-router-dom";

const Navbar = ({isLanding, show}) => {
    const navigate = useNavigate();
    const handleOnClickSignin = event => {
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

    const handleOnClickSignout = event => {
        clearUserData();
        navigate('/');
    }
    

    return (
        <ul className="nav">
            { isLanding() &&
                <>
                    <li>
                        <button onClick={handleOnClickSignin}>
                            Sign in
                        </button>
                    </li>
                    <li className="logo">
                        <img src={Logo} alt="Realyz"/>
                    </li>
                </>
            }
            { !isLanding() &&
                <>
                    <li>
                        <button onClick={handleOnClickSignout}>Sign out</button>
                    </li>
                </>
            }
        </ul>
    );
}

export default Navbar;