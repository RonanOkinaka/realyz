import React, { useEffect } from "react";
import { searchQuery, searchUser, storeQuery } from "../util/data";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const navigate = useNavigate();
    const handleSubmit = event => {
        event.preventDefault();
        let fname = event.target.searchfield.value;
        console.log(fname);
        storeQuery('fname', fname);
        navigate('/search');
    }
    
    useEffect(() => {

    })

    return (
        <form className="formcontainer" onSubmit={handleSubmit}>
            <input
                className="searchbar"
                type="text"
                placeholder="search"
                name="searchfield"
            />
            <button type="submit">Search</button>
            {/* {err && <p>Error: {err}</p>} */}
        </form>
    )
}

export default SearchBar;