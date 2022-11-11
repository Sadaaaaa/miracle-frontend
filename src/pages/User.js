import './user.css';
import React, { useState } from 'react'
import axios from 'axios';
import validator from 'validator';
// import { DOMEN_SERVER, DOMEN_SITE } from '../../config/const';

function User() {
    // States for registration
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for checking the errors
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling the name change
    const handleName = (e) => {
        setName(e.target.value);
        setSubmitted(false);
    };

    // Handling the email change
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setSubmitted(false);
    };

    // Handling the password change
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setSubmitted(false);
    };

    // Handling the form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            setError(true);
        } else {
            setSubmitted(true);
            setError(false);

            axios.post("http://localhost:8090" + "/users/", {
                username: name,
                email: email,
                password: password,
            }).then(res => {
                if (res.data === true) {
                    window.location.href = "http://localhost:8090" + "/auth"
                }
            }).catch(() => {
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
                <h1>User {name} successfully registered!!</h1>
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

    return (
        <div className="form">
            <div>
                <h1>User Registration</h1>
            </div>

            {/* Calling to the methods */}
            <div className="messages">
                {errorMessage()}
                {successMessage()}
            </div>

            <form>
                {/* Labels and inputs for form data */}
                <label className="label">Name</label>
                <input onChange={handleName} className="input"
                    value={name} type="text" />

                <label className="label">Email</label>
                <input onChange={handleEmail} className="input"
                    value={email} type="email" />

                <label className="label">Password</label>
                <input onChange={handlePassword} className="input"
                    value={password} type="password" />

                <button onClick={handleSubmit} className="btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
}

//     const [register, setRegister] = useState(() => {
//         return {
//             username: "",
//             email: "",
//             password: "",
//             password2: "",
//         }
//     })

//     const changeInputRegister = event => {
//         event.persist()
//         setRegister(prev => {
//             return {
//                 ...prev,
//                 [event.target.name]: event.target.value,
//             }
//         })
//     }


//     const submitChackin = event => {
//         event.preventDefault();
//         if(!validator.isEmail(register.email)) {
//             alert("You did not enter email")
//         } else if(register.password !== register.password2) {
//             alert("Repeated password incorrectly")
//         } else if(!validator.isStrongPassword(register.password, {minSymbols: 0})) {
//             alert("Password must consist of one lowercase, uppercase letter and number, at least 8 characters")
//         } else {
//             axios.post("http://localhost:8090" + "/users/", {
//                 username: register.username,
//                 email: register.email,
//                 password: register.password,
//             }).then(res => {
//                 if (res.data === true) {
//                     window.location.href = "http://localhost:8090" + "/auth"
//                 } else {
//                     alert("There is already a user with this email")
//                 }
//             }).catch(() => {
//                 alert("An error occurred on the server")
//             })
//         }
//     }
//     return (
//         <div className="form">
//         <h2>Register user:</h2>
//         <form onSubmit={submitChackin}>
//             <p>Name: <input 
//             type="username"
//             id="username"
//             name="username"
//             value={register.username}
//             onChange={changeInputRegister}
//             /></p>
//             <p>Email: <input 
//             type="email"
//             id="email"
//             name="email"
//             value={register.email}
//             onChange={changeInputRegister}
//             formnovalidate
//             /></p>
//             <p>Password: <input 
//             type="password"
//             id="password"
//             name="password"
//             value={register.password}
//             onChange={changeInputRegister}
//             /></p>
//             <p>Repeat password: <input 
//             type="password"
//             id="password2"
//             name="password2"
//             value={register.password2}
//             onChange={changeInputRegister}
//                 /></p>
//             <input type="submit"/>
//         </form>
//     </div>
//     )
// }

export default User;