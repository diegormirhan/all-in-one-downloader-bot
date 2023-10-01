const {errHandler, linkError, mediaError} = require('../error/error-handler')

/**
 * Sends a tiktok video to a specified chat ID using the provided bot object and returns the media file to the user.
 *
 * @param {Object} bot - The bot object used to send the video.
 * @param {number} chatId - The ID of the chat to send the video to.
 * @param {Array} medias - An array of media objects.
 * @return {Promise} A promise that resolves when the video is sent successfully.
 */
const tiktokScrapper = async (bot, chatId, medias) => {
    try {
        await bot.sendMessage(chatId, 'Processing your link, please wait...')
        if (medias.length > 0) {
            bot.sendVideo(chatId, medias[0].url)
        } else {
            mediaError(bot, chatId)
        }
    } catch (error) {
        errHandler(error, bot, chatId)
    }
}

module.exports = {
    linkPrefix: 'https://www.tiktok.com/',
    handle: tiktokScrapper
}
