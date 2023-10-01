
/**
 * Handles an error by sending a message to the specified chat ID.
 *
 * @param {Error} error - The error that occurred while processing the link.
 * @param {Bot} bot - The bot object used to send the message.
 * @param {string} chatId - The ID of the chat where the message should be sent.
 * @return {Promise} A promise that resolves when the message is sent.
 */
const errHandler = (error, bot, chatId) => {
    return bot.sendMessage(chatId, `An error ocurred while processing the link. Try again\nError Messsage: ${error}`)
}


/**
 * Sends an error message to the specified chat ID using the provided bot.
 *
 * @param {Object} bot - The bot object used to send the message.
 * @param {string|number} chatId - The ID of the chat to send the message to.
 * @return {Promise} A promise that resolves when the message is sent.
 */
const linkError = (bot, chatId) => {
    return bot.sendMessage(chatId, 'There was an error sending your link, please try again.');
}

/**
 * Sends an error message to the specified chat ID indicating that the media for a given link could not be found.
 *
 * @param {Object} bot - The bot object used to send the message.
 * @param {number|string} chatId - The ID of the chat where the error message should be sent.
 * @return {Promise} A promise that resolves when the error message has been sent.
 */
const mediaError = (bot, chatId) => {
    return bot.sendMessage(chatId, 'Could not find the media for that link. Please try again.');
}

module.exports = {errHandler, linkError, mediaError}
