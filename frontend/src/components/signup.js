import React from "react";

export default function Signup({show}) {
    return (
        <div className="signup">
            <input className="signupform" type="text" placeholder="yourworkemail@example.com" name="usrname" required></input>
            <button type="submit" onClick={show}>Enter</button>
        </div>
    );
}