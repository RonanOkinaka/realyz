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
import { useLocation, useNavigate } from "react-router-dom";
import { getUserData } from "../util/data";

const Profile = () => {
    const {vis, toggle} = useModal();
    const navigate = useNavigate();
    const location = useLocation();
    const uid = location.state.uid;
    const mode = location.state.mode;

    //TODO: add viewing other profile feature
    const [usrData, setUsrData] = useState({});
    //first, search with existing content
    useEffect(() => {
        if (location.state){
            console.log(location.state.uid);
            console.log(location.state.mode);
        }

        if (uid) {
            getUserData(uid)
            .then(function(res){
                setUsrData(res.data);
            });
        }
    }, []);

    const handleOnClick = event => {
        navigate('/main');
    }
    return (
        <body className="profilepage">
            <div className="backgroundcontainer" style={{ backgroundImage: `url(${Background})` }}>
                <Navbar isLanding={() => false}/>
                { mode === 0 &&
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
                { mode === 1 &&
                    <React.Fragment>
                        <OtherProfile info={usrData}/>
                        <OtherVideo uid={uid}/>
                    </React.Fragment>
                }
                <button onClick={handleOnClick}></button>
            </div>
        </body>
    );
}

export default Profile;