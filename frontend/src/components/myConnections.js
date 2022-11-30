import React, { useEffect, useState } from "react";
import SamplePic from "../media/sample.jpg";
import { createConnection, getConnections, getLocalUserData } from "../util/data";

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
        console.log(connections);
    })

    //TODO: for searchbar: 
    //if getConnection(from=me, to=usr).data.connections != []
    //display all connections.uidTo

    return ((vis == 1) ? (
        <div className="myprofile">
            <p className="subheading">My Connections</p>
            <form action="/form/submit" method="GET">
                <input type="text" name="text" class="search" placeholder="Search here!" />
                <input type="submit" name="submit" class="submit" value="Search" />
            </form>
            <div class="connectionGallery">
                <Connection connectName={"Abhay Rao"} />
                <button onClick={handleOnClick}>check</button>
                <button onClick={makeConnection}>connect</button>
            </div>
        </div>
    ) : null);
}
export default MyConnections;