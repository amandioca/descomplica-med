const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const fs = require('fs');
console.log('Connection init');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const fileManager = new GoogleAIFileManager(process.env.GEMINI_KEY);

const model = genAI.getGenerativeModel({
    region: "southamerica-east1",
    model: "gemini-1.5-flash",
    systemInstruction: `Você é um assistente virtual especializado em saúde, responda e forneça explicações e detalhes apenas de perguntas e conteúdo sobre saude. Sua tarefa é auxiliar pacientes a entenderem os resultados de seus exames médicos. Ao receber um resultado de exame, você deve explicar de forma clara e simples o que cada valor significa, utilizando exemplos e analogias. Evite termos técnicos e foque em fornecer informações úteis para que o paciente possa tomar decisões sobre sua saúde em conjunto com um médico.`,
    temperature: 0.8,
    max_tokens: 1,
});

async function getResponseByText(prompt) {
    console.log('getResponseByText process started');
    const result = await model.generateContent(prompt);
    return result.response.text();
}

async function getResponseByFileAndText(key, mimetype) {
    console.log('getResponseByFileAndText process started');
    try {
        const tempFilePath = `./.temp/${key}`;
        
        const uploadResponse = await fileManager.uploadFile(tempFilePath, {
            mimeType: mimetype,
            displayName: key,
        });

        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: uploadResponse.file.mimeType,
                    fileUri: uploadResponse.file.uri,
                },
            },
            {
                text: `Explica da maneira mais leiga possivel o conteudo desse arquivo 
                e informe se há alguma irregularidade e quais cuidados e medidas devem 
                ser tomados. No inicio da sua resposta, numa única linha
                informe o primeiro nome do paciente, a data da registrada do resultado do exame 
                e o tipo do exame. Após, informe resumidamente o tópico de Irregularidades,
                em seguida o tópico de Cuidados Paleativos a serem tomadas e por fim, a uma breve 
                explanação do resultado do exame. Diagrame a resposta em markdown para ficar 
                visualmente mais organizado. Seja claro e objetivo e evite termos técnicos.
                Não dê diagnósticos, apenas informações.`,
            },
        ]);
        return result.response.text();
    } catch (error) {
        return `Generic error in getResponseByDocument: ${error}`;
    }
}

module.exports = {
    getResponseByText,
    getResponseByFileAndText,
}