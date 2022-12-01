import Navbar from "../components/navbar";
import React, { useEffect, useState } from "react";
import Background from "../media/portalBackground.jpg"
import { MyProfile, OtherProfile } from "../components/myprofile";
import MyVideo from "../components/myVideo";
import Sidebar from "../components/sideBar";
import OtherVideo from "../components/otherVideo";
import useModal from "../util/useModal";
import MyConnections from "../components/myConnections"
import SentRequests from "../components/sentRequests";
import PendingInvitations from "../components/pendingInvitations"
import { getUserData } from "../util/data";

//props.mode: 0 == myprofile, 1 == otherprofile; props.uid: other user's uid to display info
const Profile = (props) => {
    const {vis, toggle} = useModal();

    //TODO: experimental
    const [usrData, setUsrData] = useState({});
    //first, search with existing content
    useEffect(() => {
        if (props.uid) {
            getUserData(props.uid)
            .then(function(res){
                setUsrData(res.data);
            });
        }
    }, []);
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
                        <SentRequests
                        vis={vis}/>
                        <PendingInvitations
                        vis={vis}
                        />
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