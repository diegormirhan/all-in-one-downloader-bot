const {errHandler, linkError, mediaError} = require('../error/error-handler')

/**
 * Scrapes the pinterest link and sends the corresponding media to a chat.
 *
 * @param {Object} bot - The bot object used for sending messages.
 * @param {number} chatId - The ID of the chat to send the media to.
 * @param {Array} medias - An array of media objects to scrape.
 * @return {Promise} A promise that resolves when the media is sent.
 */
const pinScrapper = async (bot, chatId, medias) => {
    const media = medias.reverse()[0]
    try {
        await bot.sendMessage(chatId, 'Processing your link, please wait...')
        if (media.type === 'video') {
            bot.sendVideo(chatId, media.url)
        }
        else if (media.type === 'image') {
            bot.sendPhoto(chatId, media.url)
        } else {
            linkError(bot, chatId)
        }
    } catch (error) {
        errHandler(error, bot, chatId)
    }
}

module.exports = {
    linkPrefix: 'https://pin.it/',
    handle: pinScrapper
}