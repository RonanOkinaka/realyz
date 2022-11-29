import Navbar from "../components/navbar";
import React from "react";
import Background from "../media/portalBackground.jpg"
import { MyProfile, OtherProfile } from "../components/myprofile";
import MyVideo from "../components/myVideo";
import Sidebar from "../components/sideBar";
import OtherVideo from "../components/otherVideo";
import useModal from "../util/useModal";

//props.mode: 0 == myprofile, 1 == otherprofile
const Profile = (props) => {
    const {vis, toggle} = useModal();
    return (
        <body className="profilepage">
            <div className="backgroundcontainer" style={{ backgroundImage: `url(${Background})` }}>
                <Navbar isLanding={() => false}/>
                { props.mode === 0 &&
                    <React.Fragment>
                        <Sidebar 
                        show={() => {toggle(1)}}/>
                        <MyProfile
                        vis={vis}
                        hide={() => {toggle(3)}} 
                        />
                        <MyVideo />
                    </React.Fragment>
                }
                { props.mode === 1 &&
                    <React.Fragment>
                        <OtherProfile />
                        <OtherVideo />
                    </React.Fragment>
                }
            </div>
        </body>
    );
}

export default Profile;