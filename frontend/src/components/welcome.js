import React from "react";

const Welcome = (props) => {
    const displayWelcome = (props) => {
        const {name} = props;
        if (name !== null) {
            return(
                <p>Welcome, {name}</p>
            );
        }
        else {
            return <p>Welcome</p>
        }
    }
    return (
        <>
            {displayWelcome(props)}
        </>
    );
}

export default Welcome;
