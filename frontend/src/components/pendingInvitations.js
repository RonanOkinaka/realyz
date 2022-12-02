import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createConnection, getConnections, getLocalUserData, getUserData } from "../util/data";

const SentRequest = (props) => {
  const Navigate = useNavigate();
  const [usrData, setUsrData] = useState({});
  const otherUid = props.requestee;

  const viewProfile = (uid) => {
    //redirect to profile mode = 1
    Navigate('/profile', {state:{'mode': 1, 'uid': uid}});
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
          <button onClick={() => makeConnection(otherUid)}>Accept</button>
          <button id="viewprofilebutton" onClick={() => viewProfile(otherUid)}>View</button>
      </div>
  );
}

const PendingInvitations = ({vis}) => {
  const [connections, setConnections] = useState([]);
  const names = [];
  let query = {
      "pending" : 1,
      "to": getLocalUserData(['uid'])['uid'],
  }
  useEffect(() => {
  getConnections(query)
  .then(function(res){
      for (let i = 0; i < res.data.connections.length; i++){
          getUserData(res.data.connections[i]['uidTo']).then(function(r2) {
              names.push(r2.data.fname +" " + r2.data.lname);
              setConnections(names);
          });
        }
  });}, [])
  console.log(connections);
  return (vis==1) ?(
      <div className="pendingInvitationsContainer">
          <p>Pending Invitations (Accept or Deny)</p>
          {connections.map(obj => (
              <SentRequest requestee={obj} />
          ))}
      </div>
  ) : null;
}
export default PendingInvitations;