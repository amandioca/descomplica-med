const express = require('express')
const router = express.Router();
const dbService = require('./dbService');

router.get('/', async (req, res) => {
    try {
        const data = await dbService.getUsers();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: `Generic error: ${error}` })
    }
});

router.get('/:cpf', async (req, res) => {
    try {
        const user = await dbService.getUserByCpf(req.params.cpf);
        user.length === 1
            ? res.json(user)
            : res.status(404).send({ message: 'User not found' });
    } catch (error) {
        res.status(500).json({ message: `Generic error: ${error}` })
    }
});

router.post('/', async (req, res) => {
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

module.exports = router;