const {errHandler, linkError, mediaError} = require('../error/error-handler')

const redditScrapper = async (bot, chatId, medias) => {
    try {
        await bot.sendMessage(chatId, 'Processing your link, please wait...');
        sortedMedias = medias.sort((a, b) => (b.format || 0) - (a.format || 0))

        if (medias.length > 0) {
            bot.sendVideo(chatId, sortedMedias[0].url)
        } else {
            mediaError(bot, chatId)
        }
    } catch (error) {
        errHandler(error, bot, chatId)
    }
}

module.exports = {
    linkPrefix: 'https://www.reddit.com/',
    handle: redditScrapper
}