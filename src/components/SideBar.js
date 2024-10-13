import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'

const colorPalette = {
  grayLight: '#757575',
  grayMedium: '#333333',
  grayRegular: '#4D4D4D',
  grayDark: '#212121',
  primaryBlue: '#3596FF',
  secondaryBlue: '#005DC1'
};

const appStyle = {
  backgroundColor: colorPalette.grayDark,
  minHeight: '100vh',
  color: 'white',
};

const sideNavStyle = {
  height: '100%',
  width: '250px',
  position: 'fixed',
  top: '66px',
  left: 0,
  backgroundColor: colorPalette.grayMedium,
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
};

const linkStyle = {
  padding: '10px 15px',
  textDecoration: 'none',
  color: 'white',
  fontSize: '18px',
  marginBottom: '10px',
  borderRadius: '4px',
};

const linkHoverStyle = {
  backgroundColor: colorPalette.primaryBlue,
};

const SideBar = () => {
  return (
    <div style={sideNavStyle}>
      <a href="#home" style={{ ...linkStyle }} onMouseEnter={e => e.target.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
        Home
      </a>
      <a href="#historico" style={{ ...linkStyle }} onMouseEnter={e => e.target.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
        Histórico
      </a>
      <a href="#cadastro" style={{ ...linkStyle }} onMouseEnter={e => e.target.style.backgroundColor = linkHoverStyle.backgroundColor} onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
        Cadastro
      </a>
    </div>
  );
};

export default SideBar;