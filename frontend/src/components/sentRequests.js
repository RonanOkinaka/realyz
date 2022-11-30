import React, { useEffect, useState } from "react";



const SentRequests = ({vis}) => {
    return (vis==1) ?(
        <div className="requestsContainer">
            <p>Sent Requests</p>
            <div className="request">
                <p>John Doe</p>
            </div>
            <div className="request">
                <p>John Doe</p>
            </div>
            <div className="request">
                <p>John Doe</p>
            </div>
            <div className="request">
                <p>John Doe</p>
            </div>
            <div className="request">
                <p>John Doe</p>
            </div>
        </div>
    ) : null;
}
export default SentRequests;