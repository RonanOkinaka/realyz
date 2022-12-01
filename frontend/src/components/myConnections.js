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
    const [searchResult, setSearchResult] = useState([]);

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
    //TODO: make it a substring search & allow users to serach by other properties.
    const searchConnections = (uid) => {
        let result = [];
        for (const obj of connections) {
            if (obj.uidTo === uid) {
                //add this to the list of obj.
                result.push(obj);
            }
        }
        return result;
    }

    const handleSubmit = event => {
        //TODO: search uid from connections.
        event.preventDefault();
        let searchInput = event.target.connectionField.value;
        if (searchInput === '') {
            // fetch all results
            setSearchResult(connections);
        } else {
            //get an array of matching connections
            setSearchResult(searchConnections(event.target.connectionField.value));
        }
        console.log(searchResult);
    }

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

    const viewProfile = (uid) => {
        //redirect to profile mode = 1
        Navigate('/profile', {state:{'mode': 1, 'uid': uid}});
    }

    useEffect(() => {
        // console.log(getLocalUserData(['uid'])['uid']);
        // console.log(connections);
        //TODO: refresh the list when user modifies its connection
        getConnections(query)
        .then(function(res){
            setConnections(res.data.connections);
            setSearchResult(res.data.connections);
        });
    }, [])

    //TODO: for searchbar: 
    //if getConnection(from=me, to=usr).data.connections != []
    //display all connections.uidTo
    //TODO: for modal
    //TODO: display user first and last name instead of uid
    //TODO: display user picture instead of sample picture
    //TODO: handle CSS for each

    //TODO: add view profile function 
    return ((vis == 1) ? (
        <div className="myprofile">
            <p className="subheading">My Connections</p>
            <form onSubmit={handleSubmit}>
                <input className="search" type="text" name="connectionField" placeholder="search connection" />
                <button type="submit">search</button>
            </form>
            {searchResult.map(obj => (
                <div class="connectionGallery">
                    <Connection connectName={obj.uidTo} />
                    <button onClick={() => {deleteConnection(query.from, obj.uidTo)}}>del</button>
                    <button onClick={() => {() => viewProfile(uid)}}>view </button>
                </div>
            ))}
        </div>
    ) : null);
}
export default MyConnections;