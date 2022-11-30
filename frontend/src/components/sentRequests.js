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
            <SentRequest requestee={"Abhay"} />
            <SentRequest requestee={"Raj"} />
            <SentRequest requestee={"Ronan"} />
            <SentRequest requestee={"David"} />
        </div>
    ) : null;
}
export default SentRequests;