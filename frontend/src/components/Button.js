import React from 'react';

const buttonStyle = {
    backgroundColor: 'var(--color-blue-primary)',
    color: '#FFF',
    padding: '5px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
};

const Button = ({ text }) => {
    return (
        <button style={buttonStyle} type='submit' class='btn'>{text}</button>
    )
}

export default Button;