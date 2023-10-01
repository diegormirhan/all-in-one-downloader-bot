const { errHandler, linkError, mediaError } = require('../error/error-handler')

/**
 * Scrapes SoundCloud media and sends it to the specified chat.
 *
 * @param {Object} bot - The bot object used to send messages.
 * @param {number} chatId - The ID of the chat where the media will be sent.
 * @param {Array} medias - The array of media objects to be processed.
 * @return {Promise} A promise that resolves when the media is sent successfully.
 */
const soundcloudScrapper = async (bot, chatId, medias) => {
    try {
        await bot.sendMessage(chatId, 'Processing your link, please wait...');
        console.log(medias)
        if (medias.length > 0) {
            if (medias[0].type === 'audio') {
                bot.sendAudio(chatId, medias[0].url)
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
    linkPrefix: 'https://soundcloud.com/',
    handle: soundcloudScrapper
}