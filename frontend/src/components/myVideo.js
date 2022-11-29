import axios from "axios";
import React, { useEffect, useState } from "react";
import video from "../media/landing_page_video.mp4"

//TODO: get Profile Video from server.
const ProfileVid = () => {
    return (
        <div className="profilevidcontainer">
            <video className="profilevid" autoplay="" muted loop>
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
            "myVideo",
            video,
            video.name
        );
        if (fileSuffix !== ".mp4") {
            setErr("file type not supported.");
        }
        else {
            setErr(null);
            // axios.post("...")
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
    return (
        <button className="buttondelete">delete</button>
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