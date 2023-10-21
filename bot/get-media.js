const { bot } = require('../src/telegram')
const path = require('path');
const requireAll = require('require-all');
const scrapper = require('../api/scrapper');

// Import handlers
const folderPath = path.join(__dirname, '../handlers');
const modules = requireAll({ dirname: folderPath });


// Listening to the user message and return media file from social media
bot.on('message', async function (msg) {
    const chatId = msg.chat.id
    try {
        const medias = await scrapper(msg.text)
        if (typeof (msg.text) === 'string') {
            for (const handlerName in modules) {
                if (msg.text.startsWith(modules[handlerName].linkPrefix)) {
                    await modules[handlerName].handle(bot, chatId, medias)
                    break
                }
            }
        } else {
            bot.sendMessage(chatId, '*Please send a valid message containing the link*', { parse_mode: 'Markdown' })
            console.log('Not a valid message sent - Err 404')
        }
    } catch (error) {
        console.error('Error handling message', error)
    }
})