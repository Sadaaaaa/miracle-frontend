// import { makeAutoObservable } from "mobx";
// import { useContext } from "react";
// import { API_URL } from "../api";
// import AuthServices from "./AuthServices";



// export default class Store {

//     userDto = {};
//     isAuth = false;
//     isLoading = false;
//     isEnabled = null;

//     constructor() {

//     }

//     setAuth(bool) {
//         this.isAuth = bool;
//     }

//     setUser(userDto) {
//         this.userDto = userDto;
//     }

//     setLoading(bool) {
//         this.isLoading = bool;
//     }

//     setIsEnabled(bool) {
//         this.isEnabled = bool;
//     }

//     async login(username, password) {
//         try {
//             const response = await AuthServices.login(username, password);
//             console.log(response.data.userDto.is_enabled)
//             if (response.data.userDto.is_enabled !== false) {
//                 this.setIsEnabled(true);
//                 localStorage.setItem('token', response.data.accessToken);
//                 localStorage.setItem('refresh', response.data.refreshToken);
//                 this.setAuth(true);
//                 this.setUser(response.data.userDto);
//             }
//         } catch (e) {
//             console.log(e.response?.data?.message);
//         }
//     }

//     async registration(username, email, password, picture) {
//         try {

//             const response = await AuthServices.registration(username, email, password, picture);
//             console.log(response)
//             localStorage.setItem('token', response.data.accessToken);
//             this.setAuth(true);
//             this.setUser(response.data.userDto);
//         } catch (e) {
//             console.log(e.response?.data?.message);
//         }
//     }

//     async logout() {
//         try {
//             const response = await AuthServices.logout();
//             localStorage.removeItem('token');
//             localStorage.removeItem('refresh');
//             this.setAuth(false);
//             this.setUser({});
//         } catch (e) {
//             console.log(e.response?.data?.message);
//         }
//     }

//     async checkAuth() {
//         this.setLoading(true);
//         try {
//             const sukaBlyatEbychiiToken = localStorage.getItem('refresh');

//             const refreshToken = { 'refreshToken': sukaBlyatEbychiiToken };

//             const response = await api.post(API_URL + `/token`, refreshToken);

//             localStorage.setItem('token', response.data.accessToken);

//             this.setAuth(true);
//             this.setUser(response.data.userDto);
//         } catch (e) {
//             console.log(e.response?.data?.message);
//         } finally {
//             this.setLoading(false);
//         }
//     }
// }