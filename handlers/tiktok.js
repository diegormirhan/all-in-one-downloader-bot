const {errHandler, linkError, mediaError} = require('../error/error-handler')

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
