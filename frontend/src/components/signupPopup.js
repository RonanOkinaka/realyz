import {Link, Routes, Route, useNavigate} from 'react-router-dom';
import {registerUser, storeUserData} from "../util/data";

function SignupPopup ({vis, hide}){
    const handleSubmit = event => {
        let fname = event.target.firstname.value;
        let lname = event.target.lastname.value;
        let pass = event.target.pwd.value;
        // Error Processing
        if (pass.toString().length < 8) {
            console.error("password has to have a minimum of 8 Digits");
            event.preventDefault();
        }
        else {
            event.preventDefault();
            storeUserData(["fname", "lname", "pass"], [fname, lname, pass]);
            registerUser()
                .then(function (response){
                    // console.log(response);
                    //Success: status: 201, statusText: "Created"
                })
                .catch(function(error) {
                    if (error.response.status === 409)
                        console.log("Your email has already been registered in the system.");
                    // console.log(responseStatus);
                });
        }
    }

    return (vis == 1) ? (
        <div className="popup">
            <h2>Get Started</h2>
            <button onClick={hide} type="button" className="btnclosemodal" data-dismiss="popup" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <form className="formcontainer" onSubmit={handleSubmit}>
                <div className="name">
                    <input className="nameform" type="text" placeholder="First Name:" name="firstname" required></input>
                    <input className="nameform" type="text" placeholder="Last Name:" name="lastname" required ></input>
                </div>
                <input className="popupform" type="password" placeholder="Set a password: " name="pwd" required></input>
                <button type="submit">Join</button>
            </form>
        </div>
    ) : null;
}

export default SignupPopup;
