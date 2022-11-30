import React from "react";

const UserSnapShot = () => {
    return (
        <p>hfih</p>
    );
}

const UserRecommendationRow = () => {
    return (
        <div className="userrrecommendationrow">
            <UserSnapShot />
            <UserSnapShot />
            <UserSnapShot />
        </div>
    );
}
const UserRecommendation = () => {
    return (
        <div className="userrecommendation">
            <UserRecommendationRow />
            <UserRecommendationRow />
            <UserRecommendationRow />
        </div>
    )
}

export default UserRecommendation;