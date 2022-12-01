import React, { useState } from "react";
import { createConnection } from "../util/data";

const UserSnapShot = (props) => {
    const [usrData, setUsrData] = useState(props.info);
    const makeConnection = (uid) => {
        //createconnection(usrname_you_wanna_connect)
        createConnection(uid)
        .then(function(res){
            console.log(res);
        })
        .catch(function(err){
            console.log(err);
        });
    }
    return (
        <div className="profiledivcontainer">
            {Object.keys(usrData).map(field => (
                <React.Fragment>
                    <span className="profiledivname">{field}</span>
                    <div className="profilediv">
                        <p>{usrData[field]}</p>
                    </div>
                </React.Fragment>
            ))}
            <button onClick={() => makeConnection(props.info.uid)}>connect</button>
        </div>
    );
}

export default UserSnapShot;