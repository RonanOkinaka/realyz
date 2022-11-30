import React from "react";
import Navbar from "../components/navbar";
import Background from "../media/portalBackground.jpg"
import UserRecommendation from "../components/userRecommendation";
import SearchBar from "../components/searchBar";

const MainPage = (props) => {
    return (
        <body className="mainpage">
            <div className="backgroundcontainer" style={{ backgroundImage: `url(${Background})` }}>
                <Navbar isLanding={() => false}/>
                <p className="mainpagetitle">Discover Connections</p>
                <SearchBar />
                {/* <UserRecommendation /> */}
            </div>
        </body>
    )
}

export default MainPage;