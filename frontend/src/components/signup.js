import React from "react";

export default function Signup() {
    return (
        <div className="signup">
            <input className="signupform" type="text" placeholder="yourworkemail@example.com" name="usrname" required></input>
            <button type="submit">Enter</button>
        </div>
    );
}