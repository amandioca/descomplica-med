const fs = require('fs');
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
    } catch (err) {
        console.error('Error fetching users: ', err);
        throw new Error('Error fetching users from database');
    }
}

async function getUserByCpf(cpf) {
    try {
        const result = await client.query('SELECT * FROM users WHERE cpf = $1', [cpf]);
        console.log(result.rows)
        return result.rows;
    } catch (err) {
        console.error('Error fetching user by CPF: ', err);
        throw new Error('Error fetching users from database');
    }
}

module.exports = {
    getUsers,
    getUserByCpf,
}