const {errHandler, linkError, mediaError} = require('../error/error-handler')

const youtubeScrapper = async (bot, chatId, medias) => {
    try {
        await bot.sendMessage(chatId, 'Processing your link, please wait...')
        const sortedMedias = medias.sort((a, b) => (b.bitrate || 0) - (a.bitrate || 0));
        if (medias.length > 0) {
            if (sortedMedias[0].extension === 'mp4') {
                bot.sendVideo(chatId, sortedMedias[0].url)
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