const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require('crypto');
const fs = require("fs");
const path = require("path");

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

async function uploadFileToS3(file, mimetype) {
    const filePath = path.join(__dirname, '../mock/file-mock.jpg');
    const fileContent = fs.readFileSync(filePath);
    const key = `${generateHashMD5()}.jpeg`;

    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
        Body: fileContent,
        ContentType: mimetype,
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        return key;
    } catch (error) {
        console.error('Error uploading file:', error);
    }
}

function generateHashMD5() {
    const hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
    return hash;
}

async function generateTempUrl(key) {
    const command = new GetObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
    });

    try {
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        console.error('Signed URL:', signedUrl);
        return signedUrl;
    } catch (error) {
        console.error('Error generating signed URL', error);
    }
}

function generateHash(){
    const hash = crypto.createHash('md5').update(Date.now().toString()).digest('hex');
    return hash;
}

module.exports = {
    uploadFileToS3,
    generateTempUrl,
};
