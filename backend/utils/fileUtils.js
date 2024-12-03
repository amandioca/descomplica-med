const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const MimeTypes = {
    PDF: 'application/pdf',
    PNG: 'image/png',
    JPG: 'image/jpeg'
};

function generateFileName(mimetype) {
    const extension = getExtensionByMimeType(mimetype);
    const fileName = `${uuidv4()}.${extension}`;
    return fileName;
}

function getExtensionByMimeType(mimetype) {
    switch (mimetype) {
        case MimeTypes.PDF:
            return 'pdf';
        case MimeTypes.PNG:
            return 'png';
        case MimeTypes.JPG:
            return 'jpg';
        default:
            return '';
    }
}

async function saveFileToTemp(fileName, base64WithHeader) {
    const tempFolderPath = path.join(__dirname, '..', '.temp');

    if (!fs.existsSync(tempFolderPath))
        fs.mkdirSync(tempFolderPath);

    const filePath = path.join(tempFolderPath, fileName);
    fs.writeFileSync(filePath, Buffer.from(base64WithHeader.split(',')[1], 'base64'));
}

function deleteTempFolder() {
    const tempFolderPath = path.join(__dirname, '..', '.temp');

    if (fs.existsSync(tempFolderPath)) {
        fs.rmSync(tempFolderPath, { recursive: true, force: true });
        console.log('.temp folder and its contents have been deleted.');
    }
}

module.exports = {
    generateFileName,
    saveFileToTemp,
    deleteTempFolder,
};
