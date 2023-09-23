const faceScrapper = async (bot, chatId, medias) => {
    try {
        await bot.sendMessage(chatId, 'Processing your link, please wait...')
        await bot.sendVideo(chatId, medias[0].url)
    } catch (error) {
        bot.sendMessage(chatId, `An error ocurred while processing the link. Try again!`)
    }
}

module.exports = {
    linkPrefix: 'https://www.facebook.com/',
    handle: faceScrapper
}