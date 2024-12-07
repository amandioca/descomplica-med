import React, { useState, useEffect, useRef } from 'react';
import InputMask from 'react-input-mask';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/global.css'

const LoginForms = () => {
    const location = useLocation();
    const [cpf, setCpf] = useState('');
    const [pass, setPass] = useState('');

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