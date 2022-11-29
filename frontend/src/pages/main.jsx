import React from "react";
import Navbar from "../components/navbar";
import Background from "../media/portalBackground.jpg"

const MainPage = (props) => {
    return (
        <body className="mainpage">
            <div className="backgroundcontainer" style={{ backgroundImage: `url(${Background})` }}>
                <Navbar isLanding={() => false}/>
                <UserRecommendation />
            </div>
        </body>
    )
}

export default MainPage;