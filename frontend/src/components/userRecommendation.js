import React, { useEffect, useState } from "react";
import { getRandomUsers } from "../util/data";
import UserSnapShot from "./userSnapshot";

const UserRecommendation = () => {
    const [res, setRes] = useState([]);
    //first, search with existing content
    useEffect(() => {
        getRandomUsers()
        .then(function(res){
            setRes(res.data);
        });
    }, []);
    
    return (
        <div className="userrecommendation">
        { res.map(obj => (
            <UserSnapShot info={obj} />
        ))}
        </div>
    )
}

export default UserRecommendation;