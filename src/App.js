import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import StartPage from './pages/StartPage';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AdminUsers from './pages/AdminUsers';
import ItemPostPage from './pages/ItemPostPage';
import ItemListPage from './pages/ItemListPage';
import Confirm from './pages/Confirm';
import Item from './components/cards/Item';
import NewAdBtn from './components/ui/newAdBtn';
import './App.css';
import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from 'react-cookie';


function App() {
  const [cookies, setCookies, removeCookie] = useCookies();
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [auth, setAuth] = useState(false);
  // const credentials = useSelector(state => state.authentication);
  let context;

  // if (cookies.user != null) {
  //   setUser(cookies.user);
  //   setAuth(true);
  // }

  useEffect(() => {
    if (cookies.user != null) {
      setUser(cookies.user);
      setAuth(true);
    }
  }, [cookies])



  // hide dropdown menu by clicking outside
  const ref = useRef();


  useEffect(() => {
    const closeOpenMenus = (e) => {
      if (ref.current && open && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', closeOpenMenus);
  })


  if (context?.isLoading) {
    return <div>Loading...</div>
  }

  const handleLogout = (e) => {
    e.preventDefault();
    removeCookie("user");
    handleDropMenu(e);

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    setAuth(false);
    navigate("/");
  }

  const handleDropMenu = (e) => {
    e.preventDefault();
    if (open === false) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }

  return (
    <div className="react-root">
      <div className="wrap_head">
        <header className='header_app'>
          <div className='link-to-start__wrapper'>
            <div className="logo">a</div>
            <div className="link-to-start"><Link className='link-to-start-text' to={'/'} >Miracle</Link></div>
          </div>
          <div className='nav'>
            {auth && <div className="add-new-ad">
              <NewAdBtn />
            </div>
            }
            {!auth && window.location.pathname !== '/login' && (
              <Link className="reg__link" to={'/login'} >Login</Link>
            )}
            {window.location.pathname === '/login' && (
              <Link className="reg__link" to={'/registration'} >Registration</Link>
            )}
            {auth && (
              <div className="drop-menu">
                <div className="drop-menu__username" onClick={handleDropMenu}>{user.username} 	&#8744;</div>
                <div className={`${open ? 'open' : 'closed'}`} ref={ref}>
                  <div className="drop-menu__list">
                    <Link className="drop-menu__link-user" to={`/user/${cookies.user?.id}`}>Profile</Link>
                    <Link className="drop-menu__link-logout" onClick={handleLogout}>Logout</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
      </div>

      <div className="wrap_foot">
        <footer className='footer_app'>
          <a target="_blank" className="tg__link" href="https://t.me/sadopwnz">@sadopwnz</a>
          <span className="version">v.0.0.4</span>
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
        <Route path='/activate/:id' element={<Confirm />} />
      </Routes>
    </div>
  );
}

export default App;
