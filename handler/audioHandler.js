process.env.NTBA_FIX_350 = '1';
const axios = require('axios');

const audioHandler = async (chatId, bot, url) => {
    try {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'arraybuffer'
        })

        //Send the audio
        const audioBuffer = Buffer.from(response.data, 'binary')
        bot.sendAudio(chatId, audioBuffer);

    } catch (error) {
        console.error('Error sending audio...');
        bot.sendMessage(chatId, 'Ocorreu um erro ao enviar o vídeo.');
    }
}

module.exports = { audioHandler }