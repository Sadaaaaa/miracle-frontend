import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AuthService from '../auth/services/AuthService';
import { addCredentials } from '../store/reducers/authentication';
import './css/LoginPage.css';
import { useCookies } from 'react-cookie';
import { API_URL } from '../auth/api';

function LoginPage() {
  const [cookies, setCookie] = useCookies(['user']);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [jwtToken, setjwtToken] = useState('');
  const [userDto, setUserDto] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   axios.post(API_URL + "/login", { username, password })
  //     .then(response => {
  //       const tokenMap = new Map(Object.entries(response.data));
  //       console.log(tokenMap);
  //       const token = tokenMap.get("jwt");
  //       console.log(token);
  //       localStorage.setItem("JWT", token);
  //       setjwtToken(token);

  //     })
  // }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(username, password).then(
        (response) => {
          const tokenMap = new Map(Object.entries(response.data));
          const token = tokenMap.get("jwt");
          localStorage.setItem("JWT", token);
          setjwtToken(token);

          axios.get("http://localhost:8090/user?email=" + username, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((response) => {
            setCookie("user", JSON.stringify(response.data), { path: '/' });
            setUserDto(response.data);
            // localStorage.setItem("user", JSON.stringify(response.data));

          }).catch((err) => console.log("ERROR: " + err));

          navigate("/");
          // window.location.reload();
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
          user: userDto,
          isAuth: true
        }
      ));
    }
  }, [userDto])

  return (
    <div className='login-page__container'>

      <div className='login-page__title'>
        <h1>User Login</h1>
      </div>

      <form className="login-page__inputs">

        <div className='login-page__log'>
          <label className="login-page__log-label" htmlFor="login">Email</label>
          <input className='login-page__log-input' type="text" id='login' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className='login-page__pass'>
          <label className='login-page__pass-label' htmlFor="password">Password</label>
          <input className='login-page__pass-input' type="text" id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="login-page__btn" type="submit"
          onClick={handleLogin}>Submit</button>

      </form>


    </div>
  );
}

export default LoginPage;