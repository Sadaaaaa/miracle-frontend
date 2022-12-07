import api from "./index.js";
import { AxiosResponse } from 'axios';
import axios from "axios";

export default class AuthServices {

    // Create LOGIN request
    static async login(username, password) {
        return api.post('/login', { username, password })
    }

    // Create REGISTER request
    static async registration(username, email, password, picture) {
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

        return axios.post('/registration', formData, { 'Content-Type': 'multipart/form-data' });
    };

    // Create LOGOUT request
    static async logout() {
        return api.post('/logout')
    }

}