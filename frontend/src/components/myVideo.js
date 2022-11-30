import axios from "axios";
import React, { useEffect, useState } from "react";
import { deleteMedia, getLocalUserData, uploadMedia, getMedia } from "../util/data";

//TODO: get Profile Video from server.
const ProfileVid = () => {
    const [profileVid, setProfileVid] = useState(getMedia(2, getLocalUserData(['uid'])['uid']));
    useEffect(() => {
    }, []);

    //TODO: stream data from the server after rendering.
    return (
        <div className="profilevidcontainer">
            <video className="profilevid" controls>
                <source src={profileVid}></source>
            </video>
        </div>
    );
}

//TODO: implement popup that uploads video to server
const ButtonEdit = () => {
    const [video, setVideo] = useState(null);
    const [err, setErr]= useState(null);
    const fileSuffixPattern = /(\.)(?!.*\.).*/;
    const uid = getLocalUserData(['uid'])['uid'];

    const handleInputChange = event => {
        //save local path to state
        setVideo(event.target.files[0]);
    }

    const handleOnClick = event => {
        //upload the file at the given path to server
        const fileSuffix = video.name.match(fileSuffixPattern)[0];
        console.log(fileSuffix);
        const formData = new FormData();
        formData.append(
            "file",
            video,
            video.name
        );
        //catch edge cases:
        if (fileSuffix !== ".mp4") {
            setErr("file type not supported.");
        }
        else {
            setErr(null);
            uploadMedia(formData, 2, uid)
                .then (function(response){
                    console.log(response);
                })
                .catch(function(error){
                    console.log(error);
                });
        }
    }

    useEffect(() => {
        
    }, [])

    return (
        <div className="buttonedit">
            <input type="file" onChange={handleInputChange}></input>
            <button className="buttonedit" onClick={handleOnClick}>edit</button>
            { err &&
                <p>{err}</p>
            }
        </div>
    );
}

const ButtonDelete = () => {
    const uid = getLocalUserData(['uid'])['uid'];
    const handleOnClick = event => {
        deleteMedia(2, uid)
        .catch(function(error){
            console.log(error);
        })
    }
    return (
        <button className="buttondelete" onClick={handleOnClick}>delete</button>
    );
}

const MyVideoBtns = () => {
    return (
        <div className="myvideobtns">
            <ButtonEdit />
            <ButtonDelete />
        </div>
    )
}

const MyVideo = ({vis}) => {
    return ((vis==0) ? (
        <div className="myvideocontainer">
            <p>My Video</p>
            <ProfileVid />
            <MyVideoBtns />
        </div>
    ): null);
}

export default MyVideo;