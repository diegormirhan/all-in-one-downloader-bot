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
    console.log("bot: ", medias)
    try {
        for (item of medias) {
            if (item['type'] === 'video') {
                bot.sendVideo(chatId, item['url'])
                break
            } else {
                linkError(bot, chatId)
            }
        }
    } catch (error) {
        errHandler(error, bot, chatId)
    }
}

module.exports = {
    linkPrefix: 'https://pin.it/',
    handle: pinScrapper
}