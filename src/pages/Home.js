import React from 'react';
import { UnauthNavbar } from "../components/Navbar";
import '../styles/Home.css'; // Importando o arquivo CSS

const Home = () => {
    // Função que será executada ao clicar no botão
    const handleClick = () => {
      alert("Iniciar o processo de cadastro!");
    };
  
    return (
      <><UnauthNavbar />
  
        <div className="header">
          <h1 className="main-text">
            Descomplique o resultado <br/>dos seus exames <strong>agora, <br/>sem custo.</strong>
          </h1>
          <div className="button-container">
            <button className="button">entrar</button>
            <button className={`button register-button`}>cadastrar</button>
          </div>
        </div>
  
        {/* Botão principal que chama a função handleClick */}
        <button className="main-button" onClick={handleClick}>
          experimente já
        </button>
      </>
    );
  };
  
  export default Home;