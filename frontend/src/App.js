import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Chat from './pages/ChatWorkspace';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Chat />} />
            </Routes>
        </Router>
    );
};

export default App;
