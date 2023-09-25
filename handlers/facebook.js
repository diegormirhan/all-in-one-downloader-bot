const {errHandler, linkError, mediaError} = require('../error/error-handler')

const faceScrapper = async (bot, chatId, medias) => {
    try {
        await bot.sendMessage(chatId, 'Processing your link, please wait...')
        bot.sendVideo(chatId, medias[0].url)
    } catch (error) {
        errHandler(error, bot, chatId)
    }
}

module.exports = {
    linkPrefix: 'https://www.facebook.com/',
    handle: faceScrapper
}