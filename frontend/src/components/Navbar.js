import React from 'react';
import logo from '../assets/svgs/logo.svg'
import logoWhite from '../assets/svgs/logo-white.svg'
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'

const appName = 'Descomplica Med';

const AuthNavbar = () => {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate('/')
  };

  return (
    <div className='navbar-size navbar-bg-auth navbar-center'>
      <a href='#'>
        <img src={logo}
          onClick={redirectHome}
          alt={appName}
          width='40' />
      </a>
    </div>
  )
}

const UnauthNavbar = () => {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate('/')
  };

  return (
    <div className='navbar-size navbar-bg-unauth navbar-center'>
      <a className='navbar-brand'
        href='#'
        onClick={(e) => {
          e.preventDefault();
          redirectHome();
        }}>
        <img className='margin-10'
          src={logoWhite}
          alt={appName}
          width='40' />
        {appName}
      </a>
    </div>
  )
}

export { AuthNavbar, UnauthNavbar };