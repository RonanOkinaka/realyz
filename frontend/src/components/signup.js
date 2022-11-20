import React from "react";
import {storeUserData, responseStatus, dump} from "../util/data";

export default function Signup({show}) {
    const handleSubmit = event => {
        let email = event.target.usrname.value;
        let username = email;
        event.preventDefault(); // prevent page refresh
        storeUserData(['uid', 'email'], [username, email]);
    };

    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <input
                    className="signupform" 
                    type="text" 
                    placeholder="yourworkemail@example.com" 
                    name="usrname"
                required/>
                <button type="submit" onClick={show}>Enter</button>
            </form>
        </div>
    );
}



// export default function Signup({show}) {



// }