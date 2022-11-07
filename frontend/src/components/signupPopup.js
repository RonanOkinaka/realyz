import React from "react";

export default function SignupPopup() {
    return(
        <div className="popup">
            <h2>Get Started</h2>
            <div className="formcontainer">
                <div className="name">
                    <input className="nameform" type="text" placeholder="First Name:" name="firstname" required></input>
                    <input className="nameform" type="text" placeholder="Last Name:" name="lastname" required ></input>
                </div>
                <input className="popupform" type="password" placeholder="Set a password: " name="pwd" required></input>
                <button type="submit">Join</button>
            </div>
        </div>
    );
}