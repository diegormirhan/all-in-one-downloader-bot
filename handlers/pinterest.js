const pinScrapper = async (bot, chatId, medias) => {
    const media = medias.reverse()[0]
    try {
        await bot.sendMessage(chatId, 'Processing your link...')
        if (media.type === 'video') {
            bot.sendVideo(chatId, media.url)
        }
        else if (media.type === 'image') {
            bot.sendPhoto(chatId, media.url)
        } else {
            bot.sendMessage(chatId, 'There was an error while processing your link. Please verify yout link and try again!')
        }
    } catch (error) {
        bot.sendMessage(chatId, `An error ocurred while processing the link. Try again\nError Messsage: ${error}`)
    }
}

module.exports = {
    linkPrefix: 'https://pin.it/',
    handle: pinScrapper
}