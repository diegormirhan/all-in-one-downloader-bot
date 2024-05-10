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
    if (!msg.text.startsWith('/')) {
        bot.sendMessage(chatId, 'Processing your link, please wait...')

        const link = msg.text.trim()
        const handler = Object.values(modules).find(m => link.startsWith(m.linkPrefix))

        try {
        const medias = await scrapper(link)
        if (handler) {
            await handler.handle(bot, chatId, medias)
            console.log('Valid Media Sent!')

            const existingDoc = await idCollection.findOne({ id: chatId });

            await idCollection.updateOne({ id: chatId }, {
                $inc: { usage: 1 },
                $set: { lang: msg.from.language_code }
            });
           
            if (existingDoc.usage >= 6 && existingDoc.usage % 3 === 0) {
                const options = {
                    parse_mode: 'Markdown',
                    disable_web_page_preview: true,
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {
                                    text: 'Donate',
                                    url: 'https://buymeacoffee.com/diegomirhan'
                                }
                            ]
                        ]
                    }
                }

                bot.sendMessage(chatId, '🌟 We need your support! Every donation helps us cover server and software costs to keep our bot running. Thank you! 🙏💖', options)
            }
        }
    } catch (error) {
        bot.sendMessage(chatId, 'There was an error processing your link, please try again', { parse_mode: 'Markdown' })
    }
    }
})
