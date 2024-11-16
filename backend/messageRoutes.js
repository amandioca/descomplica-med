const express = require('express')
const router = express.Router();
const dbService = require('./dbService');
const geminiService = require('./geminiService');

const MessageTypes = {
    TEXT: 'text',
    FILE: 'file'
};

const MimeTypes = {
    PDF: 'application/pdf',
    PNG: 'image/png',
    JPG: 'image/jpeg'
};

// 1- verifica tipo da mensagem -> se tiver file envia para armazenamento no s3 para obter path
async function checkMessageType(req, res, next) {
    console.log('Entrou no checkMessageType');
    const { type } = req.body;
    try {
        if (type.includes(MessageTypes.FILE)) {
            // enviar para amzS3 e recuperar path
            const path = "/mock/fake_path";
            req.body.path = path;
        }
        next();
    } catch (error) {
        res.status(500).json({ message: `Generic error in checkMessageType: ${error}` });
    }
}

function logMessageUser(req, res, next) {
    console.log('Entrou no logMessageUser');
    const { sender, type, text, path, mimetype } = req.body;
    console.log(req.body)

    dbService.logMessage(sender, type, text, path, mimetype)
        .then(() => {
            next();
        })
        .catch((error) => {
            res.status(500).json({ message: `Generic error in logMessageUser: ${error}` });
        })
}

router.post('/send-prompt', checkMessageType, logMessageUser, async (req, res) => {
    console.log('Entrou no send-prompt');
    const { type, text, mimetype } = req.body;
    try {
        const resultSendPrompt = await sendPromptByTypeMessage(type, text, mimetype);
        console.log('TESTE: ' + resultSendPrompt);
        res.send(resultSendPrompt);
    } catch (error) {
        res.status(500).json({ message: `Generic error: ${error}` });
    }
});

async function sendPromptByTypeMessage(type, prompt, mimetype) {
    let response = '';
    try {
        if (type == MessageTypes.TEXT)
            response = await geminiService.getResponseByText(prompt);
        else if (mimetype == MimeTypes.PDF)
            response = await geminiService.getResponseByDocument(prompt);
        else
            response = await geminiService.getResponseByImage(prompt);

        console.log('Response:', response);
        await dbService.logMessage('bot', 'text', response, null, null);
        return response;
    } catch (error) {
        res.status(500).json({ message: `Generic error in sendPromptByTypeMessage: ${error}` });
    }
}

module.exports = router;