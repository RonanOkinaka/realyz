import Navbar from "../components/navbar";
import React from "react";
import Background from "../media/portalBackground.jpg"
import { MyProfile, OtherProfile } from "../components/myprofile";
import MyVideo from "../components/myVideo";
import Sidebar from "../components/sideBar";
import OtherVideo from "../components/otherVideo";
import useModal from "../util/useModal";
import MyConnections from "../components/myConnections"
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
                        show={(num) => {toggle(num)}}/>
                        <MyProfile
                        vis={vis}
                        />
                        <MyVideo 
                        vis={vis}/>
                        <MyConnections
                        vis={vis}/>
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