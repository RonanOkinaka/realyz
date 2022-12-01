import React, { useEffect, useState } from "react";
import { getLocalUserData, getConnections, getUserData } from "../util/data";

const SentRequest = ({requestee}) => {
    return (
        <div className="request">
            <p>{requestee}</p>
            <button>View Profile</button>
        </div>
    );
}

const SentRequests = ({vis}) => {
    const [connections, setConnections] = useState([]);
    let query = {
        "pending" : 1,
        "from": getLocalUserData(['uid'])['uid'],
    }
    useEffect(() => {
    getConnections(query)
    .then(function(res){
        //console.log(res.data.connections);
        setConnections(res.data.connections);
    });}, [])
    /*for (let i = 0; i < res.data.connections.length; i++){
      
    }*/
    
    return (vis==1) ?(
        <div className="requestsContainer">
            <p>Sent Requests</p>
            {connections.map(obj => (
                <SentRequest requestee={obj.uidTo} />
            ))}
        </div>
    ) : null;
}
export default SentRequests;