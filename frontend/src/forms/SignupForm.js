import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/global.css'
import { sendUserForRegister } from '../apiService';

const SignupForms = (ref) => {
    const inputStyle = { backgroundColor: 'var(--color-gray-medium)', border: '1px solid var(--color-gray)', color: 'var(--color-white)' }
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [pass, setPass] = useState('');
    const [validationCpf, setValidationCpf] = useState(false);
    const [confirmPass, setConfirmPass] = useState('');
    const [validationPass, setValidationPass] = useState({
        length: false,
        number: false,
        lowercase: false,
        uppercase: false,
        symbol: false,
    });
    const equalsPassword = pass === confirmPass;

    const submitRegister = (ref) => {
        const isValidPass = Object.values(validationPass).every((value) => value === true);

        if (validationCpf && isValidPass && equalsPassword) {
            // TODO: CHECAR CONSTRUTOR
            const user = constructUserRegister();

            alert('Cadastro realizado com sucesso!');

            sendUserForRegister(user)
                .then((response) => {

                })
                .catch((error) => {
                    console.log(error);
                });
        } else
            return;
    }

    function constructUserRegister() {
        return {
            cpf: cpf,
            fullName: name.trim(),
            password: pass,
        }
    }

    const handleCpf = (input) => {
        setCpf(input)

        if (input.length === 14)
            setValidationCpf(true);
        else
            setValidationCpf(false);
    }

    const handlePassword = (input) => {
        setPass(input)

        setValidationPass({
            length: input.length >= 8,
            lowercase: /[a-z]/.test(input),
            uppercase: /[A-Z]/.test(input),
            number: /[0-9]/.test(input),
            symbol: /[^a-zA-Z0-9]/.test(input),
        });
    }

    return (
        <div style={{ marginTop: 40, marginBottom: 60 }}>
            <div class='mb-3'>
                <label for='name' class='form-label'>Nome Completo:</label>
                <input id='name'
                    style={inputStyle}
                    class='form-control form-input'
                    onChange={(e) => setName(e.target.value)}
                    placeholder='João Silva dos Santos' />
            </div>
            <div class='mb-3'>
                <label for='cpf' class='form-label'>CPF:</label>
                <InputMask id='cpf'
                    style={inputStyle}
                    class='form-control form-input'
                    onChange={(e) => handleCpf(e.target.value)}
                    value={cpf}
                    mask="999.999.999-99"
                    placeholder='000.000.000-00' />
            </div>
            <div class='mb-3'>
                <label for='pass' class='form-label'>Senha:</label>
                <input id='pass'
                    style={inputStyle}
                    class='form-control form-input'
                    onChange={(e) => handlePassword(e.target.value)}
                    value={pass}
                    type='password'
                    placeholder='••••••••' />
            </div>
            <div class='mb-3'>
                <label for='confirmPass' className='form-label'>Confirme a senha:</label>
                <input id='confirmPass'
                    style={inputStyle}
                    class='form-control form-input'
                    onChange={(e) => setConfirmPass(e.target.value)}
                    value={confirmPass}
                    type='password'
                    placeholder='••••••••' />
            </div>
        </div>
    )
}

export default SignupForms;