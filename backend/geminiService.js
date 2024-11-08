const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log('Connection init');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function getResponseByText(prompt) {
    prompt = getInstruction(prompt);
    const result = await model.generateContent(prompt);
    return result.response.text();
}

function getInstruction(param) {
    return 'Responda em português: ' + param;
}

module.exports = {
    getResponseByText,
}