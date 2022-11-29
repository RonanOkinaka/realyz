import React from "react";
import {Pic} from "./myprofile"
const SidebarItem = (props) => {
    const showConnections = () => {
        if(props.name=="Manage Connections"){
        console.log("you clicked");
    }
    }
    return (
        <div className="sidebaritem" onClick={showConnections}>
            <Pic />
            <span>{props.name}</span>
        </div>
    )
}

const Sidebar = () => {
    
    return (
        <div className="sidebarwrapper">
            <div className="sidebar">
                <SidebarItem name="My account info" />
                <SidebarItem name="Manage Connections" />
            </div>
        </div>
    )
}

export default Sidebar;