require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_KEY
const PORT = 3000

app.get('/hello-world', (req, res) => {
    res.send("hello world!")
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})