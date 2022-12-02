import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteConnection, getConnections, getLocalUserData, getUserData } from "../util/data";

const SentRequest = (props) => {
    //TODO: 
    const Navigate = useNavigate();
    const [refresh, setRefresh] = useState(true);

    const retract = (requester, requestee) => {
        //deleteConnection(this_user, other_user)
        deleteConnection(requester, requestee)
        .then(function(res){
            console.log(res);
            setRefresh(!refresh);
        })
        .catch(function(err){
            console.log(err);
        })
    }
    useEffect(() => {

    }, [refresh])
    const viewProfile = (uid) => {
        //redirect to profile mode = 1
        Navigate('/profile', {state:{'mode': 1, 'uid': uid}});
    }

    //TODO: refresh everytime after retract executes
    return (
        <div className="request">
            <p>{props.requestee}</p>
            <button id="viewprofilebutton" onClick={() => viewProfile(props.requestee)}>View</button>
            <button onClick={() => retract(props.requester, props.requestee)}>retract</button>
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