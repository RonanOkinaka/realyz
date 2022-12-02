import React, { useEffect } from "react";
import Navbar from "../components/navbar";
import Background from "../media/portalBackground.jpg"
import UserRecommendation from "../components/userRecommendation";
import SearchBar from "../components/searchBar";
import SidebarMain from "../components/sideBarMainPage";
import useModal from "../util/useModal";import { getRandomUsers } from "../util/data";

const MainPage = () => {
    const {vis, toggle} = useModal();
    return (
        <body className="mainpage">
            <div className="backgroundcontainer" style={{ backgroundImage: `url(${Background})` }}>
                <SidebarMain show={(num) => {toggle(num)}}/>
                <Navbar isLanding={() => false}/>
                <p className="mainpagetitle">Discover Connections</p>
                <SearchBar />
                {/* <UserRecommendation /> */}
            </div>
        </body>
    )
}

export default MainPage;