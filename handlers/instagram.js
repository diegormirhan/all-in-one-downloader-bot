const {errHandler, linkError, mediaError} = require('../error/error-handler')

/**
 * Sends Instagram media files to a specified chat using a Telegram bot.
 *
 * @param {object} bot - The Telegram bot instance.
 * @param {number} chatId - The ID of the chat to send the media files to.
 * @param {array} medias - An array of media objects containing the type and URL of each media file.
 * @return {Promise} A promise that resolves when all the media files have been sent successfully.
 */
const instaScrapper = async (bot, chatId, medias) => {
    try {
        await bot.sendMessage(chatId, 'Processing your link, please wait...')
        if (medias.length > 0) {
            medias.forEach(media => {
                if (media.type === 'video') {
                    bot.sendVideo(chatId, media.url)
                } else if (media.type === 'image') {
                    bot.sendPhoto(chatId, media.url)
                } else {
                    mediaError(bot, chatId)
                }
            })
        } else {
            linkError(bot, chatId)
        }
    } catch (error) {
        errHandler(error, bot, chatId);
    }
}

module.exports = {
    linkPrefix: 'https://www.instagram.com',
    handle: instaScrapper
}
