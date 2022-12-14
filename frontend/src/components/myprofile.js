import React, { useEffect, useState } from "react";
import { deleteMedia, getConnectionCount, getLocalUserData, getUserData, updateUserData, uploadMedia } from "../util/data";
import ConnectIcon from "../media/addConnections.png";
import ExplorePic from "../media/explore.png";
import SamplePic from "../media/default-user.png";
import { useNavigate } from "react-router-dom";

//TODO: get profile picture
const Pic = (props) => {
    const addImageFallback = (event) => {
        event.currentTarget.src = SamplePic;
    };
    return (
        <div className="piccontainer">
            <img className="pic" src={['http://localhost:8080/media/u/', props.uid, '/1'].join('')} onError={addImageFallback}></img>
        </div>
    );
}



const ProfilePic = (props) => {
    const addImageFallback = (event) => {
        event.currentTarget.src = SamplePic;
    };
    return (
        <div id="profpic" className="piccontainer">
            <img className="pic" src={['http://localhost:8080/media/u/', props.uid, '/1'].join('')} onError={addImageFallback}></img>
        </div>
    );
}

const ConnectionsIcon = () => {
    return (
        <div className="piccontainer">
            <img className="pic" src={ConnectIcon} alt="manageConnect"></img>
        </div>
    );
}

const Explore = () => {
    return (
        <div className="piccontainer">
            <img className="pic" src={ExplorePic} alt="manageConnect"></img>
        </div>
    );
}
const FullName = (props) => {
    return (
        <p className="fullname">
            {[props.info['fname'], props.info['lname']].join(' ')}
        </p>
    )
}

//TODO: get connection count
const ConnectionCount = (props) => {
    const [c, setC] = useState("");

    const getNumConnections = (uid) => {
        getConnectionCount(uid)
        .then(function(res) {
            setC(res.data.count);
        })
    }
    useEffect(() => {
        getNumConnections(props.uid)
    }, []);

    return (
        <button>{c} connections</button>
    )
}

//takes in an array iterate through each and display value.
const UserInfoEditable = (userInfo) => {
    const navigate = useNavigate();
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
            .catch(function(error){h
                console.error(error)
                console.error("an error occurred fetching user data.");
            })
    }

    const handleProfileChange = event => {
        let key = event.target.name;
        let val = event.target.value;
        let tempField = field;
        tempField[key] = val;
        setFields(tempField);
    }

    const handleSubmit = event => {
        updateData(field);
        event.preventDefault();
        window.location.reload();
    }

    useEffect(() => {
        fetchAllData(uid);
    }, [update]);

    const updateData = (data) => {
        updateUserData(data)
            .then(function(response){
                setUpdate(!update);
            })
            .catch(function(error){
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
                        //descriptive name : previous was "handleInputChange"
                        onChange={handleProfileChange}
                    >
                    </input>
                </React.Fragment>
            ))}
            <button type="submit">update</button>
        </form>
    );
}

const UserInfoUnEditable = (props) => {
    return (
        <div className="profiledivcontainer">
            {Object.keys(props.info).map(name => (
                <React.Fragment>
                    <span className="profiledivname">{name}</span>
                    <div className="profilediv">
                        <p>{props.info[name]}</p>
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
}

//takes in a userData object
const OtherProfile = (props) => {
    console.log(`props.info: ${props.info}`);
    return (
        <div className="otherprofile">
            <Pic uid={props.info['uid']}/>
            <FullName info={props.info}/>
            <UserInfoUnEditable info={props.info}/>
        </div>
    );
}

const ButtonDelete = () => {
    const uid = getLocalUserData(['uid'])['uid'];
    const handleOnClick = event => {
        deleteMedia(1, uid);
    }
    return (
        <button className="buttondelete" onClick={handleOnClick}>delete</button>
    );
}

const MyProfile = ({vis}) => {
    const [pic, setPic] = useState(null);
    const [err, setErr]= useState(null);
    const fileSuffixPattern = /(\.)(?!.*\.).*/;
    const uid = getLocalUserData(['uid'])['uid'];

    const handleInputChange = event => {
        //save local path to state
        setPic(event.target.files[0]);
    }

    const handleOnClick = event => {
        //upload the file at the given path to server
        const fileSuffix = pic.name.match(fileSuffixPattern)[0];
        const formData = new FormData();
        formData.append(
            "file",
            pic,
            pic.name
        );
        //catch edge cases:
        if (fileSuffix !== ".jpeg" && fileSuffix !== ".png") {
            setErr("file type not supported.");
        }
        else {
            setErr(null);
            uploadMedia(formData, 1, uid)
                // .then (function(response){
                //     console.log(response);
                // })
                // .catch(function(error){
                //     console.log(error);
                // });
        }
    }
    return ((vis==0) ? (
        <>
            <div className="myprofile" id="profile">
                <ProfilePic uid={uid}/>
                <div className="pfpbuttons">
                    <button className="buttonedit" onClick={handleOnClick}>edit</button>
                    { err &&
                        <p>{err}</p>
                    }
                    <ButtonDelete />
                </div>
                <div id="btn_upload_data">
                    <input id="choosefilebut" type="file" onChange={handleInputChange}></input>
                </div>
                <p className="subheading">My Profile</p>
                <UserInfoEditable />
            </div>
        </>
        
    ) : null ) ;
}

export {MyProfile, OtherProfile, Pic, ConnectionsIcon, Explore};