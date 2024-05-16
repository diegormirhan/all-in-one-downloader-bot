const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 600}) // 10 minutes TTL
const { audioHandler } = require('./audioHandler')
const { getFileSize } = require('./getFileSize')
const { shortenUrl } = require('./shortenUrl')

const linkHandler = async (bot, chatId, medias) => {
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
        if ( row.length === 2) {
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
            inline_keyboard: linkTypes
        }
    }

    bot.sendMessage(chatId, '*Choose an option below:*', options)
}

const registerCallbackHandler = (bot) => {
    bot.on('callback_query', async (query) => {
        const chat_id = query.message.chat.id;
        const id = query.data;

        const data = cache.get(id)
        if (!data) {
            bot.sendMessage(chat_id, 'Invalid link');
            return;
        }

        const url = data.url
        const type = data.type

        const checkFileSize = await getFileSize(url);
        const maxSize = 20 * 1024 * 1024
        if (checkFileSize > maxSize) {
            const shortLink = await shortenUrl(url)
            bot.sendMessage(chat_id, `*The url you provided is too big to send as video on telegram.\nBut you can download it* [here](${shortLink})`, { parse_mode: 'Markdown'})
            bot.answerCallbackQuery(query.id);
            return;
        }

        if (type === 'video') {
            bot.sendVideo(chat_id, url)
        }
        else if(type === 'image') {
            bot.sendPhoto(chat_id, url)
        }
        else if(type === 'audio') {
            await audioHandler(chat_id, bot, url)
        }
        else {
            bot.sendMessage(chat_id, 'The link is not supported');
        }
        bot.answerCallbackQuery(query.id);
      });
}

module.exports = { linkHandler, registerCallbackHandler}