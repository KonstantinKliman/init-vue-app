import api from "@/api";

export async function login(email, password){
    const response = await api.post(`/identity/login`, {
        email: email,
        password: password
    }, {
        withCredentials: true
    });
    return response.data;
}

export async function getAccessToken() {
    const response = await api.get(`/identity/token/access`, {
        withCredentials: true
    });
    return response.data.data.accessToken;
}

export async function getUserInfo(userId, userToken) {
    const response = await api.get(`/users?guid=${userId}`, {
        headers: { 'Authorization': `Bearer ${userToken}` }
    });
    return response.data.data;
}

export async function signup(userName, firstName, middleName, lastName, country, email, password) {
    const response = await api.post(`/identity/new`, {
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