import axios, { AxiosHeaders } from "axios";

let userData = {};  //TODO: use sessionStorage to store userData
let bearerToken = "";

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

const signoutUser = () => axios({

})
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

export {userData, bearerToken, storeBearerToken, storeUserData, clearUserData, registerUser, loginUser, getUserData, dump};