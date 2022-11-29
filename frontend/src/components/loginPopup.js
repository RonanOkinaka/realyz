import React, {useState} from "react";
import {loginUser, storeUserData, storeBearerToken, clearUserData} from '../util/data';
import { useNavigate } from "react-router-dom";

const LoginPopup = ({vis, hide}) => {
    const navigate = useNavigate();
    const [err, setErr] = useState(null); //error message on display

    const handleSubmit = event => {
        clearUserData();
        //user input
        let uid = event.target.usrname.value;
        let pass = event.target.pwd.value;
        
        //store user info in sessionStorage
        storeUserData(["uid", "pass"], [uid, pass]);
        event.preventDefault();
        //login user
        loginUser()
            .then(function(response){
                setErr(null);
                storeBearerToken(response['data']['token']);
                console.log("login success.");
                console.log(response['data']);
                navigate('/profile');
            })
            .catch(function(error){
                if (error['response']['status'] === 403) {
                    setErr('your username & password combination is incorrect.')
                }
                clearUserData();
            });
    }
    return ((vis == 2) ? (
        <div className="popup">
                <h2>Login</h2>
                <button onClick={hide} type="button" className="btnclosemodal" data-dismiss="popup" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            <form className="formcontainer" onSubmit={handleSubmit}>
                <input className="popupform" type="text" placeholder="Email:" name="usrname" required></input>
                <input className="popupform" type="password" name="pwd" placeholder="Password:" required></input>
                <button type="submit">Enter</button>
                {/* conditionally render error message */}
                {err && <p>login failed: {err}</p>}
            </form>
        </div>
    ) : null);
}

export default LoginPopup;