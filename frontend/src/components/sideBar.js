import React from "react";
import {Pic} from "./myprofile"
const SidebarItem = (props) => {
    const showConnections = () => {
        if(props.name=="Manage Connections"){
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
        console.log("clicked");
        show();
    }
    
    return (
        <div className="sidebarwrapper">
            <div className="sidebar">
                <SidebarItem name="My account info" 
                ishow={() => show(-1)}/>
                <SidebarItem name="Manage Connections"
                onClick={deleteProfile} 
                />
            </div>
        </div>
    )
}

export default Sidebar;