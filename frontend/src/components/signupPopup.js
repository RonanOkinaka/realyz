import React from "react";
import axios from "axios";

const SignupPopup = ({vis, hide}) => (vis == 1) ? (
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
            <button type="submit">Join</button>
        </div>
    </div>
) : null;

export default SignupPopup;
