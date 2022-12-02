import React, { useEffect } from "react";
import { searchQuery, searchUser, storeQuery } from "../util/data";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const navigate = useNavigate();
    const handleSubmit = event => {
        let fname = event.target.searchfield.value;
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
            <button id='secondSearchBut' type="submit">Search</button>
            {/* {err && <p>Error: {err}</p>} */}
        </form>
    )
}

export default SearchBar;