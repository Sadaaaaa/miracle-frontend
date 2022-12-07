import './css/LoginPage.css'
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../auth/services/AuthService';
import { useDispatch } from 'react-redux';
import { addCredentials } from '../store/reducers/authentication';
import { Context } from "../index";
import { Redirect } from 'react-router';

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwtToken, setjwtToken] = useState('');
  const [userDto, setUserDto] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { context } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(username, password).then(
        (response) => {
          let tokenMap = new Map(Object.entries(response.data));
          let token = tokenMap.get("jwt");
          localStorage.setItem("token", token);
          setjwtToken(tokenMap.get("jwt"))

          axios.get("http://localhost:8090/user?email=" + username, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((response) => {
            setUserDto(JSON.stringify(response.data));
          }).catch((err) => console.log("ERROR: " + err));

          navigate("/");
          window.location.reload();

        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (userDto != null) {
      dispatch(addCredentials(
        {
          token: jwtToken,
          user: userDto
        }
      ));
    }
  }, [userDto])

  const handleHandle = (e) => {
    e.preventDefault();
    context.login(username, password);
    navigate("/");
  }

  return (
    <div className='login-page__container'>

      <div className='login-page__title'>
        <h1>User Login</h1>
      </div>

      <form className="login-page__inputs">

        <div className='login-page__log'>
          <label className="login-page__log-label" htmlFor="login">Login</label>
          <input className='login-page__log-input' type="text" id='login' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className='login-page__pass'>
          <label className='login-page__pass-label' htmlFor="password">Password</label>
          <input className='login-page__pass-input' type="text" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="login-page__btn" type="submit"
          onClick={handleHandle}>Submit</button>

      </form>


    </div>
  );
}

export default LoginPage;