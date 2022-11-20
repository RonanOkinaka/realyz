import Navbar from "../components/navbar";
import React from "react";
import Background from "../media/portalBackground.jpg"

const Profile = () => {
    return (
        <body className="profilepage">
            <div className="backgroundcontainer" style={{ backgroundImage: `url(${Background})` }}>
                <Navbar isLanding={() => false}/>
            </div>
        </body>
    );
}

export default Profile;