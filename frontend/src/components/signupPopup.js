import {userData, loginUser, registerUser, storeUserData, clearUserData, storeBearerToken} from "../util/data";
import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

function SignupPopup ({vis, hide}){
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = event => {
        let fname = event.target.firstname.value;
        let lname = event.target.lastname.value;
        let pass = event.target.pwd.value;
        event.preventDefault();
        if (pass.toString().length < 8) {
            setErr("password has to have a minimum of 8 Digits");
        }
        else {
            event.preventDefault();
            console.log(userData);
            storeUserData(["fname", "lname", "pass"], [fname, lname, pass]);
            registerUser()
                //if account creation succeeded, login user automatically and goto user portal.
                .then(function (response){
                    loginUser()
                        .then(function(response){
                            storeBearerToken(response['data']['token']);
                            navigate('/profile');
                        })
                        .catch(function(error){
                            setErr("cannot sign in user after signing up. Dev error.");
                            clearUserData();
                        });
                })
                .catch(function(error) {
                    if (error.response.status === 409)
                        setErr("Your email has already been registered in the system.");
                    if (error.response.status === 500)
                        setErr("Internal Server Error.");
                    clearUserData();
                });
        }
    }

    return (vis == 1) ? (
        <div className="popup">
            <h2>Get Started</h2>
            <button onClick={hide} type="button" className="btnclosemodal" data-dismiss="popup" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <form className="formcontainer" onSubmit={handleSubmit}>
                <div className="name">
                    <input className="nameform" type="text" placeholder="First Name:" name="firstname" required></input>
                    <input className="nameform" type="text" placeholder="Last Name:" name="lastname" required ></input>
                </div>
                <input className="popupform" type="password" placeholder="Set a password: " name="pwd" required></input>
                <button type="submit">Join</button>
                {err && <p>error: {err}</p>}
            </form>
        </div>
    ) : null;
}

export default SignupPopup;
