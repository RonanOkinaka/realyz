import React from "react";
import axios, { AxiosHeaders } from "axios";

const userData = {};
const bearerToken = '';
const responseStatus = 0;

/*    
data: {
    "uid": "test0",
    "pass": "test888",
    "fname": "fred",
    "lname": "test"
}
*/

const storeUserData = (param, val) => {
    for (let i = 0; i < param.length; i++)
    {
        userData[param[i]] = val[i];
    }
}

const clearUserData = () => {
    userData = {};
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
    data: userData //FIXME: only pass in uid and pass fields
}).then(function (response) {
    bearerToken = response['data']['token'];
    console.log(bearerToken);
});

const getUserData = (uid) => axios ({
    method: 'get',
    baseURL: 'http://localhost:8080',
    url: "/user/" + uid,
}).then(function (response) {
    // console.log(bearerToken);
    // console.log(response);
});


const dump = () => {
    console.log(userData);
}

export {userData, bearerToken, responseStatus, storeUserData, clearUserData, registerUser, loginUser, getUserData, dump};