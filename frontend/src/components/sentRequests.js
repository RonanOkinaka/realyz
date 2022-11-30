import React, { useEffect, useState } from "react";

const SentRequest = ({requestee}) => {
    return (
        <div className="request">
            <p>{requestee}</p>
            <button>View Profile</button>
        </div>
    );
}

const SentRequests = ({vis}) => {
    return (vis==1) ?(
        <div className="requestsContainer">
            <p>Sent Requests</p>
            <SentRequest requestee="James Sattler" />
            <SentRequest requestee="Harvey Zhao" />
            <SentRequest requestee="Ronan Ok" />
            <SentRequest requestee="Harvey Zhao" />
        </div>
    ) : null;
}
export default SentRequests;