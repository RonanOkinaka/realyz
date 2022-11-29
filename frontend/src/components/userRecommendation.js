import React from "react";

const UserSnapShot = () => {
    return (
        <div className="usersnapshot">
        </div>
    )
}
const UserRecommendationRow = () => {
    return (
        <div className="userrrecommendationrow">
            <UserSnapshot />
            <UserSnapshot />
            <UserSnapShot />
        </div>
    )
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