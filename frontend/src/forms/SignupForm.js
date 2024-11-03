import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/global.css'

const SignupForms = () => {
    const inputStyle = { backgroundColor: 'var(--color-gray-medium)', border: '1px solid var(--color-gray)', color: 'var(--color-white)' }
    const formsStyle = { marginTop: 40, marginBottom: 60 }

    return (
        <div style={formsStyle}>
            <div class='mb-3'>
                <label for='name' class='form-label'>Nome Completo:</label>
                <input style={inputStyle} type='text' class='form-control form-input' id='name' placeholder='João da Silva' />
            </div>
            <div class='mb-3'>
                <label for='cpf' class='form-label'>CPF:</label>
                <input style={inputStyle} type='text' class='form-control form-input' id='cpf' placeholder='xxx.xxx.xxx-xx' />
            </div>
            <div class='mb-3'>
                <label for='pass' class='form-label'>Senha:</label>
                <input style={inputStyle} type='password' class='form-control form-input' id='pass' placeholder='••••••••' />
            </div>
            <div class='mb-3'>
                <label for='confirmPass' className='form-label'>Confirme a senha:</label>
                <input style={inputStyle} type='password' class='form-control form-input's id='confirmPass' placeholder='••••••••' />
            </div>
        </div>
    )
}

export default SignupForms;