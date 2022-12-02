import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createConnection, getConnections, deleteConnection, getLocalUserData, getUserData } from "../util/data";

const SentRequest = (props) => {
  const navigate = useNavigate();
  const [usrData, setUsrData] = useState({});
  const otherUid = props.requestee;
  
  const viewProfile = (uid) => {
    //redirect to profile mode = 1
    navigate(`/profile/${uid}`);
  }

  const getName = () => {
    let fname = usrData.fname;
    let lname = usrData.lname;
    let fullName = [fname, lname].join(' ');
    return fullName;
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
    getUserData(props.requestee)
    .then(function(res){
        setUsrData(res.data);
    })
  }, [])
  return (
      <div className="request">
          <p>{getName()}</p>
          <button id="viewprofilebutton" onClick={() => viewProfile(otherUid)}>View</button>
          <button className="acceptinvitebut" onClick={() => makeConnection(otherUid)}>Accept</button>
          <button className="denyinvitebut" onClick={() => deleteConnection(getLocalUserData(['uid'])['uid'],otherUid)}>Deny</button>
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
  
  useEffect(() => {
    getConnections(query)
    .then(function(res){
        console.log(res.data.connections)
        setConnections(res.data.connections);
    });
})

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