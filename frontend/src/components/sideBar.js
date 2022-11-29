import React from "react";
import {Pic} from "./myprofile"
const SidebarItem = (props) => {
    const showConnections = () => {
        if(props.name=="Manage Connections"){
        props.onClick();

    }
    else if (props.name=="My account info"){
        props.onClick();
    }
    }
    return (
        <div className="sidebaritem" onClick={showConnections}>
            <Pic />
            <span>{props.name}</span>
        </div>
    )
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
            </div>
        </div>
    )
}

export default Sidebar;