const {errHandler, linkError, mediaError} = require('../error/error-handler')
const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 600}) // 10 minutes TTL

/**
 * Scrapes the pinterest link and sends the corresponding media to a chat.
 *
 * @param {Object} bot - The bot object used for sending messages.
 * @param {number} chatId - The ID of the chat to send the media to.
 * @param {Array} medias - An array of media objects to scrape.
 * @return {Promise} A promise that resolves when the media is sent.
 */
const pinScrapper = async (bot, chatId, medias) => {

    let linkTypes = []
    let row = []
    for (item of medias) {
        const id = Math.random().toString(36).substring(2, 15);
        cache.set(id, { url: item.url, type: item.type })

        const button = {
            text: `${item.extension} - ${item.quality}`,
            callback_data: id
        }
        
        row.push(button)
        if ( row.length === 3) {
            linkTypes.push(row)
            row = []
        }
    }

    if (row.length > 0) {
        linkTypes.push(row)
    }
    
    const options = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [linkTypes]
        }
    }

    bot.sendMessage(chatId, '*Choose an option below:*', options)

    bot.on('callback_query', (query) => {
        const chat_id = query.message.chat.id;
        const id = query.data;

        const data = cache.get(id)
        console.log(typeof(data), data)
        if (!data) {
            bot.sendMessage(chat_id, 'Invalid link');
            return;
        }

        const url = data.url
        const type = data.type

        if (type === 'video') {
            bot.sendVideo(chat_id, url)
        }
        else if(type === 'image') {
            bot.sendPhoto(chat_id, url)
        }
        else if(type === 'audio') {
            bot.sendAudio(chat_id, url)
        }
        else {
            bot.sendMessage(chat_id, 'The link is not supported');
        }
        bot.answerCallbackQuery(query.id);
      });
}

module.exports = {
    linkPrefix: 'https://pin.it/',
    handle: pinScrapper
}