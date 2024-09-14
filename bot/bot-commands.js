const { bot } = require('../src/telegram')
const runMongoDb = require('../bot/get-userId')
const { userUpdates } = require('./user-updates')
const { idCollection } = require('../database/mongodb')
const { donationLink } = require('../lang/donationLinks')

// Create the commands
bot.onText(/\/start/, startCommand)
bot.onText(/\/help/, helpCommand)
bot.onText(/\/update/, updateCommand)
bot.onText(/\/donate/, donateCommand)

// Create the command functions
async function startCommand(msg) {
    const chatId = msg.chat.id
    const message = "Welcome to the *All In One Bot Downloader*\nYou can download media from your favorite social media.\nFor help, just type /help in the chat."
    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    runMongoDb(msg, chatId);
}

bot.on("message", async function (msg) {
    const chatId = msg.chat.id

    function isValidURL(string) {
        const urlPattern = new RegExp('^(https?:\\/\\/)?' + // Protocolo
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // Domínio
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // ou IP (v4) endereço
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Porta e caminho
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // Parâmetros de consulta
            '(\\#[-a-z\\d_]*)?$', 'i'); // Fragmento
        return !!urlPattern.test(string);
    }

    if (typeof (msg.text) === 'string' && msg.text.startsWith('http')) {
        const inputText = msg.text.trim();
        if (isValidURL(inputText)) {
            const cleanLink = inputText.split('?')[0];
            const downloadUrl = `https://bestvideosdownload.com?source=telegram&link=${encodeURIComponent(cleanLink)}`;
            const message = "🌟 *After clicking the download button, you will be redirected to another page to start downloading the media!*";

            bot.sendMessage(chatId, message, {
                reply_markup: {
                    inline_keyboard: [
                        [{ text: 'Download', url: downloadUrl }]
                    ]
                },
                parse_mode: 'Markdown'
            });

            await idCollection.updateOne({ id: chatId }, {
                $inc: { usage: 1 },
                $set: { lang: msg.from.language_code }
            });
            console.log('Valid Media Sent: ', msg.text)
        }
        else {
            console.log("Failed to send media: ", msg.text)
            bot.sendMessage(chatId, 'There was an error processing your link, please try again', { parse_mode: 'Markdown' })
        }
    }
})

async function helpCommand(msg) {
    const chatId = msg.chat.id
    const message = "You can download media from different sources, such as:\n*Instagram*\n*Twitter*\n*Pinterest*\n*TikTok*\n*YouTube*\n*Reddit*\n*Facebook*\n*SoundCloud*\nand many others...\n\n*Download Guide:* Just send the entire media link in the chat and wait for the bot response.\nEnjoy your bot :)"
    await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
}

async function updateCommand(msg) {
    const chatId = msg.chat.id
    adminId = process.env.ADMIN_ID
    if (chatId == adminId) {
        userUpdates(bot, chatId)
    } else {
        await bot.sendMessage(chatId, "You don't have permission to use this command!")
    }
}

async function donateCommand(msg) {
    const chatId = msg.chat.id
    const existingDoc = await idCollection.findOne({ id: chatId });

    await idCollection.updateOne({ id: chatId }, {
        $set: { lang: msg.from.language_code }
    });

    const donationsLink = donationLink(existingDoc.lang)
    const options = {
        parse_mode: 'Markdown',
        disable_web_page_preview: true,
        reply_markup: {
            inline_keyboard: [
                [{
                    text: 'Donate',
                    url: donationsLink
                }]
            ]
        }
    }

    await bot.sendMessage(chatId, '🌟 We need your support! Every donation helps us cover server and software costs to keep our bot running. Thank you! 🙏💖', options)
}