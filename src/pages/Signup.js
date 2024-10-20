import React from 'react';
import Button from '../components/Button';
import SignupForms from '../forms/SignupForm';
import Container from '../components/Container';
import { UnauthNavbar } from '../components/Navbar';

const Signup = () => {
    const lineStyle = { border: '1px solid var(--color-gray)', marginTop: 15 }
    const titleStyle = { fontWeight: 400 }

    return (
        <div>
            <UnauthNavbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 66px)' }}>
                <div>
                    <Container>
                        <div style={{padding: '0px 30px'}}>
                            <h5 align='center' style={titleStyle}>Cadastre-se</h5>
                            <hr style={lineStyle} />
                            <SignupForms />
                            <div align='center'>
                                <Button text={'Cadastrar'} />
                            </div>
                        </div>
                    </Container>
                    <div align='center' style={{ paddingTop: 20, fontSize: 14 }}>
                        <a style={{ color: 'var(--color-blue-primary)' }} href=''>
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