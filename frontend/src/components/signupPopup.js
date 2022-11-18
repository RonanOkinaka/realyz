import React from "react";
import axios, { AxiosHeaders } from "axios";

function SignupPopup ({vis, hide}){
    const registerUser = () => axios({
        method: 'post',
        baseURL: 'http://localhost:8080',
        url: '/',
        headers: {'authorization': '<JWT_Token>'},    //should authorization header be generated or match JWT_SECRET in .env file?
        data: {
            'uid': 'harveyzzhao',
            'pass': '84hvht29439'
        }
    });

    return (vis == 1) ? (
        <div className="popup">
            <h2>Get Started</h2>
            <button onClick={hide} type="button" className="btnclosemodal" data-dismiss="popup" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div className="formcontainer">
                <div className="name">
                    <input className="nameform" type="text" placeholder="First Name:" name="firstname" required></input>
                    <input className="nameform" type="text" placeholder="Last Name:" name="lastname" required ></input>
                </div>
                <input className="popupform" type="password" placeholder="Set a password: " name="pwd" required></input>
                <button type="submit" onClick={() => registerUser()}>Join</button>
            </div>
        </div>
    ) : null;
}

export default SignupPopup;
