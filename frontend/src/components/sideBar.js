import React from "react";
import {Pic, ConnectionsIcon, Explore} from "./myprofile"
import { useNavigate } from "react-router-dom";
import {getLocalUserData} from "../util/data";
const SidebarItem = (props) => {
    const uid = getLocalUserData(['uid'])['uid'];
    const navigate = useNavigate();
    const showConnections = () => {
        if(props.name=="Manage Connections"){
            props.onClick();
        }
        else if (props.name=="My account info"){
            props.onClick();
        }
        else if (props.name=="Explore"){
            props.onClick();
        }
    }
    const gotoMain = event => {
        navigate('/main');
    }
    if (props.name == "Manage Connections"){
        return (
            <div className="sidebaritem" onClick={showConnections}>
                <ConnectionsIcon />
                <span>{props.name}</span>
            </div>
        )   
    }
    else if (props.name == "My account info"){
        return (
            <div className="sidebaritem" onClick={showConnections}>
                <Pic uid={uid}/>
                <span>{props.name}</span>
            </div>
        )  
    }
    //directs user to main page
    else if (props.name == "Explore"){
        return (
            <div className="sidebaritem" onClick={gotoMain}>
                <Explore />
                <span>{props.name}</span>
            </div>
        )
    }
    
}

const Sidebar = ({show}) => {
    const deleteProfile = () => {
        show(1);
    }
    const showProfile = () => {
        show(0);
    }
    return (
        <div className="sidebarwrapper">
            <div className="sidebar">
                <SidebarItem name="My account info" 
                onClick={showProfile}/>
                <SidebarItem name="Manage Connections"
                onClick={deleteProfile} 
                />
                <SidebarItem name="Explore"
                />
            </div>
        </div>
    )
}

export default Sidebar;