import React, { useState } from "react";
import {createConnection, getConnections, deleteConnection} from "../util/data";
const UserSnapShot = (props) => {
    const [usrData, setUsrData] = useState(props.info);
    const connectTo = () =>{
        console.log(props.info.uid);
        createConnection(props.info.uid);
    }
    return (
        <div className="profiledivcontainer">
            {Object.keys(usrData).map(name => (
                <React.Fragment>
                    <span className="profiledivname">{name}</span>
                    <div className="profilediv">
                        <p>{usrData[name]}</p>
                    </div>
                </React.Fragment>
            ))}
            <button onClick={connectTo} id="connectBut">Connect</button>
        </div>
    );
}

export default UserSnapShot;