const { bot } = require('../src/telegram')
const path = require('path');
const requireAll = require('require-all');
const scrapper = require('../api/scrapper');

// Import handlers
const folderPath = path.join(__dirname, '../handlers');
const modules = requireAll({dirname: folderPath});
console.log(modules)


// Listening to the user message and return media file from social media
bot.on('message', async function(msg) {
    const chatId = msg.chat.id
    const medias = await scrapper(msg.text)
    for (const handlerName in modules) {
    if (msg.text.startsWith(modules[handlerName].linkPrefix)) {
        await modules[handlerName].handle(bot, chatId, medias)
        break
    }
    }
})