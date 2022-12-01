import React, { useEffect, useState } from "react";
import { getConnections, getLocalUserData } from "../util/data";
const SentRequest = ({requestee}) => {
    return (
        <div className="request">
            <p>{requestee}</p>
            <button>View Profile</button>
        </div>
    );
}

const PendingInvitations = ({vis}) => {
  //TODO: we don't have a function to get all pending invitations on the backend. Skip this for now.
  const [connections, setConnections] = useState([]);
  let query = {
      "from": getLocalUserData(['uid'])['uid'],
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
        {/* { connections.map(obj => (
          <SentRequest requestee={obj.uid}/>
        ))} */}
        <SentRequest requestee={"test"} />
        <SentRequest requestee={"test"} />
        <SentRequest requestee={"test"} />
        <SentRequest requestee={"test"} />
      </div>
    ) : null);
}
export default PendingInvitations;