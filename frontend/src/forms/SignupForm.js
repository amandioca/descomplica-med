import React, { useState, useRef, forwardRef } from 'react';
import InputMask from 'react-input-mask';
import 'bootstrap/dist/css/bootstrap.min.css'
import { FaRegCheckCircle } from 'react-icons/fa'
import '../styles/SignupForm.css';
import '../styles/global.css';
import { sendUserForRegister } from '../apiService';

const SignupForms = forwardRef((ref) => {
    const [showTooltipPass, setShowTooltipPass] = useState(false);
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
    const equalsPassword = confirmPass !== '' && pass === confirmPass;

    // useImperativeHandle(ref, () => ({
    //     submitRegister,
    // }));

    const submitRegister = () => {
        const isValidPass = Object.values(validationPass).every((value) => value === true);

        if (validationCpf && isValidPass && equalsPassword) {
            const user = constructUserRegister();
            console.log(user);

            sendUserForRegister(user)
                .then((response) => {
                    if (true) {
                        alert('Cadastro realizado com sucesso!');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } else
            alert('Preencha todos os campos corretamente!');
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

    const handleConfirmPassword = (input) => {
        setConfirmPass(input);
    };

    const renderValidationItem = (text, isValid) => (
        <li style={{ display: 'flex', alignItems: 'center', color: isValid ? 'green' : 'red' }}>
            <FaRegCheckCircle style={{ marginRight: 8, color: isValid ? 'green' : 'red' }} />
            {text}
        </li>
    );

    return (
        <form style={{ marginTop: 40, marginBottom: 60 }}>
            <div class='mb-3'>
                <label for='name' class='form-label'>Nome Completo:</label>
                <input id='name'
                    class='form-control form-input input'
                    onChange={(e) => setName(e.target.value)}
                    placeholder='João Silva dos Santos' />
            </div>
            <div class='mb-3'>
                <label for='cpf' class='form-label'>CPF:</label>
                <InputMask id='cpf'
                    class='form-control form-input input'
                    onChange={(e) => handleCpf(e.target.value)}
                    value={cpf}
                    mask='999.999.999-99'
                    placeholder='000.000.000-00'
                    autoComplete='username' />
            </div>
            <div className='mb-3'>
                <label htmlFor='pass' className='form-label'>Senha:</label>
                <input id='pass'
                    className='form-control form-input input'
                    onChange={(e) => handlePassword(e.target.value)}
                    onFocus={() => setShowTooltipPass(true)}
                    onBlur={() => setShowTooltipPass(false)}
                    value={pass}
                    type='password'
                    placeholder='••••••••'
                    autoComplete='new-password'
                />
                {showTooltipPass && (
                    <div className='tooltip-password'>
                        <ul style={{ margin: 0, padding: '10px 15px', listStyle: 'none' }}>
                            {renderValidationItem('Pelo menos 8 caracteres', validationPass.length)}
                            {renderValidationItem('Pelo menos uma letra minúscula', validationPass.lowercase)}
                            {renderValidationItem('Pelo menos uma letra maiúscula', validationPass.uppercase)}
                            {renderValidationItem('Pelo menos um número', validationPass.number)}
                            {renderValidationItem('Pelo menos um símbolo', validationPass.symbol)}
                        </ul>
                    </div>
                )}
            </div>
            <div className="mb-3 input-container">
                <label htmlFor="confirmPass" className="form-label">Confirme a senha:</label>
                <div style={{ position: 'relative' }}>
                    <input
                        id="confirmPass"
                        className="form-control form-input input"
                        style={{ paddingRight: '40px' }}
                        onChange={(e) => handleConfirmPassword(e.target.value)}
                        value={confirmPass}
                        type="password"
                        placeholder="••••••••"
                        autoComplete='new-password'
                    />
                    <FaRegCheckCircle className='icon-confirm-pass'
                        style={{
                            color: equalsPassword ? 'green' : 'red'
                        }} />
                </div>
            </div>
        </form >
    )
});

export default SignupForms;