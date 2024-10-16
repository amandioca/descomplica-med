import React, { useState, useRef, useEffect } from 'react';
import '../styles/ChatWorkspace.css';
import { AuthNavbar } from '../components/Navbar';
import paperclip from '../assets/svgs/paperclip.svg'
import arrowUp from '../assets/svgs/arrow-up.svg'

const ChatWorkspace = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [inputFile, setInputFile] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (inputMessage.trim() === '' && !inputFile) return;

        if (inputMessage.trim() !== '') {
            const userMessage = {
                sender: 'user',
                text: inputMessage,
                timestamp: new Date().toLocaleTimeString(),
                type: 'text',
            };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInputMessage('');
        }

        if (inputFile) {
            const userMessage = {
                sender: 'user',
                image: URL.createObjectURL(inputFile),
                timestamp: new Date().toLocaleTimeString(),
                type: 'file',
            };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInputFile(null);
        }

        // TODO: teste de desenvolvimento de interface
        const botMessage = {
            sender: 'bot',
            text: `ChatGPT está respondendo à sua mensagem: '${inputMessage}'`,
            timestamp: new Date().toLocaleTimeString(),
            type: 'text'
        };

        setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);
    };

    return (
        <div align='center'>
            <AuthNavbar />
            <nav style={{ height: 46 }}></nav>
            <div className='col-xl-6 col-md-8 col-10'>
                <div className='chat-container'>
                    <div className='scroll-content chat-messages'>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                                {message.type === 'text' && (
                                    <span className='message-text'>{message.text}</span>
                                )}
                                {message.type === 'file' &&(
                                     <img src={message.image} alt='Imagem enviada' style={{ maxWidth: '200px' }} />
                                )}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                    <div className='chat-input mb-4'>
                        <label className='file-upload-label'>
                            <img src={paperclip} alt='ícone de clipe de papel' height='24'></img>
                            <input
                                type='file'
                                accept='.pdf, .png, .jpg'
                                onChange={(e) => setInputFile(e.target.files[0]) 
                                && sendMessage()} />
                        </label>
                        <input
                            type='text'
                            placeholder='Mensagem... '
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <div>
                            <label className='send-message-label' onClick={sendMessage}>
                                <img width='24' src={arrowUp} alt='Enviar' />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default ChatWorkspace;