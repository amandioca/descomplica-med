
import React, { useRef } from 'react';
import SignupForms from '../forms/SignupForm';
import Container from '../components/Container';
import '../styles/global.css';
import { UnauthNavbar } from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const signupFormRef = useRef();
    const navigate = useNavigate();

    const redirectLogin = () => {
        navigate('/login')
    };

    const handleSubmit = async () => {
        const response = await signupFormRef.current.submitRegister();

        if (response) {
            redirectLogin();
        }
        return;
    };

    const btnStyle = {
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
                            <h5 align='center'
                                className='title-forms'>
                                Cadastre-se
                            </h5>
                            <hr className='divisor-forms' />
                            <SignupForms ref={signupFormRef} />
                            <div align='center'>
                                <button onClick={handleSubmit}
                                    style={btnStyle}
                                    className='btn'
                                    type='submit'>
                                    Cadastrar
                                </button>
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