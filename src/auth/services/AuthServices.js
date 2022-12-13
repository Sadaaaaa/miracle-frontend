import api from "../api/index.js";
import axios from "axios";
import { API_URL } from "../api/index.js";

export default class AuthServices {

    // Create LOGIN request
    static async login(username, password) {
        return api.post(API_URL + '/login', { username, password })
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
        
        return api.post(API_URL + '/registration', formData, { 'Content-Type': 'multipart/form-data' });
    };

    // Create LOGOUT request
    static async logout() {
        return api.post(API_URL + '/logout')
    }

}