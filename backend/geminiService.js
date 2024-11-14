const { GoogleGenerativeAI } = require("@google/generative-ai");

console.log('Connection init');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `Você é um assistente virtual especializado em saúde, responda e forneça explicações e detalhes apenas de perguntas e conteúdo sobre saude. Sua tarefa é auxiliar pacientes a entenderem os resultados de seus exames médicos. Ao receber um resultado de exame, você deve explicar de forma clara e simples o que cada valor significa, utilizando exemplos e analogias. Evite termos técnicos e foque em fornecer informações úteis para que o paciente possa tomar decisões sobre sua saúde em conjunto com um médico.`,
    temperature: 0.8,
    max_tokens: 17, 
});

async function getResponseByText(prompt) {
    const result = await model.generateContent(prompt);
    return result.response.text();
}

async function getResponseByDocument(prompt) {
    const status = {
        code: 501,
        message: 'Not Implemented'
    };
    return status;
}

async function getResponseByImage(prompt) {
    const status = {
        code: 501,
        message: 'Not Implemented'
    };
    return status;
}

module.exports = {
    getResponseByText,
    getResponseByImage,
    getResponseByDocument,
}