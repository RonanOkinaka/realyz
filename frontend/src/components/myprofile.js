import React, { useEffect, useState } from "react";
import { bearerToken, getLocalUserData, getUserData, updateUserData } from "../util/data";
import SamplePic from "../media/sample.jpg";

const Pic = () => {
    return (
        <div className="piccontainer">
            <img className="pic" src={SamplePic} alt="samplePic"></img>
        </div>
    );
}

const FullName = () => {
    return (
        <p className="fullname">Fred Check</p>
    )
}

const ConnectionCount = () => {
    return (
        <button>100 connections</button>
    )
}

//takes in an array iterate through each and display value.
const UserInfoEditable = (userInfo) => {
    const [update, setUpdate] = useState(false);
    const [field, setFields] = useState({}); //field is an array of keys
    //get cached user data
    let uid = getLocalUserData(['uid'])['uid'];
    // get ALL user data
    const fetchAllData = (uid) => {
        getUserData(uid)
            .then(function(response){
                setFields(response['data']);
            })
            .catch(function(error){
                console.error(error)
                console.error("an error occurred fetching user data.");
            })
    }

    const handleInputChange = event => {
        let key = event.target.name;
        let val = event.target.value;
        let tempField = field;
        tempField[key] = val;
        setFields(tempField);
        console.log(field);
    }

    const handleSubmit = event => {
        updateData(field);
        event.preventDefault();
    }

    useEffect(() => {
        fetchAllData(uid);
    }, [update]);

    const updateData = (data) => {
        console.log(bearerToken);
        updateUserData(data)
            .then(function(response){
                setUpdate(!update);
            })
            .catch(function(error){
                console.log(bearerToken);
                console.log(error)
                console.error("cznndiodfoaofmowf");
            })
    }

    //TODO: pass in a key to each element in list
    return (
        <form className="profileformcontainer" onSubmit={handleSubmit}>
            {Object.keys(field).map(name => (
                <React.Fragment>
                    <span className="profileformname">{name}</span>
                    <input 
                        className="profileform" 
                        type="text" 
                        placeholder={field[name]} 
                        name={name}
                        onChange={handleInputChange}
                    >
                    </input>
                </React.Fragment>
            ))}
            <button type="submit">update</button>
        </form>
    );
}

const UserInfoUnEditable = () => {
    const [field, setFields] = useState({});
    //TODO: delete this testing data.
    let allData = {
        "uid": "a",
        "email": "a",
        "fname": "a",
        "lname": "a",
        "type": "individual",
        "company": "hyundai",
        "biography": "what's up g"
    };
    
    // get ALL user data
    const fetchAllData = (uid) => {
        getUserData(uid)
            .then(function(response){
                setFields(response['data']);
            })
            .catch(function(error){
                console.error(error)
                console.error("an error occurred fetching user data.");
            })
    }
    
    useEffect(() => {
        setFields(allData);
        // console.log(field);
    }, [])

    //TODO: pass in a key to each element in list
    return (
        <div className="profiledivcontainer">
            {Object.keys(field).map(name => (
                <React.Fragment>
                    <span className="profiledivname">{name}</span>
                    <div className="profilediv">
                        <p>{field[name]}</p>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}

const OtherProfile = () => {
    return (
        <div className="otherprofile">
            <Pic />
            <FullName />
            <ConnectionCount />
            <UserInfoUnEditable />
        </div>
    );
}

const MyProfile = () => {
    return (
        <div className="myprofile">
            <Pic />
            <p className="subheading">My Profile</p>
            <UserInfoEditable />
        </div>
    )
}

export {MyProfile, OtherProfile, Pic};