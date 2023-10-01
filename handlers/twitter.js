const {errHandler, linkError, mediaError} = require('../error/error-handler')

/**
 * Scrapes Twitter media and sends it to a specified chat ID using a bot.
 *
 * @param {Bot} bot - the bot instance used to send messages and media
 * @param {string} chatId - the ID of the chat to send the media to
 * @param {Array} medias - an array of media objects to scrape and send
 * @return {Promise} a promise that resolves when the media has been sent
 */
const twitterScrapper = async (bot, chatId, medias) => {
    try {
        await bot.sendMessage(chatId, 'Processing your link, please wait...')
        const sortedMedias = medias.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
        if (medias.length > 0) {
            if (sortedMedias[0].type === 'video') {
                bot.sendVideo(chatId, sortedMedias[0].url)
            } else if (medias[0].type === 'photo') {
                bot.sendPhoto(chatId, sortedMedias[0].url)
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
    linkPrefix: 'https://twitter.com/',
    handle: twitterScrapper
}