import React, { useEffect, useState } from "react";

const SentRequest = ({requestee}) => {
    return (
        <div className="request">
            <p>{requestee}</p>
            <button>View Profile</button>
        </div>
    );
}

const PendingInvitations = ({vis}) => {
    return ((vis == 1) ? (
      <div className="pendingInvitationsContainer">
        <p>Pending Invitations</p>
        <SentRequest requestee={"Bruh"} />
        <SentRequest requestee={"Wtf"} />
        <SentRequest requestee={"Is"} />
        <SentRequest requestee={"This"} />
      </div>
    ) : null);
}
export default PendingInvitations;