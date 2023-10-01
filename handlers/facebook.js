const {errHandler, linkError, mediaError} = require('../error/error-handler')

/**
 * Scrapes a Facebook media from a given link and sends it as a video to the specified chat.
 *
 * @param {object} bot - The bot object used to send messages and videos.
 * @param {number} chatId - The ID of the chat to send the video to.
 * @param {array} medias - An array of media objects containing the URL of the video.
 * @return {Promise} A promise that resolves when the video is sent successfully, or rejects with an error.
 */
const faceScrapper = async (bot, chatId, medias) => {
    try {
        await bot.sendMessage(chatId, 'Processing your link, please wait...')
        bot.sendVideo(chatId, medias[0].url)
    } catch (error) {
        errHandler(error, bot, chatId)
    }
}

module.exports = {
    linkPrefix: 'https://www.facebook.com/',
    handle: faceScrapper
}