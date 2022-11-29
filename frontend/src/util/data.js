import axios, { AxiosHeaders } from "axios";

let userData = {};  //TODO: use sessionStorage to store userData
let bearerToken = "";

/*
{
    "data": {
        "uid": "a",
        "email": "a",
        "fname": "a",
        "lname": "a",
        "type": null,
        "company": null,
        "biography": null
    },
}
*/

const storeUserData = (param, val) => {
    for (let i = 0; i < param.length; i++)
    {
        userData[param[i]] = val[i];
    }
}

//takes in a list of requested user datatypes, return a list of corresponding values.
function getLocalUserData(param){
    let selectedData = {};
    for (let i = 0; i < param.length; i++)
    {
        selectedData[param[i]] = userData[param[i]];
    }
    return selectedData;
}

const storeBearerToken = (token) => {
    bearerToken = token;
}

const clearUserData = () => {
    userData = {};
    bearerToken = "";
}

const registerUser = () => axios({
    method: 'post',
    baseURL: 'http://localhost:8080',
    url: '/user/',
    data: userData
});

const loginUser = () => axios({
    method: 'post',
    baseURL: 'http://localhost:8080',
    url: '/session/login',
    data: userData  //backend only takes uid and pass fields in userData.
});

//TODO: get user profile picture
const getUserData = (uid) => axios ({
    method: 'get',
    baseURL: 'http://localhost:8080',
    url: "/user/" + uid,
});

//takes a incomplete/complete user data object, update the database.
const updateUserData = (usrData) => axios ({
    method: 'patch',
    baseURL: 'http://localhost:8080',
    url: "/user/" + usrData['uid'],
    headers: {'Authorization': 'Bearer ' + bearerToken},
    data: usrData,
})

const dump = () => {
    console.log(userData);
}

export {userData, bearerToken, storeBearerToken, storeUserData, getLocalUserData, clearUserData, registerUser, loginUser, getUserData, updateUserData, dump};