import { NavLink, Route, Routes } from 'react-router-dom';
import StartPage from './pages/StartPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AdminUsers from './pages/AdminUsers';
import ItemPostPage from './pages/ItemPostPage';
import ItemListPage from './pages/ItemListPage';
import Item from './components/cards/Item';
import Test from './components/cards/Test';
import { Link } from 'react-router-dom';
import NewAdBtn from './components/ui/newAdBtn';
import './App.css';


import React, { useContext, useEffect } from 'react';
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  const { context } = useContext(Context);

  if (context.isLoading) {
    return <div>Загрузка...</div>
  }

  const handleHandle = (e) => {
    e.preventDefault();
    context.logout();
    navigate("/");
  }

  return (
    <div className="react-root">
      <div className="wrap_head">
        <header className='header_app'>
          <NewAdBtn />
          <div className='nav'>
            <Link className="reg__link" to={'/login'} >Login</Link>
            <Link className="reg__link" to={'/registration'} >Registration</Link>
            <Link className="reg__link" onClick={handleHandle}>Logout</Link>
          </div>
          {/* <p className="email_sign" hidden={context.userDto.email === ''}>{context.userDto.email}</p> */}
        </header>
      </div>

      <div className="wrap_foot">
        <footer className='footer_app'>
          <a target="_blank" className="tg__link" href="https://t.me/sadopwnz">@sadopwnz</a>
        </footer>
      </div>

      <Routes>
        <Route path='/' element={<StartPage />} />
        <Route path='/registration' element={<RegistrationPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/user/:id' element={<UserPage />} />
        <Route path='/admin/users' element={<AdminUsers />} />
        <Route path='/item' element={<ItemPostPage />} />
        <Route path='/items' element={<ItemListPage />} />
        <Route path='/item/:id' element={<Item />} />
        <Route path='/test' element={<Test />} />
      </Routes>
    </div>
  );
}

export default observer(App);
