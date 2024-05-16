process.env.NTBA_FIX_350 = '1';
const axios = require('axios');

const audioHandler = async (chatId, bot, audioUrl) => {
    try {
        const response = await axios({
            url: audioUrl,
            method: 'GET',
            responseType: 'arraybuffer'
        })

        //Send the audio
        const audioBuffer = Buffer.from(response.data, 'binary')
        bot.sendAudio(chatId, audioBuffer);

    } catch (error) {
        console.error('Error sending audio...');
        bot.sendMessage(chatId, 'An error ocurred while processing the audio.');
    }
}

module.exports = { audioHandler }