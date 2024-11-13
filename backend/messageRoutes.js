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

// 2- loga mensagem do usuario db
function logMessageUser(req, res, next) {
    const { sender, messageType, messageText, path, mimetype, userCpf } = req.body;
    const message = {
        ...dbService.messageTemplate,
        sender: sender,
        messageType: messageType,
        messageText: messageText,
        filePath: path,
        mimetype: mimetype,
        userCpf: userCpf
    };

    dbService.logMessage({ message })
        .then(() => {
            next();
        })
        .catch((error) => {
            res.status(500).json({ message: `Generic error in logMessageUser: ${error}` });
        })
}

router.post('/send-prompt', checkMessageType, logMessageUser, async (req, res) => {
    const { messageType, messageText, mimetype } = req.body;
    try {
        console.error('AQUI NO ENDPOINT');
        const result = await sendPromptByTypeMessage(messageType, messageText, mimetype);
        res.send(result);
        // 4- envia mensagem para gemini
        // 5- loga mensagem bot no db
        // 6- retorna para o usuario a mensagem do bot
    } catch (error) {

    }
});

async function sendPromptByTypeMessage(messageType, prompt, mimetype) {
    console.error('AQUI NO SEND PROMPT');
    if (messageType == MessageTypes.FILE)
        return await geminiService.getResponseByText(prompt);

    else if (mimetype == MimeTypes.PDF)
        next();

    else
        next();
}

module.exports = router;