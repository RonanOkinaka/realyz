import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createConnection } from "../util/data";

const UserSnapShot = (props) => {
    const [usrData, setUsrData] = useState(props.info);
    const navigate = useNavigate();
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
    
    const viewProfile = (uid) => {
        //redirect to profile mode = 1
        navigate('/profile', {state:{'mode': 1, 'uid': uid}});
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
            <button onClick={() => viewProfile(props.info.uid)}>view</button>
        </div>
    );
}

export default UserSnapShot;