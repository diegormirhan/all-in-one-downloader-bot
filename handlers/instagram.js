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
                    bot.sendMessage(chatId, 'There was an error sending your link, please try again.');
                }
            })
        } else {
            bot.sendMessage(chatId, 'Could not find the media for that link. Please try again');
        }
    } catch (error) {
        bot.sendMessage(chatId, 'An error ocurred while processing the link. Try again!');
    }
}

module.exports = {
    linkPrefix: 'https://www.instagram.com',
    handle: instaScrapper
}
