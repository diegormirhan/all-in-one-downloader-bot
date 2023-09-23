const {errHandler, linkError, mediaError} = require('../error/error-handler')

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
