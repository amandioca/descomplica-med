import React from 'react';
import Button from '../components/Button';
import SignupForms from '../forms/SignupForm';
import Container from '../components/Container';
import { UnauthNavbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const isRegistered = true;

    const navigate = useNavigate();

    const redirectLogin = () => {
        navigate('/login')
    };

    const handleRegistration = () => {
        if (isRegistered) {
            navigate('/chat');
        } else {
            alert("Credenciais inválidas");
        }
    };

    const lineStyle = { border: '1px solid var(--color-gray)', marginTop: 15 }
    const titleStyle = { fontWeight: 400 }
    const buttonStyle = {
        backgroundColor: 'var(--color-blue-primary)',
        color: '#FFF',
        padding: '5px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
    };

    return (
        <div>
            <UnauthNavbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 66px)' }}>
                <div>
                    <Container>
                        <div style={{ padding: '0px 30px' }}>
                            <h5 align='center' style={titleStyle}>Cadastre-se</h5>
                            <hr style={lineStyle} />
                            <SignupForms />
                            <div align='center'>
                                <button onClick={handleRegistration} style={buttonStyle} type='submit' class='btn'>Cadastrar</button>
                            </div>
                        </div>
                    </Container>
                    <div align='center' style={{ paddingTop: 20, fontSize: 14 }}>
                        <a
                            href=''
                            style={{ color: 'var(--color-blue-primary)' }}
                            onClick={redirectLogin}>
                            Já possui conta?
                            <br />
                            <b> Clique aqui para entrar</b>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;