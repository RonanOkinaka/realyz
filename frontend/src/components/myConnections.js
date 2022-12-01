import React, { useEffect, useState } from "react";
import SamplePic from "../media/sample.jpg";
import { createConnection, deleteConnection, getConnections, getLocalUserData } from "../util/data";

const Connection = ({connectName}) => {
    return (
        <div class="item">
            <img src={SamplePic} />
            <span class="caption">{connectName}</span>
        </div>
    )
}
const MyConnections = ({ vis }) => {
    //WARNING: BUG, "pending": 0 also shows pending requests
    // to get completed requests, do not add pending at all.
    // if not found, data.connections = []
    // let query = {
    //     "from": getLocalUserData(['uid'])['uid'],
    //     "to": "harvey",
    //     "pending": 1,
    // }
    const [connections, setConnections] = useState([]);

    let query = {
        "from": getLocalUserData(['uid'])['uid'],
    }

    // data.connections:
    // {
    //     "connections": [
    //         {
    //             "uidTo": "nini_gmail_com",
    //             "uidFrom": "a",
    //             "status": 0
    //         }
    //     ]
    // }

    const delConnection = (requester, requestee) => {
        //deleteConnection(this_user, other_user)
        deleteConnection(requester, requestee)
        .then(function(res){
            console.log(res);
        })
        .catch(function(err){
            console.log(err);
        })
    }

    useEffect(() => {
        // console.log(getLocalUserData(['uid'])['uid']);
        // console.log(connections);
        //TODO: refresh the list when user modifies its connection
        getConnections(query)
        .then(function(res){
            setConnections(res.data.connections);
        });
    }, [])

    //TODO: for searchbar: 
    //if getConnection(from=me, to=usr).data.connections != []
    //display all connections.uidTo
    //TODO: for modal
    //TODO: display user first and last name instead of uid
    //TODO: display user picture instead of sample picture
    //TODO: handle CSS for each
    return ((vis == 1) ? (
        <div className="myprofile">
            <p className="subheading">My Connections</p>
            <form action="/form/submit" method="GET">
                <input type="text" name="text" class="search" placeholder="Search here!" />
                <input type="submit" name="submit" class="submit" value="Search" />
            </form>
            {connections.map(obj => (
                <div class="connectionGallery">
                    <Connection connectName={obj.uidTo} />
                    <button onClick={() => {deleteConnection(query.from, obj.uidTo)}}>del</button>
                </div>
            ))}
        </div>
    ) : null);
}
export default MyConnections;