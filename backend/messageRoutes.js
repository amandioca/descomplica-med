const express = require('express')
const router = express.Router();
const dbService = require('./dbService');
const geminiService = require('./geminiService');
const awsService = require('./awsService');

const MessageTypes = {
    TEXT: 'text',
    FILE: 'file'
};

const MimeTypes = {
    PDF: 'application/pdf',
    PNG: 'image/png',
    JPG: 'image/jpeg'
};

async function checkMessageType(req, res, next) {
    const { messageType, mimetype, file } = req.body;
    try {
        if (messageType.includes(MessageTypes.FILE)) {
            const result = await awsService.uploadFileToS3(file, mimetype);
            req.body.path = result;
        }
        next();
    } catch (error) {
        res.status(500).json({ message: `Generic error in checkMessageType: ${error}` });
    }
}

function logMessageUser(req, res, next) {
    const { sender, messageType, messageText, path, mimetype, userCpf } = req.body;
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
        res.send(resultSendPrompt);
    } catch (error) {
        res.status(500).json({ message: `Generic error: ${error}` });
    }
});

async function sendPromptByTypeMessage(messageType, prompt, mimetype, userCpf) {
    let response = '';
    try {
        if (messageType == MessageTypes.TEXT)
            response = await geminiService.getResponseByText(prompt);
        else if (mimetype == MimeTypes.PDF)
            response = await geminiService.getResponseByDocument(prompt);
        else{
            response = await geminiService.getResponseByImage(prompt);
        }

        await dbService.logMessage('bot', 'text', response, null, null, userCpf);
        return response;
    } catch (error) {
        res.status(500).json({ message: `Generic error in sendPromptByTypeMessage: ${error}` });
    }
}

module.exports = router;