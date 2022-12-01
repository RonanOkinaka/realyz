import React, { useEffect } from "react";
import video from "../media/landing_page_video.mp4";

const VidBackground = React.memo(function VidBackground(){
    useEffect(() => {
        console.log("vid loading");
    })
    return (
        <video autoplay="" muted loop id="background">
            <source src={video} type="video/mp4"></source>
        </video>
    );
});

export default VidBackground;