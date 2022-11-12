import React from "react";

const LoginPopup = ({vis, hide}) => (vis == 2) ? (
    <div className="popup">
            <h2>Login</h2>
            <button onClick={hide} type="button" className="btnclosemodal" data-dismiss="popup" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        <div className="formcontainer">
            <input className="popupform" type="text" placeholder="Email:" name="usrname" required></input>
            <input className="popupform" type="password" placeholder="Password:" required></input>
            <button type="submit">Enter</button>
        </div>
    </div>
) : null;

export default LoginPopup;