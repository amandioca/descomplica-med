import React, { useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/global.css'

const LoginForms = () => {
    const inputStyle = { backgroundColor: 'var(--color-gray-medium)', border: '1px solid var(--color-gray)', color: 'var(--color-white)' }
    const location = useLocation();
    const [cpf, setCpf] = useState('');
    const [pass, setPass] = useState('');
    const [validationCpf, setValidationCpf] = useState(false);

    useEffect(() => {
        if (location.state?.cpf)
            setCpf(location.state.cpf);
    }, [location.state]);

    const handleCpf = (input) => {
        setCpf(input)

        if (input.length === 14)
            setValidationCpf(true);
        else
            setValidationCpf(false);
    }

    return (
        <form style={{ marginTop: 40, marginBottom: 50 }}>
            <div class='mb-3'>
                <label for='cpf' class='form-label'>CPF:</label>
                <InputMask id='cpf'
                    class='form-control form-input'
                    style={inputStyle}
                    onChange={(e) => handleCpf(e.target.value)}
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
                    class='form-control form-input'
                    style={inputStyle}
                    onChange={(e) => handlePassword(e.target.value)}
                    value={pass}
                    type='password'
                    placeholder='••••••••'
                    autoComplete='current-password' />
            </div>
        </form>
    )
}

export default LoginForms;