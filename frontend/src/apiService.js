import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const request = async (url, method = 'GET', body = null, headers = {}) => {
    const config = {
        method,
        url: `${API_URL}/api${url}`,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        data: body,
    };

    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('Error in request:', error);
        throw error;
    }
};

async function sendPromptForGemini(userPrompt) {
    try {
        return request(
            '/messages/send-prompt',
            'POST',
            userPrompt
        );
    } catch (error) {
        console.error('Error sending prompt to Gemini:', error.message);
        throw error;
    }
}

async function sendUserForRegister(user) {
    try {
        return await request(
            '/users/register',
            'POST',
            user
        );
    } catch (error) {
        console.error('Error in register user:', error.response.data.message);
        throw error;
    }
}

export {
    sendPromptForGemini,
    sendUserForRegister,
}