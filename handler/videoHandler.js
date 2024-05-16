const axios = require('axios');
const { PassThrough } = require('stream');
const request = require('request');

const videoHandler = async (chatId, bot, videoUrl) => {
    try {
        const videoStream = new PassThrough();

        request(videoUrl)
        .on('error', (err) => {
            console.error('Error downloading video: ', err);
            bot.sendMessage(chatId, 'an error ocurred while downloading the video...');
        })
        .on('end', async () => {
            console.log('Video download complete.');
            try {
                await bot.sendVideo(chatId, videoStream)
            } catch (error) {
                console.error('Error:', error);
                    bot.sendMessage(chatId, 'Error');
            }
        })
        .pipe(videoStream);


        
    } catch (error) {
        console.error('Error sending video...');
        bot.sendMessage(chatId, 'An error ocurred while sending the video...');
    }
}

module.exports = { videoHandler }