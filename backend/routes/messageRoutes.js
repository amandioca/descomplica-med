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
    console.log('checkMessageType process started');
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
    console.log('logMessageUser process started');
    const { sender, type, text, path, mimetype } = req.body;

    dbService.logMessage(sender, type, text, path ? path : '', mimetype)
        .then(() => {
            next();
        })
        .catch((error) => {
            res.status(500).json({ message: `Generic error in logMessageUser: ${error}` });
        })
}

router.post('/send-prompt', checkMessageType, logMessageUser, async (req, res) => {
    console.log('sendPrompt process started');
    const { type, text, mimetype, path } = req.body;
    try {
        const resultSendPrompt = await sendPromptByTypeMessage(type, text, mimetype, path);
        res.send(resultSendPrompt);
    } catch (error) {
        res.status(500).json({ message: `Generic error: ${error}` });
    }
});

async function sendPromptByTypeMessage(type, prompt, mimetype, key) {
    console.log('sendPromptByTypeMessage process started');
    let response = '';
    try {
        if (type == MessageTypes.TEXT)
            response = await geminiService.getResponseByText(prompt);
        else if (type === MessageTypes.FILE){
            response = await geminiService.getResponseByFileAndText(key, mimetype);
            deleteTempFolder();
        }
        await dbService.logMessage('bot', 'text', response, '', '');
        return response;
    } catch (error) {
        return `Generic error in sendPromptByTypeMessage: ${error}`;
    }
}

module.exports = router;