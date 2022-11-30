import React from "react";
import Logo from "./logo";
import { clearUserData, loginUser, storeBearerToken, userData} from "../util/data";
import { useNavigate } from "react-router-dom";
import Parent from "./dataVisualizer";
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
        <div className="nav">
            <ul className="logo">
                <li>
                    <Logo/>
                </li>
            </ul>

            <ul className="navbtns">
                { isLanding() &&
                    <button onClick={handleOnClickSignin}>
                        Sign in
                    </button>
                }
                { !isLanding() &&
                    <li className="navusrcontainer">
                        <li className="greeting">
                            <Parent />
                        </li>
                        <li className="btn">
                            <button onClick={handleOnClickSignout}>
                                Sign out
                            </button>
                        </li>
                    </li>
                }
            </ul>
        </div>
    );
}

export default Navbar;