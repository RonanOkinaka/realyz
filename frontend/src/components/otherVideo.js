import React from "react";
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
    return (
        <button className="buttonedit">edit</button>
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

const OtherVideo = () => {
    return (
        <div className="myvideocontainer">
            <p>Profile Video</p>
            <ProfileVid />
            <MyVideoBtns />
        </div>
    );
}

export default OtherVideo;