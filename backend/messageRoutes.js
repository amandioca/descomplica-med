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
    const { messageType } = req.body;
    try {
        if (messageType.includes(MessageTypes.FILE)) {
            // enviar para amzS3 e recuperar path
            const path = "/mock/fake_path";
            req.body.path = path;
        }
    } catch (error) {
        res.status(500).json({ message: `Generic error in checkMessageType: ${error}` });
    }
    next();
}

function logMessageUser(req, res, next) {
    const { sender, messageType, messageText, path, mimetype, userCpf } = req.body;
    console.log(req.body)

    dbService.logMessage(sender, messageType, messageText, path, mimetype, userCpf)
        .then(() => {
            next();
        })
        .catch((error) => {
            res.status(500).json({ message: `Generic error in logMessageUser: ${error}` });
        })
}

router.post('/send-prompt', checkMessageType, logMessageUser, async (req, res) => {
    const { messageType, messageText, mimetype, userCpf } = req.body;
    try {
        const resultSendPrompt = await sendPromptByTypeMessage(messageType, messageText, mimetype, userCpf);
        console.log('TESTE: ' + resultSendPrompt);
        res.send(resultSendPrompt);
    } catch (error) {
        res.status(500).json({ message: `Generic error: ${error}` });
    }
});

async function sendPromptByTypeMessage(messageType, prompt, mimetype, userCpf) {
    let response = '';
    try {
        if (messageType == MessageTypes.FILE)
            response = await geminiService.getResponseByText(prompt);
        else if (mimetype == MimeTypes.PDF)
            next();
        else
            next();

        await dbService.logMessage('bot', 'text', response, null, null, userCpf);
        return response;
    } catch (error) {
        res.status(500).json({ message: `Generic error in sendPromptByTypeMessage: ${error}` });
    }
}

module.exports = router;