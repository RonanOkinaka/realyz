import React, { useState } from "react";

const UserSnapShot = (props) => {
    const [usrData, setUsrData] = useState(props.info);

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
        </div>
    );
}

export default UserSnapShot;