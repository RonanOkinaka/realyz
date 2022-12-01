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
    const names = [];
    let query = {
        "pending" : 1,
        "from": getLocalUserData(['uid'])['uid'],
    }
    useEffect(() => {
    getConnections(query)
    .then(function(res){
        for (let i = 0; i < res.data.connections.length; i++){
            getUserData(res.data.connections[i]['uidTo']).then(function(r2) {
                console.log("this is exec");
                names.push(r2.data.fname +" " + r2.data.lname);
                setConnections(names);
            });
          }
    });}, [])
    //setConnections()
    console.log(connections);
    return (vis==1) ?(
        <div className="requestsContainer">
            <p>Sent Requests</p>
            {connections.map(obj => (
                <SentRequest requestee={obj} />
            ))}
        </div>
    ) : null;
}
export default SentRequests;