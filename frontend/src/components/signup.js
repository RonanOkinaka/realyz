import React, {useState} from "react";
import {storeUserData} from "../util/data";

export default function Signup({show}) {
    const [status, setStatus] = useState(false);
    const [err, setErr] = useState(null);
    
    //TODO: clear userdata \ {uid, email} after clicking Enter.
    const handleSubmit = event => {
        let email = event.target.usrname.value;
        email = email.toString().replace(/\s/g, '');    //delete blank spaces 
        let username = email;
        event.preventDefault(); // prevent page refresh
        // prevent popup if user does NOT fill in a valid email.
        let hasAt = false; // simple check to ensure email has an @
        for (let i = 0; i < email.length; i++)
                if (email[i] == '@')
                    hasAt = true;
        if (email.length === 0) {
            setErr("your email isn't valid.");
            setStatus(false);
        }
        else if (hasAt == true) {
            
            storeUserData(['uid', 'email'], [username, email]);
            setErr(null);
            setStatus(true);
        }
        else 
        {
            setErr("your email isn't valid.");
            setStatus(false);
        }
    };

    const doNothing = () => {
    }

    return (
        <div className="signup">
            <form className="formcontainer" onSubmit={handleSubmit}>
                <input
                    className="signupform" 
                    type="text" 
                    placeholder="yourworkemail@example.com" 
                    name="usrname"
                />
                <button type="submit" onClick={status ? show : doNothing}>Enter</button>
                {err && <p>Error: {err}</p>}
            </form>
        </div>
    );
}