import React from "react";
import Slogan from "../components/slogan"
import Navbar from "../components/navbar";
import Signup from "../components/signup";
import VidBackground from "../components/vidBackground";
import LoginPopup from "../components/loginPopup";
import SignupPopup from "../components/signupPopup";
import useModal from "../util/useModal";
import { clearUserData } from "../util/data";

const LandingPage = () => {
    //FIXME: prevent modal switching when user fails to fill out form
    const {vis, toggle} = useModal(); //by default set state to 0 (hide all)
    return (
        <body className="fullpage">
            <VidBackground/>
            <Navbar
                show={() => toggle(2)}
            />
            <Slogan/>
            <Signup
                show={() => toggle(1)}
            />
            {/* <button className="btn-default" onClick={()=>toggle(1)}>Show modal</button> */}
            <LoginPopup
                vis={vis}
                hide={() => {toggle(0)}}
            />
            <SignupPopup
                vis={vis}
                hide={() => {toggle(0); clearUserData();}}
            />
        </body>
    );
}

export default LandingPage;