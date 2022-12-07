import { makeAutoObservable } from "mobx";
import AuthServices from "./AuthServices";
import axios from 'axios';

export default class Store {

    userDto = {};
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(userDto) {
        this.userDto = userDto;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }



    async login(username, password) {
        try {
            const response = await AuthServices.login(username, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refresh', response.data.refreshToken);
            this.setAuth(true);
            this.setUser(response.data.userDto);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(username, email, password) {
        try {

            const response = await AuthServices.registration(username, email, password);
            console.log(response)
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.userDto);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            const response = await AuthServices.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            console.log("СУКА БЛЯТЬ!!!")
            const sukaBlyatEbychiiToken = localStorage.getItem('refresh');
            const refreshToken = {'refreshToken': sukaBlyatEbychiiToken};            
            const response = await axios.post(`token`, refreshToken);
            // console.log(response);
            // console.log(response.data.accessToken);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.userDto);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}