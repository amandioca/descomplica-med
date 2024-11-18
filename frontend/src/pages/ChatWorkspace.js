import React, { useState, useRef, useEffect } from 'react';
import '../styles/ChatWorkspace.css';
import { AuthNavbar } from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import paperclip from '../assets/svgs/paperclip.svg'
import arrowUp from '../assets/svgs/arrow-up.svg'
import character from '../assets/images/character.jpeg'
import FileMessageBox from '../components/FileMessageBox';
import { sendPromptForGemini } from '../apiService';

const ChatWorkspace = () => {
    const [isSending, setIsSending] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [inputFile, setInputFile] = useState(null);
    const [base64File, setBase64File] = useState('');
    const messagesEndRef = useRef(null);

    const clearInputFile = () => {
        setInputFile(null)
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const submitMessage = () => {
        if (!(inputMessage.trim() === '') || inputFile) {
            const userPrompt = constructUserPrompt(inputMessage, inputFile);

            setMessages((prevMessages) => [...prevMessages, userPrompt]);

            setInputFile(null);
            setInputMessage('');
            setIsSending(true);

            sendPromptForGemini(userPrompt)
                .then((response) => {
                    setMessages((prevMessages) => [...prevMessages, constructBotResponse(response)]);
                    setIsSending(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else
            return;
    };

    function constructUserPrompt(inputMessage, inputFile) {
        return {
            sender: 'user',
            type: inputFile ? 'file' : 'text',
            text: inputMessage.trim() || '',
            file: inputFile || null,
            base64: base64File,
            mimetype: inputFile?.type || '',
        };
    }

    function constructBotResponse(response) {
        return {
            sender: 'bot',
            type: 'text',
            text: response
        };
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setInputFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64File(reader.result);
            console.log("Arquivo em Base64:", reader.result);
        };

        reader.readAsDataURL(file);

        e.target.value = null;
    }

    /* TODO: 
    - incluir scroll no input text
    */
    return (
        <div align='center'>
            <AuthNavbar />
            <div style={{ padding: '10px 15px' }}>

                <nav style={{ height: 60 }} >
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <img width='40' src={user} alt='Pefil de usuário' />
                    </div>
                </nav>

                <div className='col-xl-6 col-md-8 col-10'>
                    <div className='chat-container'>
                        <div className='scroll-content chat-messages'>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                                    {message.type === 'text' && (
                                        <>
                                            {message.sender === 'bot' && (
                                                <img style={{marginTop: 10, borderRadius: 50}} src={character} alt='ícone de usuário' height='32'></img>
                                            )}

                                            <span className='message-text'>
                                                <ReactMarkdown>{message.text}</ReactMarkdown>
                                            </span>
                                        </>
                                    )}
                                    {message.type === 'file' && (
                                        <div>
                                            <FileMessageBox file={message.file} />
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <div className={`chat-input ${inputFile ? 'expanded' : ''} mb-4`}>
                            {inputFile && (
                                <div className='file-preview'>
                                    <FileMessageBox file={inputFile} preview={true} onClose={clearInputFile} />
                                </div>
                            )}
                            <div className='input-message'>
                                <label className='file-upload-label'>
                                    <img src={paperclip} alt='ícone de clipe de papel' height='24'></img>
                                    <input
                                        type='file'
                                        accept='.pdf, .png, .jpg'
                                        onChange={handleFileChange} />
                                </label>
                                <input
                                    type='text'
                                    placeholder='Mensagem... '
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    onKeyDown={(e) => isSending ? e.preventDefault() : e.key === 'Enter' && submitMessage()}
                                />
                                <div>
                                    <label className={`send-message-label ${isSending ? 'send-button-disabled' : ''}`}
                                        onClick={!isSending ? submitMessage : undefined}>
                                        <img width='24'
                                            src={arrowUp}
                                            alt='Enviar' />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}



export default ChatWorkspace;