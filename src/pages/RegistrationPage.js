import axios from 'axios';
import React, { useContext, useState } from 'react';
import AuthService from '../auth/services/AuthService';
import { Context } from "../index";
import './css/RegistrationPage.css';
import { API_URL } from '../auth/api';

function RegistrationPage() {
    const [picture, setPicture] = useState("");
    const { context } = useContext(Context);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleName = (e) => {
        setUser(prev => ({
            ...prev,
            username: e.target.value
        }));
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setUser(prev => ({
            ...prev,
            email: e.target.value
        }));
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setUser(prev => ({
            ...prev,
            password: e.target.value
        }));
        setSubmitted(false);
    };

    // Handling the file uploading
    const onFileChange = (e) => {
        setPicture(e.target.files[0])
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register(user.username, user.email, user.password, picture).then(
                (response) => {
                    console.log("Sign up successfully", response.data);
                    localStorage.setItem("token", response.data.token);
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();

        if (user.username === '' || user.email === '' || user.password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);

            formData.append('file', picture);
            formData.append('user', JSON.stringify(user));

            axios({
                method: "POST",
                url: API_URL + "/registration/",
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(res => {
                    console.log(res.data)
                    if (res.data === true) {
                        // window.location.href = "http://localhost:8090" + "/auth"
                    }
                })
                .catch(() => {
                    alert("An error occurred on the server")
                })
        }
    };

    // Showing success message
    const successMessage = () => {
        return (
            <div
                className="success"
                style={{
                    display: submitted ? '' : 'none',
                }}>
                <h1>User {user.username} successfully registered!!</h1>
            </div>
        );
    };

    // Showing error message if error is true
    const errorMessage = () => {
        return (
            <div
                className="error"
                style={{
                    display: error ? '' : 'none',
                }}>
                <h1>Please enter all the fields</h1>
            </div>
        );
    };

    const handleHandle = (e) => {
        e.preventDefault();
        context.registration(user.username, user.email, user.password);
      }

    return (
        <div className="form__registration">
            <div className='title__registration'>
                <h1>User Registration</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages__registration">
                {errorMessage()}
                {successMessage()}
            </div>

            <form className='inputs_registration'>
                {/* Labels and inputs for form data */}

                <div className="name_registration">
                    <label className="name_label">Name</label>
                    <input onChange={handleName} className="name_input" value={user.username} type="text" />
                </div>

                <div className="email_registration">
                    <label className="email_label">Email</label>
                    <input onChange={handleEmail} className="email_input" value={user.email} type="email" />
                </div>

                <div className="password_registration">
                    <label className="password_label">Password</label>
                    <input onChange={handlePassword} className="password_input" value={user.password} type="password" />
                </div>

                <input className='photo_registration' type="file" name="." id="." onChange={onFileChange} />

                <button onClick={handleHandle} className="registration_btn" type="submit">Submit</button>

            </form>
        </div>
    );
}

export default RegistrationPage;