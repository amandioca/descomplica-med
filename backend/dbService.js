const fs = require('fs');
const { STATUS_CODES } = require('http');
const { Client } = require('pg');

const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    // connectionString: process.env.DB_URI,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(process.env.DB_CA_PATH),
    },
});

client.connect()
    .then(() => console.log('Successfully connected to the database'))
    .catch(err => console.error('Database connection error: ', err))

async function getUsers() {
    try {
        const result = await client.query('SELECT * FROM users');
        return result.rows;
    } catch (error) {
        console.error('Error fetching users: ', error);
        throw error;
    }
}

async function getUserByCpf(cpf) {
    try {
        const result = await client.query('SELECT * FROM users WHERE cpf = $1', [cpf]);
        return result.rows;
    } catch (error) {
        console.error('Error fetching user by CPF: ', error);
        throw error;
    }
}

async function createUser(cpf, fullName, password) {
    try {
        const result = await client.query('INSERT INTO users (cpf, full_name, password) VALUES ($1, $2, $3) RETURNING *', [cpf, fullName, password])
        return result.rows[0];
    } catch (error) {
        console.error('Error creating user in database: ', error);
        throw error;
    }
}

async function getChatHistoryByUser(cpf) {
    const status = {
        code: 501,
        message: 'Not Implemented'
    };
    return status;
}

async function logMessage(message) {
    const status = {
        code: 501,
        message: 'Not Implemented'
    };
    return status;
}

const messageTemplate = {
    sender: null,
    messageType: "",
    messageText: "",
    filePath: "",
    mimetype: "",
    userCpf: ""
};

module.exports = {
    getUsers,
    getUserByCpf,
    createUser,
    logMessage,
    messageTemplate
}