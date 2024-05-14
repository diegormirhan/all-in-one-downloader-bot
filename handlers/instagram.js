const {errHandler, linkError, mediaError} = require('../error/error-handler')
const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 600}) // 10 minutes TTL
/**
 * Sends Instagram media files to a specified chat using a Telegram bot.
 *
 * @param {object} bot - The Telegram bot instance.
 * @param {number} chatId - The ID of the chat to send the media files to.
 * @param {array} medias - An array of media objects containing the type and URL of each media file.
 * @return {Promise} A promise that resolves when all the media files have been sent successfully.
 */
const instaScrapper = async (bot, chatId, medias) => {
    console.log(medias)
    let linkTypes = []
    for (item of medias) {
        const id = Math.random().toString(36).substring(2, 15);
        cache.set(id, { url: item.url, type: item.type })

        linkTypes.push({
            text: `${item.extension} - ${item.quality}`,
            callback_data: id
        })
    }
    console.log(linkTypes)
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
    linkPrefix: 'https://www.instagram.com',
    handle: instaScrapper
}
