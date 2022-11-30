import React, { useEffect, useState } from "react";
import { searchQuery, searchUser } from "../util/data";
import Background from "../media/portalBackground.jpg";
import Navbar from "../components/navbar";
import SearchBar from "../components/searchBar";
import UserSnapShot from "../components/userSnapshot";

const SearchResultPage = () => {
    const [res, setRes] = useState([]);
    //first, search with existing content
    useEffect(() => {
        searchUser(searchQuery)
        .then(function(res){
            setRes(res.data);
        });
    }, []);

    return (
        <body className="searchresultpage">
            <div className="backgroundcontainer" style={{ backgroundImage: `url(${Background})` }}>
                <Navbar isLanding={() => false}/>
                <p className="mainpagetitle">Search Results</p>
                <SearchBar />
                {res.map(obj => (
                    <UserSnapShot info={obj} />
                ))}
            </div>
        </body>
    );
}

export default SearchResultPage;