import React from "react";
import {Pic, ConnectionsIcon, Explore} from "./myprofile"
import { useNavigate } from "react-router-dom";
const SidebarItem = (props) => {
    const navigate = useNavigate();
    const showConnections = () => {
        if(props.name=="Return to Profile Page"){
            props.onClick();
        }
    }
    const gotoMain = event => {
        navigate('/main');
    }
    if (props.name == "Return to Profile Page"){
        return (
            <div className="sidebaritem" onClick={showConnections}>
                <ConnectionsIcon />
                <span>{props.name}</span>
            </div>
        )   
    }
    
}

const SidebarMain = ({show}) => {
    const navigate = useNavigate();
    const deleteProfile = () => {
        navigate('/profile', {state: {'mode' : 0}});
    }
    return (
        <div className="sidebarwrapper">
            <div className="sidebar">
                <SidebarItem name="Return to Profile Page"
                onClick={deleteProfile} 
                />
            </div>
        </div>
    )
}

export default SidebarMain;