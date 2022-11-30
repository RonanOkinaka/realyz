import Navbar from "../components/navbar";
import React from "react";
import Background from "../media/portalBackground.jpg"
import { MyProfile, OtherProfile } from "../components/myprofile";
import MyVideo from "../components/myVideo";
import Sidebar from "../components/sideBar";
import OtherVideo from "../components/otherVideo";
import { useNavigate } from "react-router-dom";

//props.mode: 0 == myprofile, 1 == otherprofile
const Profile = (props) => {
    const navigate = useNavigate();
    const handleOnClick = event => {
        navigate('/main');
    }
    return (
        <body className="profilepage">
            <div className="backgroundcontainer" style={{ backgroundImage: `url(${Background})` }}>
                <Navbar isLanding={() => false}/>
                { props.mode === 0 &&
                    <React.Fragment>
                        <Sidebar />
                        <MyProfile />
                        <MyVideo />
                    </React.Fragment>
                }
                { props.mode === 1 &&
                    <React.Fragment>
                        <OtherProfile />
                        <OtherVideo />
                    </React.Fragment>
                }
                <button onClick={handleOnClick}></button>
            </div>
        </body>
    );
}

export default Profile;