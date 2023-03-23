const axios = require('axios')

OPEN_AI_TOKEN = process.env.OPEN_AI_TOKEN

const url = process.env.OPEN_AI_CHAT_URL;

const config = {
    headers: {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${OPEN_AI_TOKEN}`
    }
}

async function getChat(msg) {
    const data = {
        'model': 'gpt-3.5-turbo',
        'messages': [
            {"role": "user", "content": msg}
        ]
    }

    return await axios.post(url, data, config).catch(err => console.log(err))
    
}

module.exports =  getChat;