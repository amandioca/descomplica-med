import React, { useState, useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';
import { useLocation } from 'react-router-dom';
import { sendUserForLogin } from '../apiService';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/global.css'

const LoginForms = () => {
    const location = useLocation();
    const [cpf, setCpf] = useState('');
    const [pass, setPass] = useState('');

    const submitLogin = async() => {
        if (cpf.length === 14 && pass) {
            try {
                const response = await sendUserForLogin(cpf, pass);
                alert('Login realizado com sucesso!');
                return response;
            } catch (error) {
                alert('Verifique as credenciais e tente novamente.');
            }
        } else 
            return;
    }

    useEffect(() => {
        if (location.state?.cpf)
            setCpf(location.state.cpf);
    }, [location.state]);

    return (
        <form style={{ marginTop: 40, marginBottom: 50 }}>
            <div class='mb-3'>
                <label for='cpf' class='form-label'>CPF:</label>
                <InputMask id='cpf'
                    class='input form-control form-input'
                    onChange={(e) => setCpf(e.target.value)}
                    value={cpf}
                    type='text'
                    mask='999.999.999-99'
                    placeholder='000.000.000-00'
                    autoComplete='cpf' />
            </div>
            <div class='mb-3'>
                <label for='pass' class='form-label'>Senha:
                </label>
                <input id='pass'
                    class='input form-control form-input'
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                    type='password'
                    placeholder='••••••••'
                    autoComplete='current-password' />
            </div>
        </form>
    )
}

export default LoginForms;