const axios = require('axios')
require('dotenv').config()

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

    return await axios.post(url, data, 
        config).then( res=> {
            const data = res.data.choices[0].message.content
            console.log('axios result-->', data)
            return data

        }).catch(err => {
            console.log(err)
            return null
        });
    
}

module.exports =  getChat;