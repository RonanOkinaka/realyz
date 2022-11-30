import React from "react";

const Welcome = (props) => {
    const displayWelcome = (props) => {
        const {name} = props;
        if (name !== null) {
            return(
                <p className="greetings">Welcome, {name}</p>
            );
        }
        else {
            return <p className="greetings">Welcome</p>
        }
    }
    return (
        <>
            {displayWelcome(props)}
        </>
    );
}

export default Welcome;
