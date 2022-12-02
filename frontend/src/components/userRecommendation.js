import React, { useEffect, useState } from "react";
import { getRandomUsers } from "../util/data";
import UserSnapShot from "./userSnapshot";

const UserRecommendation = () => {
    const [res, setRes] = useState([]);
    //first, search with existing content
    useEffect(() => {
        getRandomUsers()
        .then(function(res){
            const firstNine = [];
            for(let i = 0; i < 9; i++){ 
                if(i == res.data.length) {
                    break;
                }
                firstNine.push(res.data[i]);
            }
            setRes(firstNine);
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