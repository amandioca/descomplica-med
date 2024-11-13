// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

require('dotenv').config();
const express = require('express');
const gemini = require('./geminiService');
const userRoutes = require('./userRoutes');
const messageRoutes = require('./messageRoutes');
const app = express();
app.use(express.json());

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

const PORT = 3000;

app.get('/hello-world', (req, res) => {
    res.send({ message: 'hello world!' })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

app.get('/response-gemini', async (req, res) => {
    const { userMessage } = req.body;
    try {
        let result = '';
        if (userMessage.length > 0) {
            result = await gemini.getResponseByText(userMessage);
        } else {
            result = 'This message is empty'
        }
        res.status(200).json({ message: result });
    } catch (error) {
        res.status(500).json({ message: `Generic error: ${error}` });
    }
});