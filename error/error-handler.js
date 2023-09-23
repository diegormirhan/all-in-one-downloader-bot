const errHandler = (error, bot, chatId) => {
    return bot.sendMessage(chatId, `An error ocurred while processing the link. Try again\nError Messsage: ${error}`)
}

const linkError = (bot, chatId) => {
    return bot.sendMessage(chatId, 'There was an error sending your link, please try again.');
}

const mediaError = (bot, chatId) => {
    return bot.sendMessage(chatId, 'Could not find the media for that link. Please try again.');
}

module.exports = {errHandler, linkError, mediaError}
