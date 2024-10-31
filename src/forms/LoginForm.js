import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/global.css'

const LoginForms = () => {
    const inputStyle = { backgroundColor: 'var(--color-gray-medium)', border: '1px solid var(--color-gray)', color: 'var(--color-white)' }
    const formsStyle = { marginTop: 40, marginBottom: 50 }

    return (
        <div style={formsStyle}>
            <div class='mb-3'>
                <label for='cpf' class='form-label'>CPF:</label>
                <input style={inputStyle} type='text' class='form-control form-input' id='cpf' placeholder='xxx.xxx.xxx-xx' />
            </div>
            <div class='mb-3'>
                <label for='pass' class='form-label'>Senha:</label>
                <input style={inputStyle} type='password' class='form-control form-input' id='pass' placeholder='••••••••' />
            </div>
        </div>
    )
}

export default LoginForms;