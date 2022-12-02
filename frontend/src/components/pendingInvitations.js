import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createConnection, getConnections, getLocalUserData } from "../util/data";

const SentRequest = (props) => {
  const Navigate = useNavigate();
  const otherUid = props.requestee;
  
  const viewProfile = (uid) => {
    //redirect to profile mode = 1
    Navigate('/profile', {state:{'mode': 1, 'uid': uid}});
  }

  const makeConnection = (uid) => {
    //createconnection(usrname_you_wanna_connect)
    createConnection(uid)
    .then(function(res){
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    });
  }

  useEffect(() => {
    console.log("hahha");
    console.log(otherUid);
  })
  
  return (
      <div className="request">
          <p>{otherUid}</p>
          <button onClick={() => makeConnection(otherUid)}>Accept</button>
          <button onClick={() => viewProfile(otherUid)}>View</button>
      </div>
  );
}

const PendingInvitations = ({vis}) => {
  const [connections, setConnections] = useState([]);
  let query = {
      "to": getLocalUserData(['uid'])['uid'],
      "pending": 1,
  }

  useEffect(() => {
      getConnections(query)
      .then(function(res){
          console.log(res.data.connections)
          setConnections(res.data.connections);
      });
  }, [])

    return ((vis == 1) ? (
      <div className="pendingInvitationsContainer">
        <p>Pending Invitations</p>
        { connections.map(obj => (
          <SentRequest requestee={obj.uidFrom}/>
        ))}
      </div>
    ) : null);
}
export default PendingInvitations;