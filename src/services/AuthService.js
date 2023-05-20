import axios from 'axios';

const API_BASE_URL = 'https://localhost:7206/api';

export async function login(email, password) {
    const response = await axios.post(`${API_BASE_URL}/identity/login`, {
        email: email,
        password: password
    }, {
        withCredentials: true
    });
    return response.data;
}

export async function getAccessToken() {
    const response = await axios.get(`${API_BASE_URL}/identity/token/access`, {
        withCredentials: true
    });
    return response.data.data.accessToken;
}

export async function getUserInfo(userId, userToken) {
    const response = await axios.get(`${API_BASE_URL}/users?guid=${userId}`, {
        headers: { 'Authorization': `Bearer ${userToken}` }
    });
    return response.data.data;
}

export async function signup(userName, firstName, middleName, lastName, country, email, password) {
    const response = await axios.post(`${API_BASE_URL}/identity/new`, {
        userName: userName,
        firstname: firstName,
        middlename: middleName,
        lastname: lastName,
        country: country,
        email: email,
        password: password
    })
    return response.data
}