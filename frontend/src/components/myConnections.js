import React, { useEffect, useState } from "react";
import SamplePic from "../media/sample.jpg";

const Connection = ({connectName}) => {
    return (
        <div class="item">
            <img src={SamplePic} />
            <span class="caption">{connectName}</span>
        </div>
    )
}
const MyConnections = ({ vis }) => {
    return ((vis == 1) ? (
        <div className="myprofile">
            <p className="subheading">My Connections</p>
            <form action="/form/submit" method="GET">
                <input type="text" name="text" class="search" placeholder="Search here!" />
                <input type="submit" name="submit" class="submit" value="Search" />
            </form>
            <div class="connectionGallery">
                <Connection connectName={"Abhay Rao"} />
            </div>
        </div>
    ) : null);
}
export default MyConnections;