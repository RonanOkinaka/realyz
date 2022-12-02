import React, {useState, useEffect} from 'react';
import Welcome from './welcome';
import {getLocalUserData, getUserData} from '../util/data';

const Parent = () => {
    const [responseData, setResponseData] = useState(null);

    //update fname everytime after rendering
    useEffect(() => {
        fetchData(getLocalUserData(['uid'])['uid']);
    }, []);
    
    const fetchData = (param) => {
        getUserData(param)
            .then((response) => {
                const fname = response['data']['fname'];
                setResponseData(fname);
            })
    }
    
    return (
        <Welcome name={responseData}/>
    )
}

    
export default Parent;
