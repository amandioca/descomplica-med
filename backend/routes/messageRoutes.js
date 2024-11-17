const express = require('express')
const router = express.Router();
const dbService = require('../services/dbService');
const geminiService = require('../services/geminiService');
const { saveFileToTemp, generateFileName, deleteTempFolder } = require('../utils/fileUtils');
const { uploadFileToS3 } = require('../services/awsService');

const MessageTypes = {
    TEXT: 'text',
    FILE: 'file'
};

async function checkMessageType(req, res, next) {
    console.log('Entrou no checkMessageType');
    const { type, mimetype, base64 } = req.body;
    try {
        if (type.includes(MessageTypes.FILE)) {
            const fileName = generateFileName(mimetype);            
            await saveFileToTemp(fileName, base64);

            const key = await uploadFileToS3(fileName, mimetype);
            req.body.path = key;
        }
        next();
    } catch (error) {
        res.status(500).json({ message: `Generic error in checkMessageType: ${error}` });
    }
}

function logMessageUser(req, res, next) {
    console.log('Entrou no logMessageUser');
    const { sender, type, text, path, mimetype } = req.body;

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
    const { type, text, mimetype, base64, path } = req.body;
    try {
        const resultSendPrompt = await sendPromptByTypeMessage(type, text, mimetype, base64, path);
        res.send(resultSendPrompt);
    } catch (error) {
        res.status(500).json({ message: `Generic error: ${error}` });
    }
});

async function sendPromptByTypeMessage(type, prompt, mimetype, base64, key) {
    let response = '';
    try {
        if (type == MessageTypes.TEXT)
            response = await geminiService.getResponseByText(prompt);
        else if (type === MessageTypes.FILE){
            response = await geminiService.getResponseByFileAndText(base64, key, mimetype);
            deleteTempFolder();
        }

        console.log('Response:', response);
        await dbService.logMessage('bot', 'text', response, null, null);
        return response;
    } catch (error) {
        return `Generic error in sendPromptByTypeMessage: ${error}`;
    }
}

module.exports = router;