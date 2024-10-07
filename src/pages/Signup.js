import React from 'react';
import Button from '../components/Button';
import SignupForms from '../forms/SignupForm';
import Container from '../components/Container';
import { UnauthNavbar } from '../components/Navbar';


const Signup = ({ colorPalette }) => {
    const lineStyle = { border: '1px solid var(--color-gray)', marginTop: 15 }
    const titleStyle = { fontWeight: 400 }

    return (
        <div>
            <UnauthNavbar />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 66px)' }}>
                <Container>
                    <div>
                        <h5 align='center' style={titleStyle}>Cadastre-se</h5>
                        <hr style={lineStyle} />
                        <SignupForms colorPalette={colorPalette} />
                        <div align='center'>
                            <Button colorPalette={colorPalette} text={'Cadastrar'} />
                        </div>
                    </div>
                </Container>
                <a style={{paddingTop: 20, color: 'var(--color-blue-primary)'}} href="">
                    Já possui conta?
                    <b> Clique aqui para entrar</b>
                </a>
            </div>
        </div>
    )
}

export default Signup;