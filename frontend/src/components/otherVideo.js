import React from "react";
import video from "../media/landing_page_video.mp4"

//TODO: get Profile Video from server.
const ProfileVid = (props) => {
    return (
        <div className="profilevidcontainer">
            <video className="profilevid" controls>
                <source src={['http://localhost:8080/media/u/', props.uid, '/2'].join('')} type="video/mp4"></source>
            </video>
        </div>
    );
}

const OtherVideo = (props) => {
    return (
        <div className="myvideocontainer">
            <p>Profile Video</p>
            <ProfileVid uid={props.uid}/>
        </div>
    );
}

export default OtherVideo;