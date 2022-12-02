import Navbar from "../components/navbar";
import React from "react";
//import ReactDOM from "react-dom";
import * as ReactDOM from 'react-dom/client';

import Background from "../media/portalBackground.jpg"
import { MyProfile, OtherProfile } from "../components/myprofile";
import MyVideo from "../components/myVideo";
import Sidebar from "../components/sideBar";
import OtherVideo from "../components/otherVideo";
import QRobject from "../components/QRCODES"


//props.mode: 0 == myprofile, 1 == otherprofile
const Profile = (props) => {
    return (
        <body className="profilepage">
            <div className="backgroundcontainer" style={{ backgroundImage: `url(${Background})` }}>
                <Navbar isLanding={() => false}/>
                { props.mode === 0 &&
                    <React.Fragment>
                        <Sidebar />
                        <QRobject text = {window.location.href + '/' + sessionStorage.getItem("uid")}  /> 

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
            </div>
        </body>
    );
}

export default Profile;