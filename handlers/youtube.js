const {errHandler, linkError, mediaError} = require('../error/error-handler')

/**
 * Scrapes YouTube media from the given bot and chat ID.
 *
 * @param {Object} bot - The bot object used to send messages.
 * @param {number} chatId - The ID of the chat where the message will be sent.
 * @param {Array} medias - An array of media objects to process.
 * @return {Promise} A Promise that resolves when the scraping is complete.
 */
const youtubeScrapper = async (bot, chatId, medias) => {
    try {
        await bot.sendMessage(chatId, 'Processing your link, please wait...')
        const sortedMedias = medias.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
        if (medias.length > 0) {
            if (sortedMedias[0].extension === 'mp4') {
                bot.sendMessage(chatId, `Clique [aqui](${sortedMedias[0].url}) para acessar sua mídia`, { parse_mode: 'Markdown' })
            } else {
                linkError(bot, chatId)
            }
        } else {
            mediaError(bot, chatId)
        }
    } catch (error) {
        errHandler(error, bot, chatId)
    }
}

module.exports = {
    linkPrefix: 'https://youtu.be/',
    handle: youtubeScrapper
}