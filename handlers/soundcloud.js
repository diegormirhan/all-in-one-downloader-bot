const { errHandler, linkError, mediaError } = require('../error/error-handler')

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