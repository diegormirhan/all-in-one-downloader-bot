const { bot } = require('../src/telegram')
const path = require('path');
const requireAll = require('require-all');
const scrapper = require('../api/scrapper');
const { idCollection } = require('../database/mongodb')

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
                    console.log('Valid Media Sent!')
                    const existingDoc = await idCollection.findOne({id: chatId});
                    const usageKey = Object.keys(existingDoc)
                    if (!usageKey.includes('usage')) {
                        await idCollection.updateOne({id: chatId}, {$set: {
                            first_name: msg.from.first_name, 
                            username: msg.from.username, 
                            lang: msg.from.language_code, 
                            usage: 1
                        }});
                    } else {
                        await idCollection.updateOne({id: chatId}, {$inc: {usage: 1}});
                    }
                    bot.sendMessage(chatId, '🌟 We need your support! Every donation helps us cover server and software costs to keep our bot running. Thank you! 🙏💖\n\n*https://buymeacoffee.com/diegomirhan*', { parse_mode: 'Markdown', disable_web_page_preview: true })

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