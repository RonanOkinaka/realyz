import axios, { AxiosHeaders } from "axios";

let userName = "";
let userData = {};  //TODO: use sessionStorage to store userData
let bearerToken = "";
let searchQuery = {};
let otherUserID = "";

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
        // Duct tape and zipties (crunch time...)
        if (param[i] === 'uid') {
            userData[param[i]] = val[i].replace(/[^_a-zA-Z0-9]/g, '_');
            // console.log(userData[param[i]]);
        } else {
            userData[param[i]] = val[i];
        }
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
    url: '/user/' + usrData['uid'],
    headers: {'Authorization': 'Bearer ' + bearerToken},
    data: usrData,
});

//type: 1 -> jpeg/png 2 -> mp4; media takes in a formData() object.
const uploadMedia = (media, type, uid) => axios ({
    method: 'post',
    baseURL: 'http://localhost:8080',
    url: '/media/' + uid + '/' + type,
    headers: {'Authorization': 'Bearer ' + bearerToken},
    data: media
});

// const getMedia = (type, uid) => axios ({
//     method: 'get',
//     baseURL: 'http://localhost:8080',
//     url: '/media/u/' + uid + '/' + type,
//     responseType: 'blob',
//     // headers: {'Accept': 'video/mp4; charset=UTF-8'}
// });

const getMedia = (type, uid) => {
    let url = 'http://localhost:8080/media/u/' + uid + '/' + type;
    return url;
}

const deleteMedia = (type, uid) => axios ({
    method: 'delete',
    baseURL: 'http://localhost:8080',
    url: '/media/u/' + uid + '/' + type,
    headers: {'Authorization': 'Bearer ' + bearerToken},
});

const storeQuery = (param, val) => {
    searchQuery[param] = val;
}

const clearQuery = () => {
    searchQuery = {};
};

const searchUser = (query, val) => axios ({
    method: 'get',
    baseURL: 'http://localhost:8080',
    url: '/search/',
    params: query,
});

const createConnection = (from, to) => axios ({
    method: 'get',
    baseURL: 'http://localhost:8080',
    url: '/connections/',
    headers: {'Authorization': 'Bearer ' + bearerToken},
    params: {
        'from': from,
        'to': to,
    }
});

const getConnections = (query) => axios ({
    method: 'get',
    baseURL: 'http://localhost:8080',
    url: '/connections/',
    headers: {'Authorization': 'Bearer ' + bearerToken},
    params: query
});

const dump = () => {
    console.log(userData);
};

export {userData, bearerToken, searchQuery, otherUserID, storeBearerToken, storeUserData, getLocalUserData, clearUserData, registerUser, 
    loginUser, getUserData, updateUserData, uploadMedia, getMedia, deleteMedia, searchUser, storeQuery, clearQuery, getConnections, dump};