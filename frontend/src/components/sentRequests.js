import React, { useEffect, useState } from "react";
import { deleteConnection, getConnections, getLocalUserData } from "../util/data";

const SentRequest = (props) => {
    //TODO: add functionality to view profile and retract btns
    const retract = (requester, requestee) => {
        //deleteConnection(this_user, other_user)
        deleteConnection(requester, requestee)
        .then(function(res){
            console.log(res);
        })
        .catch(function(err){
            console.log(err);
        })
    }
    return (
        <div className="request">
            <p>{props.requestee}</p>
            <button>View</button>
            <button onClick={() => {retract(props.requester, props.requestee)}}>retract</button>
        </div>
    );
}

const SentRequests = ({vis}) => {
    const [connections, setConnections] = useState([]);
    let query = {
        "from": getLocalUserData(['uid'])['uid'],
        "pending": 1,
    }

    useEffect(() => {
        getConnections(query)
        .then(function(res){
            console.log(res.data.connections)
            setConnections(res.data.connections);
        });
    }, [])

    return (vis==1) ?(
        <div className="requestsContainer">
            <p>Sent Requests</p>
            {connections.map(obj => (
                <SentRequest requestee={obj.uidTo} requester={query.from}/>
            ))}
        </div>
    ) : null;
}
export default SentRequests;