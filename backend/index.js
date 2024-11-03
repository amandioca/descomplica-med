// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

require('dotenv').config();
const express = require('express');
const dbService = require('./dbService');
const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});

app.get('/hello-world', (req, res) => {
    res.send({ message: 'hello world!' })
});

app.get('/users', async (req, res) => {
    try {
        const data = await dbService.getUsers();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Connection to the SQL server failed' })
    }
});

app.get('/users/:cpf', async (req, res) => {
    try {
        const user = await dbService.getUserByCpf(req.params.cpf);
        user.length === 1
            ? res.json(user)
            : res.status(404);
    } catch (error) {
        res.status(500).json({ message: 'Connection to the SQL server failed' })
    }
});

app.post('/users', async (req, res) => {
    const { cpf, fullName, password } = req.body;
    try {
        const createdUser = await dbService.createUser(cpf, fullName, password);
        const { password: _, ...userData } = createdUser;
        res.status(201).send(userData)
    } catch (error) {
        if (error.code === '23505')
            res.status(409).send({ message: 'User with this CPF already exists' });
        else if (error.code === '22001')
            res.status(400).send({ message: error.message });
        else
            res.status(500).send({ message: error.message })
    }
})