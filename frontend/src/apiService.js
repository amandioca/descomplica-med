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
        console.log('Error:', error);
        const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
        throw new Error('Error in submit request: ', errorMessage);
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

export {
    sendPromptForGemini,
}