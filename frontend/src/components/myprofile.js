import React, { useEffect, useState } from "react";
import { getLocalUserData, getUserData } from "../util/data";
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
    const [field, setFields] = useState({});
    const [val, setVals] = useState([]);
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

    // let allData = fetchAllData();
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
    
    useEffect(() => {
        fetchAllData(uid);
        console.log(field);
    }, [])

    //TODO: pass in a key to each element in list
    return (
        <div className="profileformcontainer">
            {Object.keys(field).map(name => (
                <React.Fragment>
                    <span className="profileformname">{name}</span>
                    <input className="profileform" type="text" placeholder={field[name]} name="lastname"></input>
                </React.Fragment>
            ))}
        </div>
    );
}

const UserInfoUnEditable = () => {
    const [field, setFields] = useState({});
    // const [val, setVals] = useState([]);
    // let uid = getLocalUserData(['uid'])['uid'];
    //get ALL user data
    // const fetchAllData = () => {
    //     getUserData(uid)
    //         .then(function(response){
    //             return response['data'];
    //         })
    //         .catch(function(error){
    //             console.error("an error occurred fetching user data.");
    //         })
    // }

    // let allData = fetchAllData();
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
    
    useEffect(() => {
        setFields(allData);
        console.log(field);
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