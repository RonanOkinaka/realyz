import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteConnection, getConnections, getLocalUserData, getUserData } from "../util/data";
const SentRequest = (props) => {
    
    const navigate = useNavigate();
    const [usrData, setUsrData] = useState({});

    const retract = (requester, requestee) => {
        //deleteConnection(this_user, other_user)
        deleteConnection(requester, requestee); 
    }

    const getName = () => {
        let fname = usrData.fname;
        let lname = usrData.lname;
        let fullName = [fname, lname].join(' ');
        return fullName;
    }

    const viewProfile = (uid) => {
        //redirect to profile mode = 1
        navigate('/profile', {state:{'mode': 1, 'uid': uid}});
    }

    useEffect(() => {
        getUserData(props.requestee)
        .then(function(res){
            setUsrData(res.data);
        })
    }, [])

    //TODO: refresh everytime after retract executes
    return (
        <div className="request">
            <p>{getName()}</p>
            <button id="viewprofilebutton" onClick={() => viewProfile(props.requestee)}>View</button>
            <button onClick={() => retract(props.requester, props.requestee)}>retract</button>
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