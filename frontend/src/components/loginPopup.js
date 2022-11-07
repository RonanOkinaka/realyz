import React from "react";

export default function LoginPopup() {
    return(
        <div className="popup">
            <h2>Login</h2>
            <div className="formcontainer">
                <input className="popupform" type="text" placeholder="Email:" name="usrname" required></input>
                <input className="popupform" type="password" placeholder="Password:" required></input>
                <button type="submit">Enter</button>
            </div>
        </div>
    );
}