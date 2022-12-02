import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalUserData, getConnections, getUserData } from "../util/data";

const SentRequest = (props) => {
    const Navigate = useNavigate();
    const otherUid = props.requestee;

    const viewProfile = (uid) => {
      //redirect to profile mode = 1
      Navigate('/profile', {state:{'mode': 1, 'uid': uid}});
    }

    useEffect(() => {
      console.log("hahha");
      console.log(otherUid);
    })
    return (
        <div className="request">
            <p>{otherUid}</p>
            <button onClick={() => viewProfile(otherUid)}>View Profile</button>
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