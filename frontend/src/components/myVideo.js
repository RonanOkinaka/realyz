import axios from "axios";
import React, { useEffect, useState } from "react";
import video from "../media/landing_page_video.mp4"
import { deleteMedia, getLocalUserData, uploadMedia } from "../util/data";

//TODO: get Profile Video from server.
const ProfileVid = () => {
    //TODO: stream data from the server after rendering.
    return (
        <div className="profilevidcontainer">
            {/* <video className="profilevid" controls> 
                <source src='/media/u/a/2' type="video/mp4"> </source>
            </video> */}

            <video className="profilevid" controls>
                <source src={video} type="video/mp4"></source>
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
        //catch edge cases:
        const fileSuffix = video.name.match(fileSuffixPattern)[0];
        console.log(fileSuffix);
        const formData = new FormData();
        formData.append(
            "file",
            video,
            video.name
        );
        if (fileSuffix !== ".mp4") {
            setErr("file type not supported.");
        }
        else {
            setErr(null);
            //FIXME:
            uploadMedia(formData, 2, uid)
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

const MyVideo = () => {
    return (
        <div className="myvideocontainer">
            <p>My Video</p>
            <ProfileVid />
            <MyVideoBtns />
        </div>
    );
}

export default MyVideo;