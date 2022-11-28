import Navbar from "../components/navbar";
import React from "react";
import Background from "../media/portalBackground.jpg"
import { MyProfile } from "../components/myprofile";

const Profile = () => {
    return (
        <body className="profilepage">
            <div className="backgroundcontainer" style={{ backgroundImage: `url(${Background})` }}>
                <Navbar isLanding={() => false}/>
                <MyProfile />
            </div>
        </body>
    );
}

export default Profile;