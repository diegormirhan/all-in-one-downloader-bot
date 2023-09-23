const {errHandler, linkError, mediaError} = require('../error/error-handler')

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