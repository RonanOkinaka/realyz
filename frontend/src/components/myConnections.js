import React, { useEffect, useState } from "react";
import SamplePic from "../media/sample.jpg";

const MyConnections = ({ vis }) => {
    return ((vis == 1) ? (
        <div className="myprofile">
            <p className="subheading">My Connections</p>
            <form action="/form/submit" method="GET">
                <input type="text" name="text" class="search" placeholder="Search here!" />
                <input type="submit" name="submit" class="submit" value="Search" />
            </form>
            <div class="connectionGallery">
                <div class="item">
                    <img src={SamplePic} />
                    <span class="caption">John Doe</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?12" />
                    <span class="caption">Ronan</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?13" />
                    <span class="caption">Abhay</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?14" />
                    <span class="caption">David</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?15" />
                    <span class="caption">Raj</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?15" />
                    <span class="caption">Raj</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?15" />
                    <span class="caption">Raj</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?15" />
                    <span class="caption">Raj</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?15" />
                    <span class="caption">Raj</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?15" />
                    <span class="caption">Raj</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?15" />
                    <span class="caption">Raj</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?15" />
                    <span class="caption">Raj</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?15" />
                    <span class="caption">Raj</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?15" />
                    <span class="caption">Raj</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?15" />
                    <span class="caption">Raj</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?15" />
                    <span class="caption">Raj</span>
                </div>
                <div class="item">
                    <img src="https://picsum.photos/190/190?15" />
                    <span class="caption">Raj</span>
                </div>
                
            </div>
        </div>
    ) : null);
}
export default MyConnections;