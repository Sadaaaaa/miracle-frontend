import axios from "axios";
import { API_URL } from "../api";

const register = (username, email, password, picture) => {
    let formData = new FormData();

    if (username === '' || email === '' || password === '') {
        alert("All fields required!");
    } else {

        const user = {
            username: username,
            email: email,
            password: password
        }

        formData.append('file', picture);
        formData.append('user', JSON.stringify(user));

    }

    return axios.post(API_URL + "/registration", formData, { 'Content-Type': 'multipart/form-data' });
};

const login = (username, password) => {
    return axios.post(API_URL + "/login", { username, password });
        // .then((response) => {
        //     if (response.data) {
        //         localStorage.setItem("user", JSON.stringify(response.data));
        //     }

        //     return response.data;
        // });
};

const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "/signout").then((response) => {
        return response.data;
    });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;