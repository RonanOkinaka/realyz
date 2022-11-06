import React from "react";
import video from "../media/landing_page_video.mp4"

export default function VidBackground() {
    return (
        <video autoplay="" muted loop id="background">
            <source src={video} type="video/mp4"></source>
        </video>
    );
}