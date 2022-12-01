import React, { useEffect, useState } from "react";
import SamplePic from "../media/sample.jpg";
import { createConnection, getConnections, getLocalUserData } from "../util/data";

const Connection = ({connectName}) => {
    return (
        <div className="item">
            <img src={SamplePic} />
            <span className="caption">{connectName}</span>
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
    //TODO: get user's connection

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
    
    const handleOnClick = event => {
        getConnections(query)
        .then(function(res){
            console.log(res);
            setConnections(res.data.connections);
        });
    }

    const makeConnection = event => {
        //createconnection(usrname_you_wanna_connect)
        createConnection('zichengzhao_g_ucla_edu')
        .then(function(res){
            console.log(res);
        });
    }

    useEffect(() => {
        console.log(getLocalUserData(['uid'])['uid']);
        console.log(connections);
    })
    useEffect(() => {
        getConnections(query)
        .then(function(res){
            console.log(res);
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
                <input type="text" name="text" className="search" placeholder="Search here!" />
                <input type="submit" name="submit" className="submit" value="Search" />
            </form>
            {connections.map(obj => (
                <div className="connectionGallery">
                    <Connection connectName={obj.uidTo} />
                    <button onClick={handleOnClick}>check</button>
                    <button onClick={makeConnection}>connect</button>
                </div>
            ))}
        </div>
    ) : null);
}
export default MyConnections;