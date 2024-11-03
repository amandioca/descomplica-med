import React from 'react';
import { UnauthNavbar } from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const redirectLogin = () => {
    navigate('/login')
  };

  const redirectSignup = () => {
    navigate('/signup')
  };

  return (
    <><UnauthNavbar />

      <div className="header">
        <h1 className="main-text">
          Descomplique o resultado <br />dos seus exames <strong>agora, <br />sem custo.</strong>
        </h1>
        <div className="button-container">
          <button
            onClick={redirectLogin}
            className="button">
            entrar</button>
          <button
            onClick={redirectSignup}
            className="button register-button">
            cadastrar</button>
        </div>
      </div>

      <button
        onClick={redirectSignup}
        className="main-button">
        experimente já
      </button>
    </>
  );
};

export default Home;