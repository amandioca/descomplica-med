import React, { useRef } from 'react';
import Button from '../components/Button';
import LoginForm from '../forms/LoginForm';
import Container from '../components/Container';
import { UnauthNavbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const loginFormRef = useRef();
    const navigate = useNavigate();

    const redirectSignup = () => {
        navigate('/signup')
    };

    const handleLogin = async () => {
        const isAuthenticated = await loginFormRef.current.submitLogin();
        if (isAuthenticated) {
            navigate('/chat');
        }
        return;
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
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 66px)' }}>
                <div>
                    <Container>
                        <div style={{ padding: '0px 30px' }}>
                            <h5 align='center' style={titleStyle}>Acesse sua Conta</h5>
                            <hr style={lineStyle} />
                            <LoginForm ref={loginFormRef} />
                            <div align='center'>
                                <button onClick={handleLogin} style={buttonStyle} type='submit' class='btn'>Entrar</button>
                            </div>
                        </div>
                    </Container>
                    <div align='center' style={{ paddingTop: 20, fontSize: 14 }}>
                        <a
                            href="#"
                            style={{ color: 'var(--color-blue-primary)' }}
                            onClick={(e) => {
                                e.preventDefault();
                                redirectSignup();
                            }}>
                            Ainda não possui conta?
                            <br />
                            <b> Clique aqui para cadastrar</b>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;