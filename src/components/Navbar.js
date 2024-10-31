import React from 'react';
import logo from '../assets/svgs/logo.svg'
import logoWhite from '../assets/svgs/logo-white.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom';

const logoContainerStyle = { justifyContent: 'center' }
const defaultHeightNavbar = 66


const AuthNavbar = () => {
  const navbarStyle = { backgroundColor: 'var(--color-gray-medium)', height: defaultHeightNavbar }
  
  return (
    <nav class='navbar' style={navbarStyle}>
      <div class='container' style={logoContainerStyle}>
        <a class='navbar-brand' href='#'>
          <img src={logo} alt='Descomplica Med' width='40' />
        </a>
      </div>
    </nav>
  )
}

const UnauthNavbar = () => {
  const navigate = useNavigate();

  const redirectHome = () => {
    navigate('/')
  };
  
  const navbarStyle = {
    background: 'linear-gradient(to bottom right, var(--color-blue-primary), var(--color-blue-secondary))',
    height: defaultHeightNavbar
  }

  return (
    <nav class='navbar' style={navbarStyle}>
      <div class='container' style={logoContainerStyle}>
        <a class='navbar-brand'
          href=''
          onClick={redirectHome}
          style={{ display: 'flex', alignItems: 'center', fontWeight: 400, fontSize: 28, color: '#FFF' }}>
          <img style={{ marginRight: 10 }} src={logoWhite} alt='Descomplica Med' width='40' />
          Descomplica Med
        </a>
      </div>
    </nav>
  )
}

export { AuthNavbar, UnauthNavbar };